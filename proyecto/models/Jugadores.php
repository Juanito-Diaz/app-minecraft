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
class Jugadores extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
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
            [['username', 'password_hash'], 'required'],
            [['nivel_xp'], 'integer'],
            [['fecha_union'], 'safe'],
            [['username'], 'string', 'max' => 50],
            [['password_hash', 'access_token'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            [['username'], 'unique'],
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
            'password_hash' => 'Password Hash',
            'auth_key' => 'Auth Key',
            'access_token' => 'Access Token',
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

    /**
     * IdentityInterface implementations
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
}
