<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/config/console.php';
$app = new yii\console\Application($config);

$users = \app\models\Jugadores::find()->limit(5)->all();
foreach ($users as $u) {
    echo $u->id . ' - ' . $u->username . "\n";
}
