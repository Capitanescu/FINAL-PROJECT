var product = [];

async function draw() {
    document.querySelector(".spinner-box").classList.remove("hidden");
    var response = await fetch(
        "https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/produse.json"
    );
    product = await response.json();
    document.querySelector(".spinner-box").classList.add("hidden");
    var str = "";
    for (var i in product) {
        if (product[i] === null) {
            continue;
        }
        str += `
        <tbody>
                <tr>
                    <td>${product[i].nume}</td>
                    <td>${product[i].stoc}</td>
                    <td>${product[i].pret}</td>
                    <td>
                    <a href="edit.html?id=${i}"><button class="link-icon" type="button" ><i class="fas fa-edit icon-style-1" aria-hidden="true"></i></button>
                    </a>
                        
                    </td>
                    <td>
                        <button onclick="sterge(event,'${i}');" class="link-icon" type="button"><i class="fas fa-trash-alt icon-style-2" aria-hidden="true"></i></button>
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
    const firma = document.querySelector("[name='firma']").value;
    const categorie = document.querySelector("[name='categorie']").value;
    const pretProdus = document.querySelector("[name='pret']").value;
    const pozaProdus = document.querySelector("[name='imagine']").value;
    const pozaProdusUnu = document.querySelector("[name='imageOne]").value;
    const pozaProdusDoi = document.querySelector("[name='imageTwo]").value;
    const pozaProdusTrei = document.querySelector("[name='imageThree]").value;
    const pozaProdusPatru = document.querySelector("[name='imageFour]").value;
    const pozaProdusCinci = document.querySelector("[name='imageFive]").value;
    const stocProdus = document.querySelector("[name='stoc']").value;
    const descriereProdus = document.querySelector("[name='descriere']").value;
    const codProducator  = document.querySelector("[name='codProducator']").value;
    const codFurnizor  = document.querySelector("[name='codFurnizor']").value;
    const material  = document.querySelector("[name='material']").value;
    const culoare = document.querySelector("[name='culoare']").value;


    if (numeProdus === "" || stocProdus === "" || pretProdus === "" || descriereProdus === "" || pozaProdus === "" || pozaProdusUnu === "" || pozaProdusDoi === "" || pozaProdusTrei === "" || pozaProdusPatru === "" || pozaProdusCinci === "" || codProducator === "" || codFurnizor === "" || material === "" || culoare === "") {
        alert('Va rugam completati toate campurile!');
    } else {
        var obj = {
            nume: document.querySelector("[name='nume']").value,
            firma: document.querySelector("[name='firma']").value,
            categorie: document.querySelector("[name='categorie']").value,
            pret: document.querySelector("[name='pret']").value,
            imagine: document.querySelector("[name='imagine']").value,
            imageOne: document.querySelector("[name='imageOne']").value,
            imageTwo: document.querySelector("[name='imageTwo']").value,
            imageThree: document.querySelector("[name='imageThree']").value,
            imageFour: document.querySelector("[name='imageFour']").value,
            imageFive: document.querySelector("[name='imageFive']").value,
            stoc: document.querySelector("[name='stoc']").value,
            descriere: document.querySelector("[name='descriere']").value,
            codProducator: document.querySelector("[name='codProducator']").value,
            codFurnizor: document.querySelector("[name='codFurnizor']").value,
            material: document.querySelector("[name='material']").value,
            culoare: document.querySelector("[name='culoare']").value
        };
        document.querySelector(".spinner-box").classList.remove("hidden");
        var response = await fetch("https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/produse.json", {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        document.querySelector(".spinner-box").classList.add("hidden");
        draw();
        document.querySelector("#addForm").reset();
    }
}

async function sterge(event, i) {
    event.preventDefault();
    if (confirm("Esti sigur ca vrei sa stergi produsul?")) {
        document.querySelector(".spinner-box").classList.remove("hidden");
        var response = await fetch(
            `https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/produse/${i}.json`, {

                method: "delete"
            });
        document.querySelector(".spinner-box").classList.add("hidden");
        draw();
    }

}
