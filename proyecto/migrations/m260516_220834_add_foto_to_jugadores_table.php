<?php

use yii\db\Migration;

class m260516_220834_add_foto_to_jugadores_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('jugadores', 'foto', $this->string(255)->null());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('jugadores', 'foto');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m260516_220834_add_foto_to_jugadores_table cannot be reverted.\n";

        return false;
    }
    */
}
