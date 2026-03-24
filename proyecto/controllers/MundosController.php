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
            // Agregamos 'buscar' y 'total' a las excepciones para que funcionen sin token si es necesario
            'except' => ['index', 'view', 'total', 'buscar']
        ];

        return $behaviors;
    }

    // NUEVA FUNCIÓN: actionBuscar (Exactamente según el manual)
    public function actionBuscar($text)
    {
        // Filtramos por las columnas reales: nombre, semilla y dificultad
        $consulta = Mundos::find()->where([
            'like', 
            new \yii\db\Expression("CONCAT(nombre, ' ', semilla, ' ', dificultad)"), 
            $text
        ]);

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
        $total = Mundos::find(); // Cambiado de Biomas a Mundos

        if ($text != '') {
            $total = $total->where([
                'like',
                new \yii\db\Expression("CONCAT(nombre, ' ', semilla, ' ', dificultad)"),
                $text
            ]);
        }

        return $total->count();
    }
}