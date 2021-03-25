var products = [];
var i = window.location.search.substring(4);
async function details() {
    document.querySelector(".backgroundLoader").classList.remove("hidden");

    var response = await fetch(
        `https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/${i}.json`
    );
    window.products = await response.json();
    document.querySelector(".backgroundLoader").classList.add("hidden");
    var str = "";

    str += `
    <div class="col-12 col-md-6">
                <div id="content-wrapper">
                    <div class="column">
                        <img class="mainPicture" id="mainImage" src="${products.imagine}">

                        // <div id="slide-wrapper">
                        //     <i id="slideLeft" class="fa fa-chevron-circle-left arrow" aria-hidden="true"></i>
                        //
                        //     <div id="slider">
                        //         <img class="thumbnail active" src="${products.imagine}">
                        //
                        //         <img class="thumbnail" src="img/products/nike_hanorac_1_1.jpg">
                        //         <img class="thumbnail" src="img/products/nike_hanorac_1_2.jpg">
                        //         <img class="thumbnail" src="img/products/nike_hanorac_1_3.jpg">
                        //         <img class="thumbnail" src="img/products/nike_hanorac_1_4.jpg">
                        //
                        //
                        //     </div>
                        //
                        //     <i id="slideRight" class="fa fa-chevron-circle-right arrow" aria-hidden="true"></i>
                        // </div>
                    </div>


                </div>

            </div>
            <div class="col-12 col-md-6">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="product-details ft-twelve">${products.nume}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="product-details ft-three">${products.pret}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <span class="ft-five ft-weight-400 pr-3"><s>${products.pret} Lei</s></span>
                            <p class="product-details ft-eleven pr-3">${products.pret} Lei</p>
                            <div class="stoc-wrap">
                                <button type="button" class="btn btn-success ft-three">în stoc</button>
                                <span class="stoc">- ${products.stoc}</span>
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 mt-5 d-flex align-items-center">
                            <span class="product-details pr-2">Cantitate:</span>
                            <input class="input-cart text-center" type="number" value="1" min="1" max="999" id="cantitate">
                            <button type="button" class="px-5 btn btn-primary ft-five btn-cart ml-auto"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                Adauga în Cos</button>
                        </div>
                    </div>

                </div>
                
     
 `;
    document.querySelector("#showList").innerHTML = str;

}

// async function addCos() {
//     var obj = {
//         imagine: produse.imagine,
//         nume: produse.nume,
//         pret: produse.pret,
//         stoc: produse.stoc,
//         cantitate: document.querySelector("#cantitate").value
//     }
//     var response = await fetch(
//         `https://proiect-final-marian.firebaseio.com/cos/${i}.json`, {
//             method: "put",
//             body: JSON.stringify(obj)
//         }
//     );
//     alert("Produsul a fost adaugat in cosul de cumparaturi");
// }




async function addCos(event, i) {
    document.querySelector(".backgroundLoader").classList.remove("hidden");

    var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`);
    document.querySelector(".backgroundLoader").classList.add("hidden");
    produseCos = await response.json();
    var found = false;
    var val = document.querySelector("#cantitate").value;
    if (produseCos !== null) {
        if (confirm("Produsul a mai fost adaugat in cos. Esti sigur ca vrei sa continui?")) {
            if (parseInt(val) + parseInt(produseCos.cantitate) <= products.stoc) {
                produseCos.cantitate = parseInt(produseCos.cantitate) + parseInt(document.querySelector("#cantitate").value);
                var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}/cantitate.json`, {
                    method: "put",
                    body: produseCos.cantitate


                });
            } else {
                alert('Cantitatea selectata depaseste stocul existent!');
            }

        }


    } else if (parseInt(val) <= products.stoc) {
        var obj = {
            imagine: products.imagine,
            nume: products.nume,
            descriere: products.descriere,
            pret: products.pret,
            stoc: products.stoc,
            cantitate: document.querySelector("#cantitate").value

        }
        document.querySelector(".backgroundLoader").classList.remove("hidden");
        var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)

        });
        document.querySelector(".backgroundLoader").classList.add("hidden");
        alert("Produsul a fost adaugat in cos")

    } else {
        alert('Cantitatea selectata depaseste stocul existent!');
    }
}