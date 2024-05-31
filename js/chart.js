document.addEventListener('DOMContentLoaded', function() {
    // Menginisialisasi konteks untuk setiap chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    const ctx3 = document.getElementById('myChart3').getContext('2d');
    const ctx4 = document.getElementById('myChart4').getContext('2d');
    const ctx5 = document.getElementById('myChart5').getContext('2d'); // Konteks untuk chart kelima

    // Inisialisasi variabel untuk setiap chart
    let chart = null;
    let chart2 = null;
    let chart3 = null;
    let chart4 = null;
    let chart5 = null; // Variable untuk chart kelima

    // Variabel untuk menyimpan data yang digunakan oleh chart
    let allData = [];
    let ageData = [];
    let genderData = [];
    let growthData = [];
    let productData = []; // Data untuk chart kelima

    // Memuat data untuk chart pertama
    fetch('Bikes_Sales_Data_2011_2016.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            createChart(allData);
        })
        .catch(error => console.error('Error loading the bike sales data:', error));

    // Memuat data untuk chart kedua
    fetch('AgeGroupOrder.json')
        .then(response => response.json())
        .then(data => {
            ageData = data;
            createAgeChart(ageData);
        })
        .catch(error => console.error('Error loading the age group data:', error));

    // Memuat data untuk chart ketiga
    fetch('genderOrder.json')
        .then(response => response.json())
        .then(data => {
            genderData = data;
            createGenderChart(genderData);
        })
        .catch(error => console.error('Error loading the gender data:', error));

    // Memuat data untuk chart keempat
    fetch('BikeSales_YoY_Order_Growth.json')
        .then(response => response.json())
        .then(data => {
            growthData = data;
            createGrowthChart(growthData);
        })
        .catch(error => console.error('Error loading the YoY growth data:', error));

    // Memuat data untuk chart kelima
    fetch('BikeSales_Top_5_Product.json')
        .then(response => response.json())
        .then(data => {
            productData = data;
            createProductChart(productData);  // Membuat chart produk teratas
        })
        .catch(error => console.error('Error loading the top product data:', error));

    // Fungsi untuk membuat chart pertama
    function createChart(data) {
        let maleData = data.filter(item => item.Customer_Gender === 'M');
        let femaleData = data.filter(item => item.Customer_Gender === 'F');
        let topMaleCategory = maleData.sort((a, b) => b.Order_Quantity - a.Order_Quantity)[0];
        let topFemaleCategory = femaleData.sort((a, b) => b.Order_Quantity - a.Order_Quantity)[0];
        let labels = ['Male - ' + topMaleCategory.Sub_Category, 'Female - ' + topFemaleCategory.Sub_Category];
        let quantities = [topMaleCategory.Order_Quantity, topFemaleCategory.Order_Quantity];

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Top Sub-Category Order Quantity',
                    data: quantities,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'TOP SUB-CATEGORY ORDER QUANTITY'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Fungsi untuk membuat chart kedua
    function createAgeChart(data) {
        let labels = data.map(d => d.Age_Group);
        let quantities = data.map(d => d.Order_Quantity);

        if (chart2) {
            chart2.destroy();
        }

        chart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: Array.from(new Set(labels)),
                datasets: [{
                    label: 'Order Quantity by Age Group',
                    data: quantities,
                    backgroundColor: '#b2e01e',
                    borderColor: '#b2e01e',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'ORDER QUANTITY BY AGE GROUP'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Fungsi untuk membuat chart ketiga
    function createGenderChart(data) {
        let maleQuantity = data.filter(item => item.Customer_Gender === 'M').reduce((sum, item) => sum + item.Order_Quantity, 0);
        let femaleQuantity = data.filter(item => item.Customer_Gender === 'F').reduce((sum, item) => sum + item.Order_Quantity, 0);

        if (chart3) {
            chart3.destroy();
        }

        chart3 = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Gender Distribution',
                    data: [maleQuantity, femaleQuantity],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'GENDER ORDER'
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Fungsi untuk membuat chart keempat
    function createGrowthChart(data, endYear = null) {
        let filteredData = endYear ? data.filter(item => item.Year <= endYear) : data;
        let labels = filteredData.map(item => item.Year.toString());
        let orderValues = filteredData.map(item => item["Total Order"]);
        let percentageChanges = filteredData.map(item => item["Percentage Change (%)"] || 0);
    
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
                            suggestedMin: -100, // Nilai minimum yang disarankan untuk sumbu persentase
                            suggestedMax: 100, // Nilai maksimum yang disarankan untuk sumbu persentase
                            callback: function(value) {
                                return value + '%'; // Menambahkan tanda persentase
                            }
                        }
                    }]
                }
            }
        });
    }
    
    // Fungsi baru untuk membuat chart kelima
    function createProductChart(data) {
        let labels = data.map(item => item.Product);
        let quantities = data.map(item => item.Order_Quantity);

        if (chart5) {
            chart5.destroy();
        }

        chart5 = new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Top Product Sales',
                    data: quantities,
                    backgroundColor: '#3559e0',
                    borderColor: '#3559e0',
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'TOP 5 PRODUCT'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Fungsi untuk menyaring data berdasarkan tahun yang dipilih
    window.filterChart = function(selectedYear) {
        if (!selectedYear || selectedYear === "") {
            createChart(allData);
            createAgeChart(ageData);
            createGenderChart(genderData);
            createGrowthChart(growthData);
            createProductChart(productData); // Reset ke data awal jika "Select Year" dipilih
            return;
        }

        if (parseInt(selectedYear) < 2011 || parseInt(selectedYear) > 2016) {
            alert("Tahun yang dipilih tidak valid. Silakan pilih tahun antara 2011 dan 2016.");
            return;
        }

        const yearFilteredData = allData.filter(item => item.Year.toString() === selectedYear);
        const yearFilteredAgeData = ageData.filter(item => item.Year.toString() === selectedYear);
        const yearFilteredGenderData = genderData.filter(item => item.Year.toString() === selectedYear);
        const yearFilteredProductData = productData.filter(item => item.Year.toString() === selectedYear);

        createChart(yearFilteredData);
        createAgeChart(yearFilteredAgeData);
        createGenderChart(yearFilteredGenderData);
        createGrowthChart(growthData, selectedYear); // Memperbarui chart keempat tanpa mengubah logika
        createProductChart(yearFilteredProductData); // Memperbarui chart kelima berdasarkan tahun yang dipilih
    }

    // Fungsi untuk menyaring data berdasarkan negara yang dipilih
    window.filterChartByCountry = function(selectedCountry) {
        if (!selectedCountry || selectedCountry === "") {
            createChart(allData);
            createAgeChart(ageData);
            createGenderChart(genderData);
            createGrowthChart(growthData);
            createProductChart(productData); // Reset ke data awal jika "Select Country" dipilih
            return;
        }

        const countryFilteredData = allData.filter(item => item.Country === selectedCountry);
        const countryFilteredAgeData = ageData.filter(item => item.Country === selectedCountry);
        const countryFilteredGenderData = genderData.filter(item => item.Country === selectedCountry);
        const countryFilteredGrowthData = growthData.filter(item => item.Country === selectedCountry);
        const countryFilteredProductData = productData.filter(item => item.Country === selectedCountry);

        createChart(countryFilteredData);
        createAgeChart(countryFilteredAgeData);
        createGenderChart(countryFilteredGenderData);
        createGrowthChart(countryFilteredGrowthData);
        createProductChart(countryFilteredProductData); // Memperbarui chart kelima berdasarkan negara yang dipilih
    }
});

