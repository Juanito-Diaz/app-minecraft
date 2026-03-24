<?php

namespace app\controllers;

use yii\rest\ActiveController;

class JugadoresMundosController extends ActiveController
{
    // Aquí le decimos qué tabla usar (el modelo que ya generaste)
    public $modelClass = 'app\models\JugadoresMundos';
}