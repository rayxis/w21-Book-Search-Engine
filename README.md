# Book Search Engine

## Description

This book search engine is a responsibel and user-friendly application designed for book-lovers. It's powered 
through the Google Books API, and provides users with the functionality of searching, saving and managing favorite 
books.

Users are able to use this application to search for new books and be presented with a detailed list of books 
depending on the se/arch criterion. For each book, the user will be provided with an image of the cover along with the 
title, the author, description, and a link to the book on Google Books.

Users are able to log in to personalize their experience by saving their books and create saved lists.

This application is built using the MERN stack, which utilizes MongoDB, Express.js, React.js, and Node.js. It has 
been adapted from a RESTful API implementation to utilizing GraohQL for more efficiency and a better user experience.

## Installation

To install, make sure that you have all of the necessary frameworks installed, like Node and the MongoDB 
server.

Extract your files into the directory of your choice, and execute the `npm install` command.

## Usage

To use the application, execute `npm run`, and visit the specified location in your web browser.

A live demonstration can be viewed here: https://w21-book-search-engine.onrender.com/

## User Story
```text
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Acceptance Criteria

```text
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
```
