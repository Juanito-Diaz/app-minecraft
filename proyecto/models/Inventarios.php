<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "inventarios".
 *
 * @property int $id
 * @property int|null $id_jugador
 * @property int|null $id_item
 * @property int|null $cantidad
 *
 * @property Items $item
 * @property Jugadores $jugador
 */
class Inventarios extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'inventarios';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_jugador', 'id_item', 'cantidad'], 'default', 'value' => null],
            [['id_jugador', 'id_item', 'cantidad'], 'integer'],
            [['id_jugador'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadores::class, 'targetAttribute' => ['id_jugador' => 'id']],
            [['id_item'], 'exist', 'skipOnError' => true, 'targetClass' => Items::class, 'targetAttribute' => ['id_item' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_jugador' => 'Id Jugador',
            'id_item' => 'Id Item',
            'cantidad' => 'Cantidad',
        ];
    }

    /**
     * Gets query for [[Item]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getItem()
    {
        return $this->hasOne(Items::class, ['id' => 'id_item']);
    }

    /**
     * Gets query for [[Jugador]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugador()
    {
        return $this->hasOne(Jugadores::class, ['id' => 'id_jugador']);
    }

    public function extraFields()
    {
        return ['jugador', 'item'];
    }
}
