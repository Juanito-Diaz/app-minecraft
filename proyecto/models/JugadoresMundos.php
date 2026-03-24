<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "jugadores_mundos".
 *
 * @property int $id_jugador
 * @property int $id_mundo
 * @property string|null $ultima_conexion
 *
 * @property Jugadores $jugador
 * @property Mundos $mundo
 */
class JugadoresMundos extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jugadores_mundos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ultima_conexion'], 'default', 'value' => null],
            [['id_jugador', 'id_mundo'], 'required'],
            [['id_jugador', 'id_mundo'], 'integer'],
            [['ultima_conexion'], 'safe'],
            [['id_jugador', 'id_mundo'], 'unique', 'targetAttribute' => ['id_jugador', 'id_mundo']],
            [['id_jugador'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadores::class, 'targetAttribute' => ['id_jugador' => 'id']],
            [['id_mundo'], 'exist', 'skipOnError' => true, 'targetClass' => Mundos::class, 'targetAttribute' => ['id_mundo' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_jugador' => 'Id Jugador',
            'id_mundo' => 'Id Mundo',
            'ultima_conexion' => 'Ultima Conexion',
        ];
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

    /**
     * Gets query for [[Mundo]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMundo()
    {
        return $this->hasOne(Mundos::class, ['id' => 'id_mundo']);
    }

}
