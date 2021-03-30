let list = [];
let url= "https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/";
var index = window.location.search.substring(4);
async function draw() {
    document.querySelector(".spinner-box").classList.remove("hidden");
    const response = await fetch(url + ".json");
    list = await response.json();
    document.querySelector(".spinner-box").classList.add("hidden");
    var str = "";

        str += `
    <div class="col-12 col-md-6">
                <div id="content-wrapper">
                    <div class="column">
                        <img class="mainPicture bounceIn" id="mainImage" src="${list[index].imagine}">

                        <div id="slide-wrapper">
                            <i id="slideLeft" class="fa fa-chevron-circle-left arrow" aria-hidden="true"></i>

                            <div id="slider">
                                <img class="thumbnail active" src="${list[index].imagine}">

                                <img class="thumbnail" src="${list[index].imageOne}">
                                <img class="thumbnail" src="${list[index].imageTwo}">
                                <img class="thumbnail" src="${list[index].imageThree}">
                                <img class="thumbnail" src="${list[index].imageFour}">


                            </div>

                            <i id="slideRight" class="fa fa-chevron-circle-right arrow" aria-hidden="true"></i>
                        </div>
                    </div>


                </div>

            </div>
            <div class="col-12 col-md-6">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="product-details product-details-1 ft-twelve">${list[index].nume}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="product-details product-details-2 ft-three">- ${list[index].categorie} -</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="product-details product-details-4 bounceIn pr-3">${list[index].pret} Lei</p>
                            <div class="stoc-wrap">
                                <button type="button" class="btn btn-success ft-three">în stoc</button>
                                <span class="stoc">- ${list[index].stoc}</span>
                            </div>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 mt-5 d-flex align-items-center">
                            <span class="product-details product-details-3 pr-2">Cantitate:</span>
                            <input class="input-cart text-center" type="number" value="1" min="1" max="999" id="cantitate">
                            <button type="button" class="px-5 btn btn-primary ft-five btn-cart ml-auto"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                Adauga în Cos</button>
                        </div>
                    </div>

                </div>
                
     
 `;
        document.querySelector("#showDetails").innerHTML = str;
        var breadcrumb = "";
    breadcrumb  += `<li class="breadcrumb-item"><a class="breadcrumb-link" href="../home/index.html">Sports Stars</a></li>
            <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">${list[index].categorie}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${list[index].nume}</li>`;
    document.querySelector("#breadcrumb-style").innerHTML = breadcrumb;

    var description = "";
    description  += `<div class="col-md-6">
                <h2 class="text-uppercase mb-5">${list[index].nume}</h2>
                <p class="lead ft-three">
                    ${list[index].descriere}
                </p>
            </div>
            <div class="col-md-6">
                <h2 class="mb-5">Specificații:</h2>
                <table class="table table-hover table-striped border-0">
                    <tbody>
                    <tr>
                        <th scope="row">Cod producător:</th>
                        <th class="border-0">${list[index].codProducator}</th>
                    </tr>
                    <tr>
                        <th scope="row">Codul furnizorului:</th>
                        <th class="border-0">${list[index].codFurnizor}</th>
                    </tr>

                    <tr>
                        <th scope="row">Material:</th>
                        <th class="border-0">${list[index].material}</th>
                    </tr>

                    <tr>
                        <th scope="row">Culoare:</th>
                        <th class="border-0">${list[index].culoare}</th>
                    </tr>

                    </tbody>
                </table>
            </div>`;
    document.querySelector(".description-row").innerHTML = description;
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




// async function addCos(event, i) {
//     document.querySelector(".backgroundLoader").classList.remove("hidden");
//
//     var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`);
//     document.querySelector(".backgroundLoader").classList.add("hidden");
//     produseCos = await response.json();
//     var found = false;
//     var val = document.querySelector("#cantitate").value;
//     if (produseCos !== null) {
//         if (confirm("Produsul a mai fost adaugat in cos. Esti sigur ca vrei sa continui?")) {
//             if (parseInt(val) + parseInt(produseCos.cantitate) <= products.stoc) {
//                 produseCos.cantitate = parseInt(produseCos.cantitate) + parseInt(document.querySelector("#cantitate").value);
//                 var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}/cantitate.json`, {
//                     method: "put",
//                     body: produseCos.cantitate
//
//
//                 });
//             } else {
//                 alert('Cantitatea selectata depaseste stocul existent!');
//             }
//
//         }
//
//
//     } else if (parseInt(val) <= products.stoc) {
//         var obj = {
//             imagine: products.imagine,
//             nume: products.nume,
//             descriere: products.descriere,
//             pret: products.pret,
//             stoc: products.stoc,
//             cantitate: document.querySelector("#cantitate").value
//
//         }
//         document.querySelector(".backgroundLoader").classList.remove("hidden");
//         var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`, {
//             method: "put",
//             body: JSON.stringify(obj)
//
//         });
//         document.querySelector(".backgroundLoader").classList.add("hidden");
//         alert("Produsul a fost adaugat in cos")
//
//     } else {
//         alert('Cantitatea selectata depaseste stocul existent!');
//     }
// }