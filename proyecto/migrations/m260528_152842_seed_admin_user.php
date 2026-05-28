<?php

use yii\db\Migration;

class m260528_152842_seed_admin_user extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // First delete any existing admin user just in case
        $this->delete('{{%jugadores}}', ['username' => 'admin']);

        $passwordHash = Yii::$app->security->generatePasswordHash('123');
        $authKey = Yii::$app->security->generateRandomString();
        $accessToken = Yii::$app->security->generateRandomString();

        $this->insert('{{%jugadores}}', [
            'username' => 'admin',
            'password_hash' => $passwordHash,
            'auth_key' => $authKey,
            'access_token' => $accessToken,
            'rol' => 'admin',
            'nivel_xp' => 100,
            'fecha_union' => date('Y-m-d H:i:s'),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->delete('{{%jugadores}}', ['username' => 'admin']);
        return true;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m260528_152842_seed_admin_user cannot be reverted.\n";

        return false;
    }
    */
}
