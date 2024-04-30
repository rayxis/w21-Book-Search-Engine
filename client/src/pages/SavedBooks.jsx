import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
	Container,
	Card,
	Button,
	Row,
	Col
} from 'react-bootstrap';

// Import the authentication functions
import Auth from '../utils/auth';
// Import the necessary GraphQL queries and mutations
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

// Function component for SavedBooks
const SavedBooks = () => {

	// Fetch the current user and their saved books
	const { loading, data }       = useQuery(GET_ME);
	const [userData, setUserData] = useState(data ? data.me : {});

	useEffect(() => {
		if (data) {
			setUserData(data.me);
		}
	}, [data]);

	// Define the REMOVE_BOOK mutation for deleting a saved book
	const [removeBook, { error }] = useMutation(REMOVE_BOOK);

	// Delete a book from the user's saved books
	const handleDeleteBook = async (bookId) => {
		// Get the current user's token
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		// Stop execution if user isn't logged in
		if (!token) {
			return false;
		}

		try {
			const { data } = await removeBook({ variables: { bookId } });

			// Set the user data again after book removal
			setUserData(data.removeBook);

		} catch (err) {
			// Handle error
			console.error(err);
		}
	};

	if (loading) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<div fluid className="text-light bg-dark p-5">
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</div>
			<Container>
				<h2 className="pt-5">
					{userData.savedBooks.length
					 ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
					 : 'You have no saved books!'}
				</h2>
				<Row>
					{userData.savedBooks.map((book) => {
						return (
							<Col md="4">
								<Card key={book.bookId} border="dark">
									{book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`}
									                        variant="top"/> : null}
									<Card.Body>
										<Card.Title>{book.title}</Card.Title>
										<p className="small">Authors: {book.authors}</p>
										<Card.Text>{book.description}</Card.Text>
										<Button className="btn-block btn-danger"
										        onClick={() => handleDeleteBook(book.bookId)}>
											Delete this Book!
										</Button>
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

export default SavedBooks;
