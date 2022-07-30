import React, {useState, useEffect} from 'react';
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js'; //helps create the new ber chart by bringing in the bar element
import { Doughnut } from 'react-chartjs-2';

Chartjs.register( //Register the elements below or we will run into some errors
    Tooltip,
    Legend,
    ArcElement
)

const DoughnutChart = () => {
    const [chart, setChart] = useState([]);

    let baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10'; //limit our fetch to 10 coins for clear view on the screen
    let apiKey = 'coinranking80fe8a00335ebf59204bc5905aa158c63527dde99dac4962';
    //Prevent Access blocking by CORS
    //Visit npm cors-anywhere and install or take the link below and add to your site
    //If still not allowed to access and receiving (403 Forbidden) in the console, click the link in the console to gain temporary access
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    useEffect(()=> {
        const fetchCoins = async () => {
            await fetch(`${proxyUrl}${baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin': '*' //ALLOWED FROM EVERYWHERE
                }
            }).then((response) => {
                response.json().then((json) => {
                    console.log(json.data)
                    setChart(json.data)
                })
            }).catch(error => {
                console.log(error)
            });
        }
        fetchCoins()
    }, [baseUrl, apiKey, proxyUrl])

    console.log(chart)

    var data = {
        //labels: chart?.coins?.map(coinName => coinName.name) // Sometimes you may add ? to labels and datasets to avoid errors
        labels: chart.coins.map(coinName => coinName.name),//Map over coins and return coinName.name on the -x axis
        datasets: [{
            label: '# of Votes',
            data: chart.coins.map(coinName => coinName.price),//Map over coins and return coinName.price on the -y axis
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    var options= {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }


  return (
    <div>
        <Doughnut
            height={400}
            data={data}
            options={options}
        />
    </div>
  )
}

export default DoughnutChart;