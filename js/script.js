document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and parse a JSON file
    async function fetchJson(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`Error fetching ${file}: ${error.message}`);
        }
    }

    // List of JSON files to fetch
    const jsonFiles = [
        'json/barchart.json', 
        'json/top5product.json', 
        'json/topproductbyyear.json', 
        'json/totalunitsold.json', 
        'json/yoyordergrowth.json'
    ];

    // Fetch and parse all JSON files
    Promise.all(jsonFiles.map(file => fetchJson(file)))
        .then(data => {
            // Log the parsed JSON data to the console
            data.forEach((jsonData, index) => {
                console.log(`Data from file ${index + 1}:`, jsonData);
            });
        })
        .catch(error => {
            // Log errors to the console
            console.error('Error fetching JSON files:', error);
        });
});



