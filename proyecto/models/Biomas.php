<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "biomas".
 *
 * @property int $id
 * @property string|null $nombre
 * @property float|null $temperatura
 * @property int|null $id_mundo
 *
 * @property Mobs[] $mobs
 * @property Mundos $mundo
 */
class Biomas extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'biomas';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'temperatura', 'id_mundo'], 'default', 'value' => null],
            [['temperatura'], 'number'],
            [['id_mundo'], 'integer'],
            [['nombre'], 'string', 'max' => 50],
            [['id_mundo'], 'exist', 'skipOnError' => true, 'targetClass' => Mundos::class, 'targetAttribute' => ['id_mundo' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'temperatura' => 'Temperatura',
            'id_mundo' => 'Id Mundo',
        ];
    }

    /**
     * Gets query for [[Mobs]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMobs()
    {
        return $this->hasMany(Mobs::class, ['id_bioma' => 'id']);
    }

    /**
     * Gets query for [[Mundo]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMundo()
    {
        return $this->hasOne(Mundos::class, ['id' => 'id_mundo']);
    }

    public function extraFields()
    {
        // Esto permite que al consultar el bioma, podamos expandir sus mobs y su mundo padre
        return ['mobs', 'mundo'];
    }
}
