<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "jugadores".
 *
 * @property int $id
 * @property string $username
 * @property int|null $nivel_xp
 * @property string|null $fecha_union
 *
 * @property Inventarios[] $inventarios
 * @property JugadoresMundos[] $jugadoresMundos
 * @property Mundos[] $mundos
 */
class Jugadores extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jugadores';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fecha_union'], 'default', 'value' => null],
            [['nivel_xp'], 'default', 'value' => 0],
            [['username'], 'required'],
            [['nivel_xp'], 'integer'],
            [['fecha_union'], 'safe'],
            [['username'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Username',
            'nivel_xp' => 'Nivel Xp',
            'fecha_union' => 'Fecha Union',
        ];
    }

    /**
     * Gets query for [[Inventarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInventarios()
    {
        return $this->hasMany(Inventarios::class, ['id_jugador' => 'id']);
    }

    /**
     * Gets query for [[JugadoresMundos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresMundos()
    {
        return $this->hasMany(JugadoresMundos::class, ['id_jugador' => 'id']);
    }

    /**
     * Gets query for [[Mundos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getMundos()
    {
        return $this->hasMany(Mundos::class, ['id' => 'id_mundo'])->viaTable('jugadores_mundos', ['id_jugador' => 'id']);
    }

    public function extraFields()
    {
        return [
            'inventarios',
            'inventarios.item',
            'mundos'
        ];
    }
}
