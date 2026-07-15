<?php

include "db.php";

$data=json_decode(file_get_contents("php://input"),true);

$key=$data["key"];
$value=$data["value"];

$stmt=$conn->prepare("REPLACE INTO storage_data(storage_key,storage_value)
VALUES(?,?)");

$stmt->bind_param("ss",$key,$value);

$stmt->execute();

echo json_encode(["success"=>true]);

?>