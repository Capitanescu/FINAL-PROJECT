var list = [];

async function draw() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");
    var response = await fetch(
        "https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    );
    window.list = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";
    for (var i in list) {
        if (list[i] === null) {
            continue;
        }
        str += `
        <tbody>
                <tr>
                    <td>${list[i].nume}</td>
                    <td>${list[i].stoc}</td>
                    <td>${list[i].pret}</td>
                    <td>
                    <a href="edit.html?id=${i}"><button class="link-icon" type="button" ><i class="fas fa-edit icon-style-1" aria-hidden="true"></i></button>
                    </a>
                        
                    </td>
                    <td>
                        <button class="link-icon" type="button" onclick="delete(event,'${i}');"><i class="fas fa-trash-alt icon-style-2" aria-hidden="true"></i></button>
                    </td>

                </tr>

                </tbody>
        `;
    }
    document.querySelector("#productsList").innerHTML = str;
}

async function addProduct(event) {
    event.preventDefault();

    const numeProdus = document.querySelector("[name='nume']").value;
    const stocProdus = document.querySelector("[name='stoc']").value;
    const pretProdus = document.querySelector("[name='pret']").value;
    const descriereProdus = document.querySelector("[name='descriere']").value;
    const pozaProdus = document.querySelector("[name='imagine']").value;

    if (numeProdus === "" || stocProdus === "" || pretProdus === "" || descriereProdus === "" || pozaProdus === "") {
        alert('Va rugam completati toate campurile!');
    } else {
        var obj = {
            nume: document.querySelector("[name='nume']").value,
            imagine: document.querySelector("[name='imagine']").value,
            stoc: document.querySelector("[name='stoc']").value,
            pret: document.querySelector("[name='pret']").value,
            descriere: document.querySelector("[name='descriere']").value
        };
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(

            "https://proiect-final-marian.firebaseio.com/produse.json", {
                method: "post",
                body: JSON.stringify(obj)
            });
        document.querySelector(".backgroundLoader").classList.add("hidden");
        draw();
        document.querySelector("#addForm").reset();
    }
}

async function delete(event, i) {
    event.preventDefault();
    if (confirm("Esti sigur ca vrei sa stergi produsul?")) {
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(
            `https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/products/${i}.json`, {

                method: "delete"
            })
        document.querySelector(".backgroundLoader").classList.add("hidden");
        draw();
    };

    // location.href = "admin.html";
}
