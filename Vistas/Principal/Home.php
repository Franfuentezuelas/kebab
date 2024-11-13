<?php $this->layout('layout'); ?>

<?php $this->start('head') ?>
<?php require_once "head.php"; ?>
<?php $this->stop() ?>

<?php $this->start('header') ?>
<?php require_once "header.php"; ?>
<?php $this->stop() ?>

<?php $this->start('nav') ?>
<?php require_once "nav.php"; ?>
<?php $this->stop() ?>

<?php $this->start('main') ?>
<?php require_once "main.php"; ?>
<?php $this->stop() ?>

<?php $this->start('footer') ?>
<?php require_once "footer.php"; ?>
<?php $this->stop() ?>

<?php $this->start('scripts') ?>
<?php require_once "scripts.php"; ?>
<?php $this->stop() ?>
