<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\db\Expression;
use yii\data\ActiveDataProvider; // Importante para actionBuscar
use app\models\Jugadores;

class JugadoresController extends ActiveController
{
    public $modelClass = 'app\models\Jugadores';
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
            ]
        ];

        $behaviors['authenticator'] = [
            'class' => \yii\filters\auth\CompositeAuth::className(),
            'authMethods' => [
                \yii\filters\auth\HttpBearerAuth::className(),
            ],
            // CLAVE: Se agregan 'total' y 'buscar' a las excepciones
            'except' => ['index', 'view', 'total', 'buscar']
        ];

        return $behaviors;
    }

    /**
     * FUNCIÓN BUSCAR: Agregada exactamente según el manual.
     */
    public function actionBuscar($text)
    {
        // Concatenamos las columnas reales: username, nivel_xp y fecha_union
        $consulta = Jugadores::find()->where([
            'like', 
            new \yii\db\Expression("CONCAT(username, ' ', nivel_xp, ' ', fecha_union)"), 
            $text
        ]);

        $jugadores = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 // Sincronizado con el estándar del manual
            ],
        ]);

        return $jugadores->getModels();
    }

    /**
     * FUNCIÓN TOTAL: Modificada para incluir todos los campos en el CONCAT.
     */
    public function actionTotal($text = '')
    {
        $total = Jugadores::find();
        if ($text != '') {
            $total = $total->where([
                'like',
                new \yii\db\Expression("CONCAT(username, ' ', nivel_xp, ' ', fecha_union)"),
                $text
            ]);
        }
        return $total->count();
    }
}