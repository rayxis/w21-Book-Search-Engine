import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
	Container,
	Col,
	Form,
	Button,
	Card,
	Row
} from 'react-bootstrap';

// utils
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

// GraphQL
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
	// state for returned Google API data
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [searchInput, setSearchInput]     = useState('');
	const [savedBookIds, setSavedBookIds]   = useState(getSavedBookIds());

	// This saves a book to the database.
	const [saveBook, { error }] = useMutation(SAVE_BOOK);

	// Handles saving `savedBookIds` list to localStorage on component unmount
	useEffect(() => {
		return () => saveBookIds(savedBookIds);
	});

	// Handles form submission
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Early exit if search input is not provided
		if (!searchInput) {
			return false;
		}

		try {
			// Search for books via Google API
			const response = await searchGoogleBooks(searchInput);

			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			// Destructure and format response data
			const { items } = await response.json();

			// Format book data
			const bookData = items.map((book) => ({
				bookId:      book.id,
				authors:     book.volumeInfo.authors || ['No author to display'],
				title:       book.volumeInfo.title,
				description: book.volumeInfo.description,
				image:       book.volumeInfo.imageLinks?.thumbnail || ''
			}));

			// Add formatted book data to state
			setSearchedBooks(bookData);
			// Clear search input
			setSearchInput('');
		} catch (err) {
			console.error(err);
		}
	};

	// Function for saving a book to the database
	const handleSaveBook = async (bookId) => {
		// Find the book in `searchedBooks` state by the id
		const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

		// Get logged-in user's token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		// Early exit if user is not logged in
		if (!token) {
			return false;
		}

		try {
			// Perform the saveBook mutation and get the returned data
			const { data } = await saveBook({
				                                variables: {
					                                book: bookToSave
				                                }
			                                });

			if (!data.ok) {
				throw new Error('something went wrong!');
			}

			// If book saved successfully, save its bookId to state
			setSavedBookIds([...savedBookIds, bookToSave.bookId]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="text-light bg-dark p-5">
				<Container>
					<h1>Search for Books!</h1>
					<Form onSubmit={handleFormSubmit}>
						<Row>
							<Col xs={12} md={8}>
								<Form.Control
									name="searchInput"
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									type="text"
									size="lg"
									placeholder="Search for a book"
								/>
							</Col>
							<Col xs={12} md={4}>
								<Button type="submit" variant="success" size="lg">
									Submit Search
								</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>

			<Container>
				<h2 className="pt-5">
					{searchedBooks.length
					 ? `Viewing ${searchedBooks.length} results:`
					 : 'Search for a book to begin'}
				</h2>
				<Row>
					{searchedBooks.map((book) => {
						return (
							<Col md="4" key={book.bookId}>
								<Card border="dark">
									{book.image ? (
										<Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top"/>
									) : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className="small">Authors: {book.authors}</p>
										<Card.Text>{book.description}</Card.Text>
										{Auth.loggedIn() && (
											<Button
												disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
												className="btn-block btn-info"
												onClick={() => handleSaveBook(book.bookId)}>
												{savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
												 ? 'This book has already been saved!'
												 : 'Save this Book!'}
											</Button>
										)}
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
};

export default SearchBooks;
