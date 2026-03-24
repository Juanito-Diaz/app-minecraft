<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "mundos".
 *
 * @property int $id
 * @property string|null $nombre
 * @property int|null $semilla
 * @property string|null $dificultad
 *
 * @property Biomas[] $biomas
 * @property JugadoresMundos[] $jugadoresMundos
 * @property Jugadores[] $jugadors
 */
class Mundos extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'mundos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'semilla', 'dificultad'], 'default', 'value' => null],
            [['semilla'], 'integer'],
            [['nombre'], 'string', 'max' => 50],
            [['dificultad'], 'string', 'max' => 20],
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
            'semilla' => 'Semilla',
            'dificultad' => 'Dificultad',
        ];
    }

    /**
     * Gets query for [[Biomas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBiomas()
    {
        return $this->hasMany(Biomas::class, ['id_mundo' => 'id']);
    }

    /**
     * Gets query for [[JugadoresMundos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresMundos()
    {
        return $this->hasMany(JugadoresMundos::class, ['id_mundo' => 'id']);
    }

    /**
     * Gets query for [[Jugadors]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadors()
    {
        return $this->hasMany(Jugadores::class, ['id' => 'id_jugador'])->viaTable('jugadores_mundos', ['id_mundo' => 'id']);
    }

    public function fields()
    {
        return ['id', 'nombre', 'semilla', 'dificultad'];
    }

    public function extraFields()
    {
        // Esto permite que al pedir el mundo, podamos solicitar biomas y jugadors
        return ['biomas', 'jugadors'];
    }
}
