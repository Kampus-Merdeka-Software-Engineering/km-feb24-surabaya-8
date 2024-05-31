document.addEventListener('DOMContentLoaded', function() {
    const ctx4 = document.getElementById('myChart4').getContext('2d');
    let chart4 = null;

    fetch('BikeSales_YoY_Order_Growth.json')
        .then(response => response.json())
        .then(data => {
            createGrowthChart(data);
        })
        .catch(error => console.error('Error loading the YoY growth data:', error));

    function createGrowthChart(data) {
        let labels = data.map(item => item.Year.toString());
        let orderValues = data.map(item => item["Total Order"]);
        let percentageChanges = data.map(item => item["Percentage Change (%)"] || 0);

        if (chart4) {
            chart4.destroy();
        }

        chart4 = new Chart(ctx4, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Orders',
                    data: orderValues,
                    borderColor: '#3559e0',
                    backgroundColor: '#3559e0',
                    fill: false,
                    yAxisID: 'y-axis-orders',
                    lineTension: 0.1
                }, {
                    label: 'Percentage Change',
                    data: percentageChanges,
                    borderColor: '#b2e01e',
                    backgroundColor: '#b2e01e',
                    fill: false,
                    yAxisID: 'y-axis-percentage',
                    lineTension: 0.1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'YoY ORDER OF GROWTH'
                    }
                },
                scales: {
                    yAxes: [{
                        id: 'y-axis-orders',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        }
                    }, {
                        id: 'y-axis-percentage',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: -100,
                            suggestedMax: 100,
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }]
                }
            }
        });
    }
});
