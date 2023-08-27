"use strict";

// global variables
let currentImageIndex = 0;
let interval;
let data;

// using fetch API to load imagelist
function loadImages() {
    fetch("https://comp125-a4-api.onrender.com/imagelist")
        .then(response => response.json())
        .then(json => showImages(json))
        .catch(error => console.log(error))
}

// Add images in the gallery div
function showImages(json) {
    data = json;
    let gallery = document.getElementById("natureGallery");
    gallery.innerHTML = '';
    let img = document.createElement('img');
    img.src = data.ImageList[currentImageIndex].name;
    img.className = "myGallery";
    gallery.appendChild(img);

    // Interval is set using the time value of each imagelist
    function setTimer() {
        clearInterval(interval);
        interval = setInterval(() => {
            currentImageIndex++;
            if (currentImageIndex >= data.ImageList.length) {
                currentImageIndex = 0;
            }
            img.src = data.ImageList[currentImageIndex].name;
        }, data.ImageList[currentImageIndex].time);
    }

    setTimer();
}

loadImages();

function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= data.ImageList.length) {
        currentImageIndex = 0;
    }
    let gallery = document.getElementById("natureGallery");
    let img = gallery.getElementsByClassName("myGallery")[0];
    img.src = data.ImageList[currentImageIndex].name;
}

let btnNext = document.getElementById("btnNext");
btnNext.onclick = nextImage;

function previousImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = data.ImageList.length - 1;
    }
    let gallery = document.getElementById("natureGallery");
    let img = gallery.getElementsByClassName("myGallery")[0];
    img.src = data.ImageList[currentImageIndex].name;
}

let btnPrevious = document.getElementById("btnPrevious");
btnPrevious.onclick = previousImage;

function resetImage() {
    currentImageIndex = 0;
    loadImages();
}

let btnReset = document.getElementById("btnReset");
btnReset.onclick = resetImage;
