$.get("./server/restore.php", {utc_dif: LOCAL_UTC_DIF}, function (data) {
    if (data !== "error" && data !== "") {
        document.getElementById("no_result").remove();
        first = false;
        const array = data.split("#");
        for (let i = 0; i < array.length - 1; i += 1) {
            addRow(array[i]);
        }
    }
});

if (getCookie("sound") === "on") {
    change_sound();
} else if (getCookie("sound") === undefined) {
    document.cookie = "sound=off; max-age=3600";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}



