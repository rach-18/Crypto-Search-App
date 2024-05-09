const contentImg = document.querySelector(".content-img");
const contentName = document.querySelector(".content-name");
const price1 = document.querySelector(".price-1");
const price2 = document.querySelector(".price-2");
const price3 = document.querySelector(".price-3");
const price4 = document.querySelector(".price-4");
const descriptionPara = document.querySelector(".description-para");

const currentUrl = new URL(window.location.href);

// console.log(currentUrl);

const params = new URLSearchParams(currentUrl.search);

// console.log(params);

if(!params.has("id")) {
    window.location.href = "search.html";
}
else {
    callApi(`https://api.coingecko.com/api/v3/coins/${params.get("id")}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`)
    .then((data) => {
        console.log(data);
        showDetails(data);
    })
}

callApi(`https://api.coingecko.com/api/v3/coins/${params.get("id")}/market_chart?vs_currency=inr&days=2`)
.then((data) => {
    console.log(data);
    showChart(data.prices);
})

function showChart(data) {
    const timestamps = [];
    const priceInInr = [];
    data.forEach((dt) => {
        const date_obj = new Date(dt[0]);
        let hours = date_obj.getHours();
        if(hours < 10) {
            hours = "0" + hours;
        }

        let minutes = date_obj.getMinutes();
        if(minutes < 10) {
            minutes = "0" + minutes;
        }

        timestamps.push(`${hours} : ${minutes}`);
        priceInInr.push(dt[1]);
    });

    new Chart("cryptoChart", {
        type: "line",
        data: {
            labels: timestamps,
            datasets: [{
                label : "Price (in INR)",
                data : priceInInr,
                backgroundColor : "rgba(75, 192, 192, 0.2)",
                borderColor : "rgb(75, 192, 192)",
                borderWidth : 1,
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Price History"
                }
            },
            scales : {
                y : {
                    beginAtZero : false
                }
            }
        }
    });
}

function showDetails(obj) {
    contentImg.src= obj.image.large;
    contentName.innerHTML = `${obj.name} (${obj.symbol})`;
    descriptionPara.innerHTML = obj.description.en;
}

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