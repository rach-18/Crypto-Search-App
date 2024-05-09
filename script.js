// https://api.coingecko.com/api/v3/search?query=" + searchParams.get("query") yeah search wali h isme input aayega
// `https://api.coingecko.com/api/v3/coins/${params.get(
//       "id"
//     )}/market_chart?vs_currency=inr&days=10` yeah details wali h

const coinsDiv = document.querySelector(".coins");

const mainUrl = "https://api.coingecko.com/api/v3/search/trending";

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

function createCoinDiv(data) {
    const coinDiv = document.createElement("div");
    coinDiv.classList.add("coin");

    const coinImg = document.createElement("img");
    coinImg.src = data.thumb;
    coinDiv.appendChild(coinImg);

    const coinInfoDiv = document.createElement("div");
    coinInfoDiv.classList.add("coin-info");

    const coinName = document.createElement("p");
    coinName.classList.add("coin-name");
    coinName.innerHTML = data.name;
    coinInfoDiv.appendChild(coinName);

    const coinPrice = document.createElement("p");
    coinPrice.classList.add("coin-price");
    coinPrice.innerHTML = data.data.market_cap;
    coinInfoDiv.appendChild(coinPrice);

    coinDiv.appendChild(coinInfoDiv);
    coinsDiv.appendChild(coinDiv);
}

callApi(mainUrl)
.then((data) => {
    // console.log(data.coins);
    data.coins.forEach((coin) => {
        // console.log(coin);
        // console.log(coin.item.data.market_cap);
        createCoinDiv(coin.item);
    })
})

// const response = callApi(url);

// // console.log(response)

// response.then((data) => {
//     console.log(data);
// })
