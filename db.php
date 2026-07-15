<?php

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "gymtracker"
);

if($conn->connect_error){
    die("Connection Failed");
}

?>