let product = {};
var index = window.location.search.substring(4);
async function details() {
    document.querySelector(".spinner-box").classList.remove("hidden");
    var url= "https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/produse/";
    const response = await fetch(url+index+".json");
    product = await response.json();
    document.querySelector(".spinner-box").classList.add("hidden");
    var str = "";

        str += `
    <div class="col-12 col-md-6">
                <div id="content-wrapper">
                    <div class="column">
                        <img class="mainPicture bounceIn" id="mainImage" src="${product.imagine}">

                        <div id="slide-wrapper">
                            <i id="slideLeft" class="fa fa-chevron-circle-left arrow" aria-hidden="true"></i>

                            <div id="slider">
                                <img class="thumbnail active" src="${product.imagine}">

                                <img class="thumbnail" src="${product.imageOne}">
                                <img class="thumbnail" src="${product.imageTwo}">
                                <img class="thumbnail" src="${product.imageThree}">
                                <img class="thumbnail" src="${product.imageFour}">


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
                            <h1 class="product-details product-details-1 ft-twelve">${product.nume}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <p class="product-details product-details-2 ft-three">- ${product.categorie} -</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex flex-row flex-lg-column product-details-5">
                            <p class="product-details product-details-4 bounceIn pr-3">${product.pret} Lei</p>
                            <div class="stoc-wrap">
                                <button type="button" class="btn btn-success in-stoc">în stoc</button>
                                <span class="stoc">- ${product.stoc}</span>
                            </div>

                        </div>
                        
                    </div>

                    <div class="row">
                        <div class="col-12 mt-5 d-flex align-items-center product-details-6">
                            <span class="product-details product-details-3 pr-2">Cantitate:</span>
                            <input class="input-cart text-center" type="number" value="1" min="1" max="${product.stoc}" id="cantitate">
                            <button onclick="addCart(event,'${i}');" type="button" class="px-lg-5 px-0 btn btn-primary ft-five btn-cart ml-auto  d-none d-lg-block"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                Adauga în Cos</button>
                        </div>
                        <div class="col-12 mt-5 d-flex align-items-center d-block d-lg-none product-details-7">
                           
                            <button onclick="addCart(event,'${i}');" type="button" class="px-lg-5 px-md-0 btn btn-primary ft-five btn-cart ml-md-0 d-lg-inline d-inline-block"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                Adauga în Cos</button>
                        </div>
                    </div>

                </div>
                
     
 `;

        document.querySelector("#showDetails").innerHTML = str;
        var breadcrumb = "";
    breadcrumb  += `<li class="breadcrumb-item"><a class="breadcrumb-link" href="../home/index.html">Sports Stars</a></li>
            <li class="breadcrumb-item"><a class="breadcrumb-link" href="#">${product.categorie}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${product.nume}</li>`;
    document.querySelector("#breadcrumb-style").innerHTML = breadcrumb;

    var description = "";
    description  += `<div class="col-md-6">
                <h2 class="text-uppercase mb-5">${product.nume}</h2>
                <p class="lead ft-three">
                    ${product.descriere}
                </p>
            </div>
            <div class="col-md-6">
                <h2 class="mb-5">Specificații:</h2>
                <table class="table table-hover table-striped border-0">
                    <tbody>
                    <tr>
                        <th scope="row">Cod producător:</th>
                        <th class="border-0">${product.codProducator}</th>
                    </tr>
                    <tr>
                        <th scope="row">Codul furnizorului:</th>
                        <th class="border-0">${product.codFurnizor}</th>
                    </tr>

                    <tr>
                        <th scope="row">Material:</th>
                        <th class="border-0">${product.material}</th>
                    </tr>

                    <tr>
                        <th scope="row">Culoare:</th>
                        <th class="border-0">${product.culoare}</th>
                    </tr>

                    </tbody>
                </table>
            </div>`;
    document.querySelector(".description-row").innerHTML = description;
    }



async function addCart(event, i) {
    document.querySelector(".spinner-box").classList.remove("hidden");
    var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`);
    document.querySelector(".spinner-box").classList.add("hidden");
    productsCart = await response.json();
    var found = false;
    var val = document.querySelector("#cantitate").value;
    if (productsCart !== null) {
        if (confirm("Produsul a mai fost adăugat în coș. Ești sigur că vrei să continui?")) {
            if (parseInt(val) + parseInt(productsCart.cantitate) <= product.stoc) {
                productsCart.cantitate = parseInt(productsCart.cantitate) + parseInt(document.querySelector("#cantitate").value);
                var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`, {
                    method: "put",
                    body: productsCart.cantitate


                });
            } else {
                alert('Cantitatea selectată depășește stocul existent!');
            }

        }


    } else if (parseInt(val) <= product.stoc) {
        var obj = {
            nume: product.nume,
            firma: product.firma,
            categorie: product.categorie,
            pret: product.pret,
            imagine: product.imagine,
            imageOne: product.imageOne,
            imageTwo: product.imageTwo,
            imageThree: product.imageThree,
            imageFour: product.imageFour,
            imageFive: product.imageFive,
            stoc: product.stoc,
            descriere: product.descriere,
            codProducator: product.codProducator,
            codFurnizor: product.codFurnizor,
            material: product.material,
            culoare: product.culoare,
            cantitate: document.querySelector("#cantitate").value

        }
        document.querySelector(".spinner-box").classList.remove("hidden");
        var response = await fetch(`https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/cos/${i}.json`, {
            method: "put",
            body: JSON.stringify(obj)

        });
        document.querySelector(".spinner-box").classList.add("hidden");
        alert("Produsul a fost adăugat în coș")

    } else {
        alert('Cantitatea selectată depășește stocul existent!');
    }
}