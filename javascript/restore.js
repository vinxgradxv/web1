let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
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