<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\db\Expression;
use yii\data\ActiveDataProvider; // Importante para actionBuscar
use app\models\Jugadores;
use app\models\LoginForm;
use app\models\RegistroForm;
use yii\web\UploadedFile;
use yii\web\Response;
use Yii;

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
            'except' => ['index', 'view', 'total', 'buscar', 'login', 'registrar', 'subir-foto', 'options']
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

    public function actionLogin() {
        $token = '';
        $model = new LoginForm();
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        if($model->login()) {
            $user = Jugadores::findOne(['username' => $model->username]);
            $token = $user->access_token;
        } else {
            Yii::error("Login failed. Errors: " . print_r($model->errors, true));
            Yii::error("Body params: " . print_r(Yii::$app->getRequest()->getBodyParams(), true));
        }
        return $token;
    }

    public function actionRegistrar() { 
        $token = '';
        $model = new RegistroForm();
        if ($model->load(Yii::$app->getRequest()->getBodyParams(), '') && $model->validate()) {
            $user = new Jugadores();
            $user->username = $model->username;
            $user->setPassword($model->password);
            $user->generateAuthKey();
            // Yii's HttpBearerAuth uses access_token
            $user->access_token = Yii::$app->security->generateRandomString();
            
            if($user->save()) {
                $token = $user->access_token;
            } else {
                Yii::$app->response->statusCode = 422;
                return $user->errors;
            }
        } else {
            Yii::$app->response->statusCode = 422;
            return $model->errors;
        }
        return $token;
    }

    public function actionSubirFoto($id)
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $model = Jugadores::findOne(['id' => $id]);
        
        if (!$model) {
            return ['success' => false, 'message' => 'Registro no encontrado'];
        }
        
        $model->fotoArchivo = UploadedFile::getInstanceByName('foto');
        
        if (!$model->fotoArchivo) {
            return ['success' => false, 'message' => 'No se recibió ningún archivo'];
        }
        
        $carpeta = Yii::getAlias('@app/web/imagenes/jugadores/');
        if (!is_dir($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
        
        $extension = $model->fotoArchivo->extension;
        $nombreArchivo = 'jugador_' . $model->id . '_' . time() . '.' . $extension;
        $rutaCompleta = $carpeta . $nombreArchivo;
        
        if ($model->fotoArchivo->saveAs($rutaCompleta)) {
            $model->foto = $nombreArchivo;
            if ($model->save(false)) {
                return [
                    'success' => true,
                    'message' => 'Archivo subido correctamente',
                    'archivo' => $model->foto
                ];
            }
            return [
                'success' => false,
                'message' => 'El archivo se guardó, pero no se pudo actualizar la BD'
            ];
        }
        
        return ['success' => false, 'message' => 'No se pudo guardar el archivo'];
    }
}