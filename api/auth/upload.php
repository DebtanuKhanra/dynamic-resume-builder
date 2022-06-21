<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json; charset=utf-8");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $image_parts = explode(";base64,", $request->selectedFile);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $folderPath = "../images/";
    $ext=uniqid() . ".$image_type";
    $file = $folderPath . $ext;
    file_put_contents($file, $image_base64); 

    echo $ext;

?>