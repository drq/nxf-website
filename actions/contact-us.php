<?php
    $json = stripslashes($_POST["json"]);
    mail("drq@nxfinc.com", "Request Received", $json);
    echo $json;
?>