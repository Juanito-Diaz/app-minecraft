<?php

use yii\db\Migration;

class m260410_233246_add_auth_to_jugadores_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('jugadores', 'password_hash', $this->string()->notNull());
        $this->addColumn('jugadores', 'auth_key', $this->string(32)->notNull());
        $this->addColumn('jugadores', 'access_token', $this->string(255)->defaultValue(null));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('jugadores', 'access_token');
        $this->dropColumn('jugadores', 'auth_key');
        $this->dropColumn('jugadores', 'password_hash');
        
        return true;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m260410_233246_add_auth_to_jugadores_table cannot be reverted.\n";

        return false;
    }
    */
}
