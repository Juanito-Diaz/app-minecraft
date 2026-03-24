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
            // CLAVE: 'total' y 'buscar' deben estar exceptuados para la lista inicial
            'except' => ['index', 'view', 'total', 'buscar'] 
        ];

        return $behaviors;
    }

    /**
     * FUNCIÓN BUSCAR: Implementada TAL CUAL al manual.
     */
    public function actionBuscar($text)
    {
        // Usamos CONCAT con las propiedades reales de tu tabla Mobs
        $consulta = Mobs::find()->where([
            'like', 
            new Expression("CONCAT(nombre, ' ', tipo, ' ', es_hostil, ' ', id_bioma)"), 
            $text
        ]);

        $mobs = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 // Sincronizado con la paginación de Ionic
            ],
        ]);

        return $mobs->getModels();
    }

    /**
     * FUNCIÓN TOTAL: Retorna el conteo para las burbujas de paginación.
     */
    public function actionTotal($text = '')
    {
        $total = Mobs::find();

        if ($text != '') {
            $total = $total->where([
                'like',
                new Expression("CONCAT(nombre, ' ', tipo, ' ', es_hostil, ' ', id_bioma)"),
                $text
            ]);
        }

        return $total->count();
    }
}