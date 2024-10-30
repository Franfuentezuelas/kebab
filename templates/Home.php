<?php $this->layout('layout'); ?>


<?php $this->start('head') ?>
<?php require_once "head.php"; ?>
<?php $this->stop() ?>


<?php $this->start('welcome') ?>
<h1>Welcome!</h1>
<p>Hello World </p>
<?php $this->stop() ?>

<?php $this->start('listado') ?>
<h1>Lista de Usuarios</h1>
<ul>
<?php foreach ($users as $user): ?>
        <li><?= $user['name']; ?> - <?= $user['email']; ?> </li>
    <?php endforeach; ?>

</ul>
<?php $this->stop() ?>
