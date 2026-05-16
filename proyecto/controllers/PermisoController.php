<?php

namespace app\controllers;

use app\models\Permiso;
use app\models\Jugadores;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class PermisoController extends ActiveController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin'                           => ['http://localhost:8100', 'http://localhost:8101', '*'], // Accept from local ionic
                'Access-Control-Request-Method'    => ['GET'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600
            ]
        ];
        $behaviors['authenticator'] = [
            'class' => CompositeAuth::class,
            'authMethods' => [
                HttpBearerAuth::class,
            ]
        ];
        return $behaviors;
    }

    public $enableCsrfValidation = false;
    public $modelClass = 'app\models\Permiso';

    public function actionListaPermisos($user = '')
    {
        $permitidas = [];
        $user = Jugadores::findOne(['access_token' => $user]); // Asumiendo autenticación por access_token en ionic

        if (isset($user)) {
            $userRol = isset($user->rol) ? $user->rol : 'jugador'; // Usa el rol de la DB o un default
            
            $permisos = Permiso::find()->all();
            foreach ($permisos as $p) {
                $rolesPermitidos = explode(',', $p->per_rol);
                
                // Limpiar espacios en los roles permitidos
                $rolesPermitidos = array_map('trim', $rolesPermitidos);

                if (in_array($userRol, $rolesPermitidos)) {
                    $permitidas[] = $p->per_vista;
                }
            }
        }
        return $permitidas;
    }
}
