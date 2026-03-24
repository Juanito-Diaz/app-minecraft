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
            // CLAVE: Agregamos 'total' y 'buscar' a las excepciones
            'except' => ['index', 'view', 'total', 'buscar'] 
        ];

        return $behaviors;
    }

    /**
     * FUNCIÓN BUSCAR: Exactamente según el manual
     */
    public function actionBuscar($text)
    {
        // Usamos nombre, temperatura e id_mundo según tu tabla
        $consulta = Biomas::find()->where([
            'like', 
            new Expression("CONCAT(nombre, ' ', temperatura, ' ', id_mundo)"), 
            $text
        ]);

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
        $total = Biomas::find();
        
        if ($text !== '') {
            $total = $total->where([
                'like', 
                new Expression("CONCAT(nombre, ' ', temperatura, ' ', id_mundo)"), 
                $text
            ]);
        }
        
        return $total->count();
    }
}