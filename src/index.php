<?php
ob_start();
require_once __DIR__ . '/../vendor/autoload.php';
use App\App;
App::app();
