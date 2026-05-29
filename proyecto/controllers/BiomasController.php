<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\CompositeAuth;
use yii\data\ActiveDataProvider; // Necesario para actionBuscar
use yii\db\Expression; 
use app\models\Biomas;

class BiomasController extends ActiveController
{
    public $modelClass = 'app\models\Biomas';
    public $enableCsrfValidation = false; 

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = function ($action) {
            $user = \Yii::$app->user->identity;
            $todos = \Yii::$app->request->get('todos');
            $query = Biomas::find();
            
            if ($user && $user->rol === 'jugador' && !$todos) {
                $query->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
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

    /**
     * FUNCIÓN BUSCAR: Exactamente según el manual
     */
    public function actionBuscar($text)
    {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        
        $consulta = Biomas::find()->where([
            'like', 
            new Expression("CONCAT_WS(' ', biomas.nombre, biomas.temperatura, biomas.id_mundo)"), 
            $text
        ]);

        if ($user && $user->rol === 'jugador' && !$todos) {
            $consulta->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
                     ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        $biomas = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 
            ],
        ]);

        return $biomas->getModels();
    }

    /**
     * FUNCIÓN TOTAL: Modificada según el manual con CONCAT
     */
    public function actionTotal($text = '') {
        $user = \Yii::$app->user->identity;
        $todos = \Yii::$app->request->get('todos');
        $total = Biomas::find();
        
        if ($user && $user->rol === 'jugador' && !$todos) {
            $total->innerJoin('jugadores_mundos', 'biomas.id_mundo = jugadores_mundos.id_mundo')
                  ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
        }

        if ($text !== '') {
            $total = $total->andWhere([
                'like', 
                new Expression("CONCAT_WS(' ', biomas.nombre, biomas.temperatura, biomas.id_mundo)"), 
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