<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%permiso}}`.
 */
class m260516_213346_create_permiso_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%permiso}}', [
            'per_id' => $this->primaryKey(),
            'per_vista' => $this->string(100)->notNull(),
            'per_rol' => $this->string(150)->notNull(),
        ]);

        // Add 'rol' column to 'jugadores' if it doesn't exist to make the permissions logic work
        $tableSchema = Yii::$app->db->schema->getTableSchema('{{%jugadores}}');
        if ($tableSchema !== null && !isset($tableSchema->columns['rol'])) {
            $this->addColumn('{{%jugadores}}', 'rol', $this->string(50)->notNull()->defaultValue('jugador'));
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%permiso}}');
        $this->dropColumn('{{%jugadores}}', 'rol');
    }
}
