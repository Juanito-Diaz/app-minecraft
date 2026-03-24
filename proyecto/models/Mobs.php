<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "mobs".
 *
 * @property int $id
 * @property string|null $tipo
 * @property int|null $es_hostil
 * @property int|null $id_bioma
 *
 * @property Biomas $bioma
 */
class Mobs extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'mobs';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['tipo', 'es_hostil', 'id_bioma'], 'default', 'value' => null],
            [['es_hostil', 'id_bioma'], 'integer'],
            [['tipo'], 'string', 'max' => 50],
            [['id_bioma'], 'exist', 'skipOnError' => true, 'targetClass' => Biomas::class, 'targetAttribute' => ['id_bioma' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'tipo' => 'Tipo',
            'es_hostil' => 'Es Hostil',
            'id_bioma' => 'Id Bioma',
        ];
    }

    /**
     * Gets query for [[Bioma]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBioma()
    {
        return $this->hasOne(Biomas::class, ['id' => 'id_bioma']);
    }

    public function extraFields()
    {
        // Esto nos permite traer el objeto completo del Bioma
        return ['bioma'];
    }
}
