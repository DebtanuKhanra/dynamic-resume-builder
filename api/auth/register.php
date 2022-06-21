<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");
    session_start();
    $con= mysqli_connect('localhost','root','');
    mysqli_select_db($con,'finalproject');
    $result=array();
    $gotdata=(json_decode(file_get_contents('php://input'), true));
    $email=$gotdata['email'];
    $password=$gotdata['password'];
    $name=$gotdata['name'];
    $q="SELECT * FROM user WHERE uemail='$email'";
    $result=array();
    if ($name == "") {
        $result['status']=0;
        $result['msg']="Enter Name";
    } else if ($password == "") {
        $result['status']=0;
        $result['msg']="Enter Password";
    } else if ($email == "") {
        $result['status']=0;
        $result['msg']="Enter Email";
    } else {
        $query="SELECT * FROM user WHERE uemail='$email'";
        $res=mysqli_query($con,$query);
        $n=mysqli_num_rows($res);
        if($n>0){
            $result['status']=0;
            $result['msg']="Email is already in use";
        }else{
                $password=password_hash($password, PASSWORD_DEFAULT);
                $uid=chr(64+rand(1,25)).rand(11,99).chr(64+rand(1,25)).chr(64+rand(1,25)).rand(11,99).chr(64+rand(1,25));
                $q="INSERT INTO user(uid,uemail,uname,upass) VALUES('$uid','$email','$name','$password')";
                if(mysqli_query($con,$q)){
                    $row=mysqli_fetch_assoc(mysqli_query($con,"SELECT * FROM user WHERE uid='$uid'"));
                    $result['status']=1;
                    $idd=$row['uid'];
                    $result['msg']="Account Created Successfully";
                }else{
                    $result['status']=0;
                    $result['msg']="Something Went Wrong";
                }
            }
    }

    echo json_encode($result);
    session_destroy();
?>