console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

fetch(imgUrl)
.then(resp => resp.json())
.then((data) => renderImages(data))
    // message.forEach(createImage)

// const getDogImages = () => {
//     fetch(imgUrl)
//     .then(resp => resp.json())
//     .then((data) => {
//         data.message.forEach(createImage)
//     })
// }

function renderImages(data) {
    const dogImgContainer = document.getElementById("dog-image-container");
    data.message.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        dogImgContainer.appendChild(imgElement);
    })
}

const breedUrl = "https://dog.ceo/api/breeds/list/all"

fetch(breedUrl)
.then(resp => resp.json())
.then(breed => {
    renderBreeds(breed);
})

function renderBreeds(breed) {

    // filterBreeds(filteredLetter, breed);
    const breedObj = breed.message;
    const breedList = document.getElementById("dog-breeds");
    loadAllBreeds(breedObj, breedList);

    // create dropdown
    const dropMenu = document.getElementById("breed-dropdown");
    dropMenu.addEventListener("change", (event) => {
        if (dropMenu.value === "none") {
            removeBreeds();
            loadAllBreeds(breedObj, breedList)
        } else {
            filteredLetter = dropMenu.value;
            removeBreeds();
            filterBreeds(filteredLetter, breedObj);
        }
    })
}

function filterBreeds(letter, breedObj) {
    const breedList = document.getElementById("dog-breeds");
    for (const element in breedObj) {
        if (element.startsWith(letter)) {
            createBreedElement(element, breedList)
        }
    }
}

function loadAllBreeds(breedObj, breedList) {
    for (const element in breedObj) {
        createBreedElement(element, breedList)
    }
}

function createBreedElement(breedItem, list) {
    const breedElement = document.createElement("li");
    breedElement.textContent = breedItem;
    list.appendChild(breedElement);
    breedElement.addEventListener("click", (event) => {
        breedElement.style.color = "blue";
    })
}

function removeBreeds() {
    const breedListRemove = document.querySelectorAll("#dog-breeds li")
    // console.log("To remove")
    // console.log(breedListRemove)
    breedListRemove.forEach(element => element.remove())
}