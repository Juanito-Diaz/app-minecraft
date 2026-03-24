<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Mundos $model */

$this->title = 'Create Mundos';
$this->params['breadcrumbs'][] = ['label' => 'Mundos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="mundos-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
