<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "items".
 *
 * @property int $id
 * @property string|null $nombre
 * @property int|null $es_apilable
 * @property int|null $puntos_ataque
 *
 * @property Inventarios[] $inventarios
 */
class Items extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'items';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre'], 'default', 'value' => null],
            [['es_apilable'], 'default', 'value' => 1],
            [['puntos_ataque'], 'default', 'value' => 0],
            [['es_apilable', 'puntos_ataque'], 'integer'],
            [['nombre'], 'string', 'max' => 50],
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
            'es_apilable' => 'Es Apilable',
            'puntos_ataque' => 'Puntos Ataque',
        ];
    }

    /**
     * Gets query for [[Inventarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInventarios()
    {
        return $this->hasMany(Inventarios::class, ['id_item' => 'id']);
    }

    public function extraFields()
    {
        // Permite ver la lista de registros de inventario que contienen este item
        return ['inventarios', 'inventarios.jugador'];
    }
}
