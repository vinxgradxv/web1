<?php

date_default_timezone_set('UTC');

$correct_x_values = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];
$correct_r_values = ['1', '1.5', '2', '2.5', '3'];

function get_utc_dif() {
    if (isset($_GET["utc_dif"])) {
        return $_GET["utc_dif"];
    }
    return -180;
}

function isAllSet(): bool
{
    return isset($_GET["x"]) and isset($_GET["y"]) and isset($_GET["r"]);
}

function areAllValuesNumbers($x, $y, $r): bool
{
    return strlen($x) <= 16 and is_numeric($x) and strlen($y) <= 16 and is_numeric($y) and strlen($r) <= 16 and is_numeric($r);
}

function areAllValuesCorrect($x, $y, $r): bool
{
    global $correct_x_values, $correct_r_values;
    return in_array($x, $correct_x_values) and in_array($r, $correct_r_values) and areAllValuesNumbers($x,$y,$r) and $x <= 4 and $x >= -4 && $y < 5 and $y > -5 and $r >= 1 and $r <=3;
}

function check_left_top($x, $y, $r): bool
{
    return $y >= 0 && $x <= 0 && ($y ** 2) + ($x ** 2) <= (($r ** 2) / 4);
}
function check_right_top($x, $y, $r): bool
{
    return $y <= ($r / 2) && $x - ($y * 2) >= 0 && $y >= 0 && $x >= 0 && $x <= $r;
}
function check_right_bottom($x, $y, $r): bool
{
    return $y <= 0 && $y >= -$r && $x >= 0 && $x <= ($r / 2);
}
if (isset($_GET) && isAllSet()) {
    session_start();
    $utc_dif = get_utc_dif();
    $start = microtime(true);
    $x = $_GET['x'];
    $y = $_GET['y'];
    $r = $_GET['r'];
    $count = 0;

    if (!areAllValuesCorrect($x, $y, $r)){
        echo "error";
    }
    else {
        $check = check_right_bottom($x, $y, $r) || check_right_top($x, $y, $r) || check_left_top($x, $y, $r);

        $time = number_format(microtime(true) - $start, 6);
        $dt = new DateTime("now");

        $otv = "";
        if ($check) {
            $otv = "Попадает";
        } else {
            $otv = "Не попадает";
        }

        $date_interval = new DateInterval("PT" . abs($utc_dif) . "M");

        if (!isset($_SESSION['results'])) {
            $_SESSION['results'] = array();
        }
        array_push($_SESSION['results'], [$dt, $time, $x, $y, $r, $otv]);

        $client_dt = clone $dt;

        if ($utc_dif < 0) {
            $client_result = "<tr><td>" . $client_dt->add($date_interval)->format("H:i:s"). "</td> <td>" . $time . "</td> <td>" .$x ."</td> <td>" . $y . "</td> <td>" . $r . "</td> <td>" . $otv . "</td></tr>";
        }
        else {
            $client_result = "<tr><td>" . $client_dt->sub($date_interval)->format("H:i:s"). "</td> <td>" . $time . "</td> <td>" .$x ."</td> <td>" . $y . "</td> <td>" . $r . "</td> <td>" . $otv . "</td></tr>";
        }

        echo $client_result;
    }
}
else {
    echo "error";
}


