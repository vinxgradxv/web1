let get_X;
let get_Y;
let get_R;
let first = true;
let sad_cat = "data/9b81048132e5f84eb054c7c9b25e0674.gif";
let happy_cat = "data/b78dc35cd99fe399b4b5a7bcf318ae97.gif";
let is_sound_on = false;
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
        $.get("./server/main.php", {x : get_X, y: get_Y, r: get_R}, function (data) {
            if (data !== "error") {
                let array = data.split("#");
                addRow(array[0], array[1], array[2], array[3], array[4], array[5]);
                addCircle(array[2], array[3], array[4], array[5]);
            }
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
} else if (yValue >= 5 || yValue <= -5) {
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

function addCircle(x, y, r, result) {
    let x_base = 75;
    let y_base = 75;
    let r_base = 60 / r;
    let cy = y_base - r_base * y;
    let cx = x_base + r_base * x;
    cy = Math.min(150, cy);
    cy = Math.max(0, cy);
    cx = Math.min(150, cx);
    cx = Math.max(0, cx);
    let circle = document.getElementById("old_pointer");
    circle.setAttribute("visibility", "visible");
    circle.setAttribute("cx", cx.toString());
    circle.setAttribute("cy", cy.toString());
    if (result === "Не попадает") {
        circle.setAttribute("fill", "red");
        change_kitten(sad_cat);
        if (is_sound_on) {
            playAudio("data/nepravilno-poprobuy-esch-raz.mp3");
        }
    }
    else {
        circle.setAttribute("fill", "green");
        change_kitten(happy_cat);
        if (is_sound_on) {
            playAudio("data/-est-probitie-wot.mp3");
        }
    }
}
function change_kitten(src) {
    let kit = document.querySelector("img.kitten");
    kit.setAttribute("src", src);
}

function playAudio(url) {
    new Audio(url).play();
}

function change_sound() {
    if (is_sound_on) {
        is_sound_on = false;
        document.getElementById("sound_img").setAttribute("src","data/Frame 1no_sound.svg");
        document.cookie = "sound=off";
    }
    else {
        is_sound_on = true;
        document.getElementById("sound_img").setAttribute("src","data/Frame 1sound.svg");
        document.cookie = "sound=on";
    }
}



