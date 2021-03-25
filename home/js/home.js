var list = [];
async function draw() {

    document.querySelector("#loading").classList.remove("hidden");

    var response = await fetch("https://sports-stars-9b532-default-rtdb.europe-west1.firebasedatabase.app/.json");
    window.list = await response.json();
    document.querySelector("#loading").classList.add("hidden");
    var str = "";
    for (var i in list) {
        if (list[i] === null) {
            continue;
        }
        str += `
                <div class="col-md-4 col-lg-3 col-sm-6 col-xs-12 md-mb-30 sm-mb-30 mb-5">
            <div class="card">
                <a class="card-product-link" href="../details/detalii.html?id=${i}">
                    <img src="${list[i].imagine}" class="card-img-top w-75" alt="${list[i].nume}" title="${list[i].nume}">
                </a>

                <div class="card-body pt-0">
                    <h3 class="card-title car-title-style">${list[i].brand}</h3>
                    <p class="card-text">${list[i].categorie}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h4 class="card-title info-card-title">Informație produs:</h4>
                        <p class="card-text">${list[i].nume}</p>
                    </li>

                </ul>
                <div class="card-body">
                    <span class="card-link card-price mr-6">${list[i].pret} Lei</span>
                    <a href="../details/detalii.html?id=${i}">
                      <button type="button" class="btn btn-primary ft-three btn-cart text-uppercase"><i class="fas fa-info-circle"></i>
                        Detalii</button>
                    </a>

                </div>
            </div>
        </div> 
            `;
        document.querySelector("#showProducts").innerHTML = str;
    }
}

