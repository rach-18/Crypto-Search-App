// https://api.coingecko.com/api/v3/search?query=" + searchParams.get("query") yeah search wali h isme input aayega
// `https://api.coingecko.com/api/v3/coins/${params.get(
//       "id"
//     )}/market_chart?vs_currency=inr&days=10` yeah details wali h

const coinsDiv = document.querySelector(".coins");
let excahngeRate;

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

function createCoinDiv(data, exchange) {
    const coinDiv = document.createElement("div");
    // coinDiv.setAttribute("data-aos", "zoom-out");
    // coinDiv.setAttribute("data-aos-duration", "2000");
    coinDiv.classList.add("coin");

    const coinImg = document.createElement("img");
    coinImg.src = data.thumb;
    coinDiv.appendChild(coinImg);

    const coinInfoDiv = document.createElement("div");
    coinInfoDiv.classList.add("coin-info");

    const coinName = document.createElement("p");
    coinName.classList.add("coin-name");
    coinName.innerHTML = `${data.name} (${data.symbol})`;
    coinInfoDiv.appendChild(coinName);

    const coinPrice = document.createElement("p");
    coinPrice.classList.add("coin-price");
    // coinPrice.innerHTML = data.data.market_cap;
    coinPrice.innerHTML = `₹ ${convertToInr(data.price_btc, exchange)}`;
    coinInfoDiv.appendChild(coinPrice);

    coinDiv.appendChild(coinInfoDiv);
    coinsDiv.appendChild(coinDiv);
}

function convertToInr(convertVal, price) {
    return Math.round(price * convertVal * 10000) / 10000;
}

callApi("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr")
.then((data) => {
    // console.log(data.bitcoin.inr);
    excahngeRate = data.bitcoin.inr;
})

callApi(mainUrl)
.then((data) => {
    console.log(data);
    data.coins.forEach((coin) => {
        createCoinDiv(coin.item, excahngeRate);
    })
})

// const response = callApi(mainUrl);

// // console.log(response)

// response.then((data) => {
//     console.log(data);
// })
