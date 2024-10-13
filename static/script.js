// Fetch superheroes data from the API
async function fetchHeroes() {
    let url =
        "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch superheroes data:", error);
        return null
    }
}

let sortHeroes;
let sortedHeroes;

// Render the table with heroes data and display it
const renderTable = (list, value) => {
    let table = document.createElement("table");
    table.setAttribute("id", "heroesTable");
    for (let i = 0; i < value; i++) {
        let row = table.insertRow(i);
        row.insertCell(0).innerHTML = `<img src = ${list[i].images.xs} >`;
        row.insertCell(1).innerHTML = list[i].name;
        row.insertCell(2).innerHTML = list[i].biography.fullName;
        row.insertCell(3).innerHTML = list[i].powerstats.intelligence;
        row.insertCell(4).innerHTML = list[i].powerstats.strength;
        row.insertCell(5).innerHTML = list[i].powerstats.speed;
        row.insertCell(6).innerHTML = list[i].powerstats.durability;
        row.insertCell(7).innerHTML = list[i].powerstats.power;
        row.insertCell(8).innerHTML = list[i].powerstats.combat;
        row.insertCell(9).innerHTML = list[i].appearance.race;
        row.insertCell(10).innerHTML = list[i].appearance.gender;
        row.insertCell(11).innerHTML = list[i].appearance.height[1]; // cm
        row.insertCell(12).innerHTML = list[i].appearance.weight[1]; // kg || tons
        row.insertCell(13).innerHTML = list[i].biography.placeOfBirth;
        row.insertCell(14).innerHTML = list[i].biography.alignment;
    }
    document.body.append(table);
};

// Render the table with heroes data sorted by a specific column
const renderSortedTable = (list, value) => {
    let table = document.createElement("tbody");
    table.setAttribute("id", "heroesTable");
    for (let i = 0; i < value; i++) {
        let row = table.insertRow(i);
        row.insertCell(0).innerHTML = "<img src =" + list[i].images.xs + ">";
        row.insertCell(1).innerHTML = list[i].name;
        row.insertCell(2).innerHTML = list[i].biography.fullName;
        row.insertCell(3).innerHTML = list[i].powerstats.intelligence;
        row.insertCell(4).innerHTML = list[i].powerstats.strength;
        row.insertCell(5).innerHTML = list[i].powerstats.speed;
        row.insertCell(6).innerHTML = list[i].powerstats.durability;
        row.insertCell(7).innerHTML = list[i].powerstats.power;
        row.insertCell(8).innerHTML = list[i].powerstats.combat;
        row.insertCell(9).innerHTML = list[i].appearance.race;
        row.insertCell(10).innerHTML = list[i].appearance.gender;
        row.insertCell(11).innerHTML = list[i].appearance.height[1]; // cm
        row.insertCell(12).innerHTML = list[i].appearance.weight[1]; // kg || tons
        row.insertCell(13).innerHTML = list[i].biography.placeOfBirth;
        row.insertCell(14).innerHTML = list[i].biography.alignment;
    }
    document.querySelector("table").appendChild(table);
};

// Convert height from string to integer in centimeters
const formatHeight = (a) => {
    if (!a) return null; // Null or undefined input
    if (a.includes("cm")) {
        return parseInt(a);
    } else if (a.includes("meters")) {
        return parseFloat(a) * 100; // 1 m = 100 cm
    }
    return null; // Unexpected units
};

// Convert weight from string to integer in kilograms
const formatWeight = (a) => {
    if (!a) return null; // Null or undefined input
    if (a.includes("kg")) {
        return parseInt(a);
    } else if (a.includes("tons")) {
        return parseInt(a) * 1000; // 1 ton = 1000 kg
    }
    return null; // Unexpected units
};

// Check if the hero's image is valid
const validateImage = (x) => {
    return x.includes("no-portrait");
};

// Initialize and load superheroes data into the web page
async function initializeHeroes() {
    let heroes = await fetchHeroes();
    sortHeroes = heroes;

    let size = document.getElementById("size-options");
    let value = size.options[size.selectedIndex].text;
    let pageSize = value;
    let currentPage = 1;

    size.addEventListener("change", (event) => {
        value = event.target.value;
        let table = document.querySelector("tbody");

        // Avoid rendering multiple tables
        if (table !== null) table.remove();

        renderTable(heroes, value);
        pageSize = value;
        currentPage = 1;
    });

    const previousPage = () => {
        if (currentPage > 1) {
            currentPage--;

            let newArray = heroes.slice((currentPage * pageSize) - pageSize, (currentPage * pageSize));
            let table = document.querySelector("tbody");

            // Avoid rendering multiple tables
            if (table !== null) table.remove();

            value = pageSize;
            renderTable(newArray, value);
        };
    };

    const nextPage = () => {
        if (currentPage <= heroes.length / pageSize) {
            if ((currentPage * pageSize) < heroes.length) currentPage++;
            let newArray = heroes.slice((currentPage * pageSize) - pageSize, (currentPage * pageSize));
            let table = document.querySelector("tbody");

            // Avoid rendering multiple tables
            if (table !== null) table.remove();

            value = pageSize;

            // If we're on the last page, we don't render more heroes
            // As the number of heroes may be less than pageSize
            if (currentPage > heroes.length / pageSize) value = heroes.length % pageSize;
            renderTable(newArray, value);
        };
    };

    document.querySelector("#nextButton").addEventListener("click", nextPage, false);
    document.querySelector("#prevButton").addEventListener("click", previousPage, false);

    const attributes = {
        unparseable: [
            "icon",
        ],
        s1: [
            "name",
            "fullName",
        ],
        numerical: [
            "intelligence",
            "strength",
            "speed",
            "durability",
            "power",
            "combat",
        ],
        s2: [
            "race",
            "gender",
        ],
        m1: [
            "height",
            "weight",
        ],
        s3: [
            "placeOfBirth",
            "alignment",
        ]
    };

    const headers = Object.values(attributes).flat();

    const searchBox = document.getElementById("search-input");
    const controls = document.getElementById("controls")
    const select = document.getElementById("search-select");

    for (let i = 1; i < headers.length; i++) {
        const opt = headers[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    controls.appendChild(select);

    searchBox.addEventListener("keyup", (event) => {
        const characters = event.target.value.toLowerCase();
        const type = select.value;
        const filteredHeroes = heroes.filter((hero) => {
            if (attributes.numerical.includes(type)) {
                return hero.powerstats[type] == characters
            } else if (attributes.s1.includes(type) || attributes.s2.includes(type)) {
                return hero[type].toLowerCase().includes(characters)
            } else if (attributes.s3.includes(type)) {
                return hero.biography[type].toLowerCase().includes(characters)
            } else if (attributes.m1.includes(type)) {
                if (hero.appearance[type][1] !== undefined) {
                    return hero.appearance[type][1].toLowerCase().includes(characters)
                }
            }
            return false
        });
        let table = document.querySelector("tbody");

        if (table !== null) table.remove();

        value = filteredHeroes.length;

        if (characters === "") {
            currentPage = 1;
            value = 20;
            document.querySelector("#size-options").value = "20";
        }

        renderTable(filteredHeroes, value);
        sortHeroes = filteredHeroes;
        document
            .querySelectorAll("#heroesTable thead tr th")
            .forEach((e) => e.addEventListener("click", sortTable));
    });

    value = pageSize;
    renderTable(heroes, value);
    
    let tableOne = document.querySelector("table");
    let header = tableOne.createTHead();
    let headerRow = header.insertRow(0);
    
    for (let i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).outerHTML = `<th data-column="${headers[i]}" data-order="descending">${headers[i]}</th>`;
    }
    
    document.querySelectorAll("th").forEach(e => e.addEventListener("click", sortTable));
    
    function sortTable(event) {
        let column = event.target.getAttribute("data-column");
        let order = event.target.getAttribute("data-order");
    
        // Toggle the sorting order
        let newOrder = order === "descending" ? "ascending" : "descending";
        event.target.setAttribute("data-order", newOrder);
    
        // Sort the heroes based on the column and order
        sortedHeroes = heroes.sort((a, b) => {
            if (column === "icon") {
                return sortByIcon(a, b, newOrder);
            }
    
            let valA = getColumnValue(a, column);
            let valB = getColumnValue(b, column);
    
            if (valA == null || valA === "" || valA === "-") return 1;
            if (valB == null || valB === "" || valB === "-") return -1;
    
            return newOrder === "ascending" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
        });
    
        // Remove and re-render sorted table
        let tableBody = document.querySelector("tbody");
        if (tableBody) tableBody.remove();
        renderSortedTable(sortedHeroes, value);
    }
    
    // Function to handle sorting specifically for the icon column
    function sortByIcon(a, b, order) {
        const iconA = a.images.xs;
        const iconB = b.images.xs;
    
        const hasNoPortraitA = validateImage(iconA);
        const hasNoPortraitB = validateImage(iconB);
    
        if (hasNoPortraitA && !hasNoPortraitB) {
            return 1; // a should be placed after b
        } else if (!hasNoPortraitA && hasNoPortraitB) {
            return -1; // a should be placed before b
        } else {
            // Both have images or both are missing; sort by id
            return order === "ascending" ? (parseInt(a.id) > parseInt(b.id) ? 1 : -1) : (parseInt(a.id) < parseInt(b.id) ? 1 : -1);
        }
    }
    
    // Helper function to get the correct column value
    function getColumnValue(hero, column) {
        if (hero.biography && hero.biography[column]) return hero.biography[column];
        if (hero.powerstats && hero.powerstats[column]) return hero.powerstats[column];
        if (hero.appearance && hero.appearance[column]) {
            if (Array.isArray(hero.appearance[column])) {
                // Check if the column is 'height' or 'weight'
                if (column === "height") {
                    return formatHeight(hero.appearance[column][1]); // Assuming height is at index 1
                } else if (column === "weight") {
                    return formatWeight(hero.appearance[column][1]); // Assuming weight is at index 1
                }
            } else {
                return hero.appearance[column]; // Return directly if it's not an array
            }
        }
        return hero[column]; // Fallback to direct hero property
    }
}

initializeHeroes();