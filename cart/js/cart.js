async function draw() {
    var transport = 0;
    var total = 0;
    var totalProduse = 0;
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/.json`);
    window.list = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";
    for (var i in list) {
        if (list[i] === null) continue;
        total = total + list[i].cantitate * list[i].pret;
        totalProduse = totalProduse + list[i].cantitate;
        transport = transport + list[i].cantitate;
        str += ` 
                <tr>
                    <th><a href="../details/details.html?id=${i}">${list[i].nume} </a></th>
                    <td>
                        <div class="img-wrap">
                            <img src="${list[i].imagine}" alt="">
                        </div>
                    </td>
                    <td>${list[i].pret}</td>
                    <td name="cantitate">
                        <input type="button" value="-" class="minus" onclick="decrease(event,'${i}')">
                        <input type="number" value="${list[i].cantitate}" min="1" max="${list[i].stoc" class="numValue">
                        <input type="button" value="+" class="plus" onclick="increase(event,'${i}')">
                    </td>
                    <td>${list[i].cantitate * list[i].pret}</td>
                    <td>
                        <button class="deleteBtn" onclick="sterge(event,'${i}')">
                            <i class="fas fa-trash-alt delete-product-icon"></i>
                        </button>
                    </td>
                </tr>
    `
    }
    document.querySelector("#showProducts table tbody").innerHTML = str;

    document.querySelector("#products").innerHTML = totalProduse;;
    document.querySelector("#totalPrice").innerHTML = total;
    document.querySelector("#tva").innerHTML = 19 / 100 * total;
    document.querySelector("#transport").innerHTML = transport * 5;

}
async function decrease(event, i) {
    if (list[i].cantitate > 1) {
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) - 1
        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
    } else {
        alert("Cantitatea minima este 1.");
    }
    draw();
}
async function increase(event, i) {
    if (list[i].cantitate < list[i].stoc) {
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}/cantitate.json`, {
            method: "put",
            body: parseInt(list[i].cantitate) + 1
        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
    } else {
        alert("Stoc maxim");
    }
    draw();
}
async function sterge(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`, {
        method: "delete",
    });
    document.querySelector(".backgroundLoader").classList.add("hidden");
    alert("Esti sigur ca vrei sa stergi acest produs");
    draw();
}
