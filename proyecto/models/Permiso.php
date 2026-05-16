<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "permiso".
 *
 * @property int $per_id ID
 * @property string $per_vista Nombre de la vista
 * @property string $per_rol Roles permitidos
 */
class Permiso extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'permiso';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['per_vista', 'per_rol'], 'required'],
            [['per_vista'], 'string', 'max' => 100],
            [['per_rol'], 'string', 'max' => 150],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'per_id' => 'ID',
            'per_vista' => 'Nombre de la vista',
            'per_rol' => 'Roles permitidos',
        ];
    }
}
