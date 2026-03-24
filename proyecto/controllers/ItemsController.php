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
}