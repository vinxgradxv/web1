$.get("./server/restore.php", function (data) {
    if (data !== "") {
        let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
        document.getElementById("no_result").remove();
        first = false;
        let array = data.split("#");
        for (let i = 0; i < array.length; i += 6) {
            addRow(array[i], array[i + 1], array[i + 2], array[i + 3], array[i + 4], array[i + 5]);
        }
        tbody.lastChild.remove();
    }
});

if (getCookie("sound") === "on") {
    change_sound();
} else if (getCookie("sound") === undefined) {
    document.cookie = "sound=off";
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}



