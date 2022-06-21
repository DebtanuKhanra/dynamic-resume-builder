<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");
    session_start();
    $con= mysqli_connect('localhost','root','');
    mysqli_select_db($con,'finalproject');
    $result=array();
    unset($_SESSION['USER_LOGIN_RX']);
    unset($_SESSION['USER_ID']);
    $result['status']=1;
    echo json_encode($result);
    session_destroy();
?>