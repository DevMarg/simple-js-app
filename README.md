# Pokedex: A Simple JavaScript Application

This is a web application that serves as a Pokedex, allowing users to explore Pokemon data fetched from an external API. It's built using HTML, CSS, and JavaScript.


## Key Features

- **Pokemon Repository:** The app maintains a local repository to store details of each Pokemon retrieved from the Pokémon API.
- **Detailed Pokemon Information:** Clicking on a Pokemon name reveals a modal containing detailed information such as its image, height and type.
- **Search Functionality:** Filter the Pokemon list by name using a search bar. 


## How to use
Open the index.html file in your web browser to access the application. You'll see a list of Pokemon. Click on a Pokemon's name to view more detailed information about it.

## Technologies and Dependencies
This project utilizes various modern web development technologies and dependencies to ensure a smooth and user-friendly experience.

### JavaScript ES6
The core functionality is written in JavaScript ES6, leveraging promises for asynchronous operations, arrow functions for cleaner syntax and modules for better code organization.

### jQuery
jQuery is used for DOM manipulation and event handling, providing an intuitive API for interacting with HTML documents.

### Bootstrap
Bootstrap is used for responsive layout design, offers pre-designed components, and enables interactive modal dialogs. It ensures a visually appealing experience across different screen sizes.

### PokeAPI
Data about Pokemon is fetched from the PokeAPI providing comprehensive information about all known Pokemon.

### Prettier and ESLint
Prettier is used to ensure consistent code formatting, while ESLint to catch potential bugs and enforces best practices, enhancing code quality and readability.

### Other Dependencies
Additional dependencies include the Fetch API for making HTTP requests and the Immediately Invoked Function Expression (IIFE) pattern for encapsulating the Pokemon repository.