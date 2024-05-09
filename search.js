const form = document.querySelector("form");
const input = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");

function callApi(url)
{
    const myPromise = new Promise( (resolve,reject) => {
        fetch(url)
        .then( res => res.json())
        .then( data => {
            resolve(data)
        })
        .catch(err => {
            reject(err)
        })
    })

    return myPromise;
   
}

function searchCrypto(e) {
    e.preventDefault();
    // console.log("Hello");
    if(input.value.length > 0) {
        callApi("https://api.coingecko.com/api/v3/search?query=" + input.value)
        .then((data) => {
            console.log(data.coins);
            showSearchResults(data.coins);
        })
    }
}

function showSearchResults(coins) {
    searchResults.innerHTML = "";
    coins.forEach((coin, index) => {
        // searchResults.innerHTML = "";

        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("left");
        // resultDiv.appendChild(leftDiv);

        const num = document.createElement("p");
        num.innerHTML = index + 1;
        leftDiv.appendChild(num);

        const resultImg = document.createElement("img");
        resultImg.src = coin.thumb;
        leftDiv.appendChild(resultImg);

        const name = document.createElement("p");
        name.innerHTML = coin.name + " " + coin.symbol;
        leftDiv.appendChild(name);

        resultDiv.appendChild(leftDiv);

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("right");
        // resultDiv.appendChild(rightDiv);

        const moreInfo = document.createElement("a");
        moreInfo.classList.add("more-info-btn");
        moreInfo.innerHTML = "More Info";
        moreInfo.href = "more-details.html?id=" + coin.id;
        rightDiv.appendChild(moreInfo);

        resultDiv.appendChild(rightDiv);

        searchResults.appendChild(resultDiv);
    })
}

form.addEventListener("submit", (e) => {
    searchCrypto(e);
});
