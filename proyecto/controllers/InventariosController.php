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
            $user = \Yii::$app->user->identity;
            $query = Inventarios::find()->with(['jugador', 'item']);

            if ($user && $user->rol === 'jugador') {
                $query->andWhere(['inventarios.id_jugador' => $user->id]);
            }

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

        unset($behaviors['authenticator']);

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
            'except' => ['options']
        ];
        
        return $behaviors;
    }

    /**
     * FUNCIÓN BUSCAR: Implementada con Join para buscar por Username
     */
    public function actionBuscar($text)
    {
        $user = \Yii::$app->user->identity;
        // Usamos joinWith para traer los datos del jugador y poder filtrar por su nombre
        $consulta = Inventarios::find()
            ->joinWith('jugador') 
            ->where([
                'like', 
                new Expression("CONCAT(inventarios.cantidad, ' ', inventarios.id_jugador, ' ', jugadores.username)"), 
                $text
            ]);

        if ($user && $user->rol === 'jugador') {
            $consulta->andWhere(['inventarios.id_jugador' => $user->id]);
        }

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
        $user = \Yii::$app->user->identity;
        $query = Inventarios::find()->joinWith('jugador');

        if ($user && $user->rol === 'jugador') {
            $query->andWhere(['inventarios.id_jugador' => $user->id]);
        }

        if ($text != '') {
            $query->andWhere([
                'like',
                new Expression("CONCAT(inventarios.cantidad, ' ', inventarios.id_jugador, ' ', jugadores.username)"), 
                $text
            ]);
        }
        return $query->count();
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