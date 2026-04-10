<?php

namespace app\models;

use yii\base\Model;

class RegistroForm extends Model
{
    public $username;
    public $password;
    public $password_confirm;

    public function rules() 
    {
        return [
            [['username', 'password', 'password_confirm'], 'required'],
            ['username', 'unique', 'targetClass' => '\app\models\Jugadores', 'message' => 'Este nombre de usuario ya está registrado.'],
            [['username', 'password', 'password_confirm'], 'trim'],
            [['username'], 'string', 'max' => 50],
            [['password', 'password_confirm'], 'string', 'min' => 8, 'max' => 15],
            ['password_confirm', 'compare', 'compareAttribute' => 'password', 'message' => 'Las contraseñas no coinciden.'],
        ];
    }
}
