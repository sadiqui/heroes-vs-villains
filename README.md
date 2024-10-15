<h2 align="center">Sortable</h2>

<p align="center">
  This project offers a web page that displays key information about superheroes, using sortable table, search functionality, and pagination to sift through the data efficiently.
  <br>
  No framework is used. Everything is coded from scratch, using vanilla JavaScript and CSS.
</p>

## Features

### 1. Fetching Data
- Superheroes data is fetched from a JSON API: [Superhero API](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json).
- Once the data is fetched and parsed, it is displayed in a table.

### 2. Table Display
- Superheroes information includes:
  - Icon, Name, Full Name, Powerstats, Race, Gender, Height, Weight, Place of Birth, and Alignment.
- Data is shown in a table with pagination. You can choose page size: 10, 20, 50, 100, or all results.
- The default page size is set to 20.

### 3. Search
- Live search functionality filters superheroes by name as you type.
- No search button required — results update automatically on each keystroke.

### 4. Sortable Columns
- Each column can be sorted by clicking on the column heading.
- Toggle between ascending and descending order with multiple clicks.
- Sort by name, powerstats, race, and other fields, with special handling for numerical values (e.g., weight).
- Missing values are sorted last by default.

## License

This project is open-sourced under [the MIT License](https://opensource.org/license/mit).