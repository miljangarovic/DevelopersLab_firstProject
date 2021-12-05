// https://api.thedogapi.com/v1/breeds

var num = 0;
var arr = [];

function fetchA() {
    url = "https://api.thedogapi.com/v1/breeds";
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            for (i = 0; i < res.length; i++) {
            }
            return res;
        })
        .then(function(res) {
            loadAll(res);
        }).then(slider).then(addTopRated).then(showBest);
    }

    fetchA();

    function loadAll(data) {
        for (e of data) {
            arr.push(e);
        }
    }
    document.addEventListener("load", slider);

function slider() {
    var animalsParent = document.getElementsByClassName("animals")[0];
    for (e of arr) {
        if(arr.indexOf(e) === 14) {
            break;
        }
        let animal = document.createElement("div");
        animal.classList.add("slider");
        animal.innerHTML += "<p>Bred for <span class=\"dog\"><i>" + e.bred_for + "</i></span></p>"; console.log(e.bred_for)
        animal.innerHTML += "<div class=\"image\">" + "<h2>" + e.name + "</h2></div>";
        animal.childNodes[1].style.backgroundImage = "url(" + e.image.url + ")"; console.log(e.image.url)
        
        animal.innerHTML += "<a class=\"readMore\" href=\"#\">read more</a>";
        animalsParent.appendChild(animal);
        animal.style.display = "none";
    }
    var readMore = document.getElementsByClassName("readMore");
         for (var y = 0; y < readMore.length; y++) {
        readMore[y].addEventListener("click", showModalWindow);
         }
    showSlides(0);
}

function w() {
    if (window.innerWidth < 550) {
        return 1;
    } else if (window.innerWidth > 550 && window.innerWidth < 960) {
        return 2;
    } else if (window.innerWidth > 960) {
        return 3;
    }
}

var windowVariable = w();
window.onresize = function() {
     windowVariable = w(); 
    }


function showSlides(num) {
    for (k = 0; k < dogs.length; k++) {
        dogs[k].style.display = "none";
    }
    for (i = 0; i < windowVariable; i++) {
        dogs[i + num].style.display = "grid";
    }
}

dogs = document.getElementsByClassName("slider");
document.getElementById("left").addEventListener("click", slideBack);
document.getElementById("right").addEventListener("click", slideForward);


function slideForward() {
num = num + windowVariable;
if (num >= dogs.length - windowVariable) {
    num = 0;
}
showSlides(num);
}

function slideBack() {
num = num - windowVariable;
if (num < 0) { num = dogs.length - windowVariable - 1; }
showSlides(num);
}

var row = document.getElementsByClassName("row")[0];
var j;

function addTopRated() {
    for (j = 0; j < 6; j++) {
        const article = document.createElement("article");
        article.innerHTML += "<div class=\"img\">" +
            "<span>" +"  " + "</span><h5>" + arr[j].name + "</h5></div>";
            article.childNodes[0].style.backgroundImage = "url(" + arr[j].image.url + ")";
            article.innerHTML += "<div class=\"lower\">" +
        "<span class=\"description\">" + arr[j].bred_for  + "</span>" +
        "</div>";
        
        row.appendChild(article);
    }
}
    const featured = document.getElementsByClassName("featured")[0];

function showBest() {
    for (var i = 0; i < 3; i++) {
        var n = i + 1;
        const article = document.createElement("article");
        article.innerHTML += "<div class=\"image\">" +
            "<div class=\"numbering\">" + String(n) + "</div></div>";
            article.childNodes[0].style.backgroundImage = "url(" + arr[i].image.url + ")";
            article.innerHTML += "<a>" + arr[i].name + "</a>";
        featured.appendChild(article);
    }
    
}

featured.addEventListener("click", showModalWindow);

row.addEventListener("click", showModalWindow);

function showModalWindow(e) {
    modalm = document.getElementsByClassName("bestm")[0];
    if (event.target.parentNode.tagName == "ARTICLE" && event.target.classList.contains("image")) {
        current = e.target;
        currentName = e.target.parentNode.children[1].innerText;
        modalm.style.display = "grid";
    } else if (event.target.classList.contains("readMore")) {
        currentName = e.target.parentNode.children[1].childNodes[0].innerText;
        modalm.style.display = "none";
    } else if (event.target.parentNode.tagName == "ARTICLE" && event.target.classList.contains("img")) {
        currentName = e.target.children[1].innerText;
        modalm.style.display = "none";
    }
    for (el of arr) {
        if (el.name === currentName) {
            var myel = el;
        }
    }
    modalWindowWrapper = document.getElementsByClassName("modal")[0];
    modalWindow = document.getElementsByClassName("modalWindow")[0];
    
    modalWindow.children[1].style.backgroundImage = "url(" + myel.image.url + ")";
    holder = document.getElementsByClassName("holder")[0];
  
    holder.children["bread"].innerText = "Bread for: " + myel.bred_for;
    holder.children["name"].innerText = "Name: " + myel.name;
    holder.children["temp"].innerText = "Temperament: " + myel.temperament;
    holder.children["origin"].innerText = "Origin: " + myel.origin;
    holder.children["weight"].innerText = "Weight: " + myel.weight.metric + " kg";
    holder.children["height"].innerText = "Height: " + myel.height.metric + " cm";
    holder.children["group"].innerText = "Breed group: " + myel.breed_group;
    holder.children["life"].innerText = "Life span: " + myel.life_span;
    
    modalWindowWrapper.style.display = "flex";
    document.body.style.height = "100vh";
    document.body.style.position = "fixed";

    var exit = document.getElementsByClassName("exit")[0];
    exit.addEventListener("click", hideModalWindow);
}

function hideModalWindow(e) {
    modalWindowWrapper = e.target.parentNode.parentNode;
    modalWindowWrapper.style.display = "none";
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
    document.body.style.position = "relative";
    window.scrollTo({
        top: currentposition - 300,
        behavoir: "smooth"
    });
}


var loadMoreButton = document.getElementsByClassName("loadMore")[0];
loadMoreButton.addEventListener("click", loadMore);

function loadMore(e) {
    for (k = j; k < j + 3; k++) {
        const article = document.createElement("article");
        article.innerHTML += "<div class=\"img\">" +
            "<span>" + " " + "</span><h5>" +arr[k].name + "</h5></div>";
            article.childNodes[0].style.backgroundImage = "url(" + arr[k].image.url + ")";
            article.innerHTML += "<div class=\"lower\">" +
            "<span class=\"description\">" + arr[k].bred_for + "</span>" +
            "</div>";
        row.appendChild(article);
        if (k == arr.length - 1) {
            j = 0;
            loadMoreButton.removeEventListener("click", loadMore);
            loadMoreButton.style.display = "none";
            break;
        }
    }
    j = j + 3;
    var loadPosition = e.pageY
    window.scrollTo({
        top: loadPosition - 120,
        behavoir: "smooth"
    });
}




