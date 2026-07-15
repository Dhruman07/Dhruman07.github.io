<?php

include "db.php";

$key=$_GET["key"];

$stmt=$conn->prepare("SELECT storage_value
FROM storage_data
WHERE storage_key=?");

$stmt->bind_param("s",$key);

$stmt->execute();

$result=$stmt->get_result();

if($row=$result->fetch_assoc()){

    echo json_encode([
        "value"=>$row["storage_value"]
    ]);

}else{

    echo json_encode([
        "value"=>null
    ]);

}

?>