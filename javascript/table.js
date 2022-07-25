let get_X;
let get_Y;
let get_R;
let first = true;
function onSubmit() {
    if (validateForm()) {
        let xRadioButtons = document.getElementsByName("x_value");
        for (let xRadioButton of xRadioButtons) {
            if (xRadioButton.checked) {
                get_X = xRadioButton.value;
                break;
            }
        }

        let rRadioButtons = document.getElementsByName("r_value");
        for (let rRadioButton of rRadioButtons) {
            if (rRadioButton.checked) {
                get_R = rRadioButton.value;
                break;
            }
        }
        get_Y = document.getElementById("y_value").value.replace(/,/, '.');
        $.get("./server/work.php", {x : get_X, y: get_Y, r: get_R}, function (data) {
            let array = data.split("#");
            addRow(array[0], array[1], array[2], array[3], array[4], array[5]);
        });

    }
}


function validateForm() {
    const yValue = document.getElementById("y_value").value.trim().replace(/,/, '.');
    if (yValue === "") {
        alert("Заполните поле Значение Y!!!");
        return false;
} else if (isNaN(Number(yValue))) {
        alert("Поле Значение Y принимает только числа");
        return false;
} else if (yValue > 5 || yValue < -5) {
        alert("Значение Y не входит в установленные рамки");
        return false;
}
    else {
        alert("Форма успешно отправлена");
        return true;
    }
}

function addRow(cur_time, comp_time, x, y, r, result){
    let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
    let row = document.createElement("TR");
    tbody.append(row);

    if (first) {
        first = false;
        document.getElementById("no_result").remove();
    }

    let th1 = document.createElement("TD");
    let th2 = document.createElement("TD");
    let th3 = document.createElement("TD");
    let th4 = document.createElement("TD");
    let th5 = document.createElement("TD");
    let th6 = document.createElement("TD");

    row.appendChild(th1);
    row.appendChild(th2);
    row.appendChild(th3);
    row.appendChild(th4);
    row.appendChild(th5);
    row.appendChild(th6);


    th1.innerHTML = cur_time;
    th2.innerHTML = comp_time;
    th3.innerHTML = x;
    th4.innerHTML = y;
    th5.innerHTML = r;
    th6.innerHTML = result;
    if (result === "Не попадает") {
        row.className = "notGetIn";
    }
    else {
        row.className = "getIn";
    }
}

function clearHistory(){
    if (!first) {
        $.get("./server/reset.php");
        first = true;
        let tbody = document.getElementsByClassName("table")[0].getElementsByTagName('TBODY')[0];
        tbody.innerHTML = '<tr id="no_result"><th colspan="6">Нет результатов</th></tr>';

    }
    }


