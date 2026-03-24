<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Mundos $model */

$this->title = 'Update Mundos: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Mundos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="mundos-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
