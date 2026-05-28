<?php

namespace app\controllers;

use app\models\Items;
use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\data\ActiveDataProvider;

class ItemsController extends ActiveController
{
    public $modelClass = 'app\models\Items';
    public $enableCsrfValidation = false;

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = function ($action) {
            return new ActiveDataProvider([
                'query' => Items::find(),
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
        unset($behaviors['corsFilter']);
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\CompositeAuth::class,
            'authMethods' => [
                \yii\filters\auth\HttpBearerAuth::class,
            ],
            'except' => ['index', 'view', 'total', 'buscar', 'options']
        ];
        return $behaviors;
    }

    public function actionBuscar($text)
    {
        // CORRECCIÓN: Usamos nombre, es_apilable y puntos_ataque
        $consulta = Items::find()->where([
            'like', 
            new \yii\db\Expression("CONCAT(nombre, ' ', es_apilable, ' ', puntos_ataque)"), 
            $text
        ]);

        $items = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 
            ],
        ]);

        return $items->getModels();
    }

    public function actionTotal($text = '')
    {
        $total = Items::find();
        if ($text != '') {
            // CORRECCIÓN: Mismo CONCAT que en buscar
            $total = $total->where([
                'like', 
                new \yii\db\Expression("CONCAT(nombre, ' ', es_apilable, ' ', puntos_ataque)"), 
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