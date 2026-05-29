<?php

namespace app\controllers;

use app\models\Mobs;
use yii\rest\ActiveController;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\data\ActiveDataProvider; // Obligatorio para actionBuscar
use yii\db\Expression;

class MobsController extends ActiveController
{
    public $modelClass = 'app\models\Mobs';
    public $enableCsrfValidation = false;

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = function ($action) {
            $user = \Yii::$app->user->identity;
            $todos = \Yii::$app->request->get('todos');
            $query = Mobs::find();
            
            if ($user && $user->rol === 'jugador' && !$todos) {
                $query->innerJoin('biomas', 'mobs.id_bioma = biomas.id')
                      ->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
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
                'Origin'                           => ['http://localhost:8100', 'http://localhost:8101'],
                'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600
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

    /**
     * FUNCIÓN BUSCAR: Implementada TAL CUAL al manual.
     */
    public function actionBuscar($text)
    {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        
        $consulta = Mobs::find()->joinWith('bioma')->where([
            'like', 
            new Expression("CONCAT_WS(' ', biomas.nombre, mobs.tipo, mobs.es_hostil, mobs.id_bioma)"), 
            $text
        ]);

        if ($user && $user->rol === 'jugador' && !$todos) {
            $consulta->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
                     ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        $mobs = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 
            ],
        ]);

        return $mobs->getModels();
    }

    /**
     * FUNCIÓN TOTAL: Retorna el conteo para las burbujas de paginación.
     */
    public function actionTotal($text = '')
    {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        $total = Mobs::find()->joinWith('bioma');

        if ($user && $user->rol === 'jugador' && !$todos) {
            $total->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
                  ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        if ($text != '') {
            $total = $total->andWhere([
                'like',
                new Expression("CONCAT_WS(' ', biomas.nombre, mobs.tipo, mobs.es_hostil, mobs.id_bioma)"),
                $text
            ]);
        }
        return $total->count();
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action === 'delete') {
            $user = \Yii::$app->user->identity;
            if (!$user) {
                throw new \yii\web\ForbiddenHttpException("No autenticado.");
            }
            $userRol = isset($user->rol) ? $user->rol : 'jugador';
            
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