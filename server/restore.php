<?php
session_start();

date_default_timezone_set('UTC');

function get_utc_dif() {
    if (isset($_GET["utc_dif"])) {
        return $_GET["utc_dif"];
    }
    return -180;
}

if (isset($_SESSION['results'])) {
    $utc_dif = get_utc_dif();
    $date_interval = new DateInterval("PT" . abs($utc_dif) . "M");
    $res = "";
    for ($i = 0; $i < sizeof($_SESSION['results']); $i++) {
        $cur = $_SESSION['results'][$i];
        $res = $res . "<tr>";

        $dt = clone $cur[0];

        if ($utc_dif < 0) {
            $dt->add($date_interval);
        }
        else {
            $dt->sub($date_interval);
        }
        $res = $res . "<td>" . $dt->format("H:i:s") . "</td>";

        for ($j = 1; $j < sizeof($cur); $j++) {
            $res = $res . "<td>" . $cur[$j] . "</td>";
        }

        $res = $res . "</tr>#";
    }
    echo $res;
}
