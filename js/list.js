var api_key = "0e27c403-e7f1-465a-a165-f48d0d66337c";

// https://api.thedogapi.com/v1/breeds
// https://api.thedogapi.com/v1/images/search
// https://api.thecatapi.com/v1/breeds/search?q=air



document.getElementById("searchBtn").addEventListener("click",searchBtnSubmitHandler)

let limit = 5;

let page = parseInt(document.querySelectorAll(".active")[1]?.textContent) || 1;
let search = "";
let minLiving = 1

showDogs(search)

// for (let i = 1; i < 4; i++) {
//     createDogCard(i)
// }

function showDogs(search = "",page= 1, minLivingYears=1){
    let breeds = fetch("https://api.thedogapi.com/v1/breeds"+ (search !== "" ? "/search?q="+search : ""))
    .then(res => res.json()).then(data => {
        data = data.filter(el => Number(el['life_span'].split(" ")[0]) >= minLivingYears)
        if(data.length>0)
        {
            paginationCreate(data)
            for (let i = 3*(page-1); i < 3*page; i++)
            {
                if(data[i] != null)
                {
                    createDogCard(data[i].id, data[i]);
                }
            }
        }
        else
            printNotFound()
    })

}

function paginationCreate(data){
    let n = data.length / 3;
    let paginationParent = document.getElementsByClassName("pagination")[0];
    paginationParent.innerHTML = "";

    if(page > 1)
    {
        /// left arrow
        let la = document.createElement("a")
        la.innerHTML = "&laquo;";
        la.href = `#prev`;
        la.addEventListener("click",pageClickHandler)
        paginationParent.appendChild(la);
    }

    let pag = document.createElement("a")
    pag.innerHTML += `${page}`;
    pag.className='active'
    paginationParent.appendChild(pag);

    if(page < n)
    {
        /// right arrow
        let ra = document.createElement("a")
        ra.innerHTML = "&raquo;";
        ra.href = `#next`;
        ra.addEventListener("click",pageClickHandler)
        paginationParent.appendChild(ra);
    }
}

function createDogCard(id, parentData) {
    let cardsParent = document.getElementsByClassName("grid_three")[0];
    cardsParent.innerHTML = "";
    fetch("https://api.thedogapi.com/v1/images/search?" +"&breed_id=" + id)
        .then(res => res.json())
        .then(data => {

            for (let i = 0; i < 5; i++) {
                if (data[i] != null && data[i].url !== "") {
                    let card = document.createElement("div");
                    card.classList.add("card_dog");
                    card.innerHTML += `<img src="${data[i].url}" alt="error">`;
                    card.innerHTML += `<h1>${parentData.name}</h1>`;
                    card.innerHTML += `<p>Life span: ${parentData.life_span}</p>`;
                    card.innerHTML += `<p>Origin: ${parentData.origin}</p>`;
                    card.innerHTML += `<p>Temperament: ${parentData.temperament}</p>`;
                    card.innerHTML += `<p>Bred for: ${parentData.bred_for}</p>`;
                    cardsParent.appendChild(card);
                    break;
                } else {
                    let cardDefault = document.createElement("div");
                    cardDefault.classList.add("card_dog");
                    cardDefault.innerHTML += `<img src="../images/notfound.jpg" alt="error">`;
                    cardDefault.innerHTML += `<h1>${parentData.name}</h1>`;
                    cardDefault.innerHTML += `<p>Life span: ${parentData.life_span}</p>`;
                    cardDefault.innerHTML += `<p>Origin: ${parentData.origin}</p>`;
                    cardDefault.innerHTML += `<p>Temperament: ${parentData.temperament}</p>`;
                    cardDefault.innerHTML += `<p>Bred for: ${parentData.bred_for}</p>`;
                    cardsParent.appendChild(cardDefault);
                    break;
                }

            }

        })
}

function printNotFound(){
    let paginationParent = document.getElementsByClassName("pagination")[0];
    paginationParent.innerHTML = "";
    let main = document.getElementsByClassName("grid_three")[0];
    main.innerHTML = "";
    let hText = document.createElement('h1')
    hText.innerHTML = "Podaci nisu pronadjeni!";
    main.appendChild(hText)
}

function searchBtnSubmitHandler(e){
    e.preventDefault();
    page = 1
    search = document.getElementById("formInput#search").value;
    showDogs(search,page,minLiving)
}

function pageClickHandler(e){
    e.preventDefault();

    if(e.target.innerHTML === "»")
        page++
    else if(e.target.innerHTML === "«")
        page--
    showDogs(search,page,minLiving)
}

function rangeSlide(value) {
    document.getElementById('rangeValue').innerHTML = value;
    minLiving = value
    page = 1
    showDogs(search,page,minLiving)
}
// breeds.then(rase=>{
//     for (let i = limit*(page-1); i <limit*page ; i++) {
//         fetch("https://api.thedogapi.com/v1/images/search"+"?limit="+limit+"&page="+page)
//         .then(res => res.json())
//         .then(data =>{
//             console.log(data);
//         })
//     })

