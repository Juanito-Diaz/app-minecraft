<?php

namespace app\controllers;

use app\models\Mundos;
use yii\rest\ActiveController;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\CompositeAuth;
use yii\db\Expression; 
use yii\data\ActiveDataProvider; // Necesario para actionBuscar

class MundosController extends ActiveController
{
    public $modelClass = 'app\models\Mundos';
    public $enableCsrfValidation = false;

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['delete']); // Desactivar la acción delete por defecto REST
        $actions['index']['prepareDataProvider'] = function ($action) {
            $user = \Yii::$app->user->identity;
            $todos = \Yii::$app->request->get('todos');
            $query = Mundos::find();
            
            if ($user && $user->rol === 'jugador' && !$todos) {
                $query->innerJoin('jugadores_mundos', 'mundos.id = jugadores_mundos.id_mundo')
                      ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
            }
            
            return new \yii\data\ActiveDataProvider([
                'query' => $query,
                'pagination' => [
                    'pageSize' => 20,
                ],
            ]);
        };
        return $actions;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 600
            ]
        ];

        $behaviors['authenticator'] = [
            'class' => CompositeAuth::className(),
            'authMethods' => [
                HttpBearerAuth::className(),
            ],
            'except' => ['options']
        ];

        return $behaviors;
    }

    // NUEVA FUNCIÓN: actionBuscar (Exactamente según el manual)
    public function actionBuscar($text)
    {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        
        $consulta = Mundos::find()->where([
            'like', 
            new \yii\db\Expression("CONCAT_WS(' ', nombre, semilla, dificultad)"), 
            $text
        ]);

        if ($user && $user->rol === 'jugador' && !$todos) {
            $consulta->innerJoin('jugadores_mundos', 'mundos.id = jugadores_mundos.id_mundo')
                     ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        $mundos = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 
            ],
        ]);

        return $mundos->getModels();
    }

    /**
     * Retorna el conteo total de registros para la paginación.
     * Modificado según el manual para usar el modelo Mundos
     */
    public function actionTotal($text = '')
    {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        $total = Mundos::find(); // Cambiado de Biomas a Mundos

        if ($user && $user->rol === 'jugador' && !$todos) {
            $total->innerJoin('jugadores_mundos', 'mundos.id = jugadores_mundos.id_mundo')
                  ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        if ($text != '') {
            $total = $total->andWhere([
                'like',
                new \yii\db\Expression("CONCAT_WS(' ', nombre, semilla, dificultad)"),
                $text
            ]);
        }
        return $total->count();
    }

    public function actionDelete($id)
    {
        $user = \Yii::$app->user->identity;
        if (!$user) {
            throw new \yii\web\ForbiddenHttpException("No autenticado.");
        }
        
        $userRol = isset($user->rol) ? $user->rol : 'jugador';
        
        if ($userRol === 'jugador') {
            // El jugador sólo se desvincula de este mundo (elimina la relación en jugadores_mundos)
            $relacion = \app\models\JugadoresMundos::findOne(['id_jugador' => $user->id, 'id_mundo' => $id]);
            if ($relacion) {
                if ($relacion->delete() === false) {
                    throw new \yii\web\ServerErrorHttpException("No se pudo desvincular del mundo.");
                }
            }
            \Yii::$app->response->statusCode = 204;
            return null;
        } else {
            // El administrador elimina el mundo completo de la base de datos física
            $model = $this->findModel($id);
            $this->checkAccess('delete', $model);
            if ($model->delete() === false) {
                throw new \yii\web\ServerErrorHttpException("No se pudo eliminar el mundo.");
            }
            \Yii::$app->response->statusCode = 204;
            return null;
        }
    }

    protected function findModel($id)
    {
        $modelClass = $this->modelClass;
        if (($model = $modelClass::findOne($id)) !== null) {
            return $model;
        }
        throw new \yii\web\NotFoundHttpException("El mundo no existe.");
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action === 'delete') {
            $user = \Yii::$app->user->identity;
            if (!$user) {
                throw new \yii\web\ForbiddenHttpException("No autenticado.");
            }
            $userRol = isset($user->rol) ? $user->rol : 'jugador';
            
            // Si es un jugador, no arrojamos ForbiddenHttpException para delete
            // puesto que actionDelete() desviará la acción a desvinculación
            if ($userRol === 'jugador') {
                return;
            }
            
            $permisoNombre = strtolower($this->id) . '-eliminar';
            $permiso = \app\models\Permiso::findOne(['per_vista' => $permisoNombre]);
            
            if ($permiso) {
                $rolesPermitidos = array_map('trim', explode(',', $permiso->per_rol));
                if (!in_array($userRol, $rolesPermitidos)) {
                    throw new \yii\web\ForbiddenHttpException("No tienes permiso para eliminar este elemento.");
                }
            } else {
                throw new \yii\web\ForbiddenHttpException("Acción no permitida.");
            }
        }
        parent::checkAccess($action, $model, $params);
    }
}