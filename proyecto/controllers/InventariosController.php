<?php

namespace app\controllers;

use app\models\Inventarios;
use yii\rest\ActiveController;
use yii\filters\Cors;
use yii\data\ActiveDataProvider;
use yii\db\Expression;

class InventariosController extends ActiveController
{
    public $modelClass = 'app\models\Inventarios';
    public $enableCsrfValidation = false;

    public function actions()
    {
        $actions = parent::actions();
        
        // Modificamos el index para usar paginación y cargar relaciones
        $actions['index']['prepareDataProvider'] = function ($action) {
            $query = Inventarios::find()->with(['jugador', 'item']);

            return new ActiveDataProvider([
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

    /**
     * FUNCIÓN BUSCAR: Implementada con Join para buscar por Username
     */
    public function actionBuscar($text)
    {
        // Usamos joinWith para traer los datos del jugador y poder filtrar por su nombre
        $consulta = Inventarios::find()
            ->joinWith('jugador') 
            ->where([
                'like', 
                new Expression("CONCAT(inventarios.cantidad, ' ', inventarios.id_jugador, ' ', jugadores.username)"), 
                $text
            ]);

        $inventarios = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => [
                'pageSize' => 20 
            ],
        ]);

        return $inventarios->getModels();
    }

    /**
     * FUNCIÓN TOTAL: También con Join para que el conteo coincida con la búsqueda
     */
    public function actionTotal($text = '')
    {
        $query = Inventarios::find()->joinWith('jugador');

        if ($text != '') {
            $query->where([
                'like',
                new Expression("CONCAT(inventarios.cantidad, ' ', inventarios.id_jugador, ' ', jugadores.username)"), 
                $text
            ]);
        }

        return $query->count();
    }
}