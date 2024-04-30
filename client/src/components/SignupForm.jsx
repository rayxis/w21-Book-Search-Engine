// Importing necessary dependencies and components
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// Define the SignupForm functional component
const SignupForm = () => {
	// Initialize state variables for the new user data input form
	const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
	const [validated]                     = useState(false);
	const [showAlert, setShowAlert]       = useState(false);

	// Define the addUser mutation to add a new user to the database
	const [addUser] = useMutation(ADD_USER);

	// Function to update state when the user enters account data
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	// Function to handle form submission
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Validate form
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		try {
			// Execute the addUser mutation and get the authentication token from the response
			const { data } = await addUser({
				                               variables: { ...userFormData }
			                               });

			// Log the user in with the token
			Auth.login(data.addUser.token);
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		// Clear form values
		setUserFormData({
			                username: '',
			                email:    '',
			                password: ''
		                });
	};

	return (
		<>
			{/* This is needed for the validation functionality above */}
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				{/* show alert if server response is bad */}
				<Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
					Something went wrong with your signup!
				</Alert>

				<Form.Group className="mb-3">
					<Form.Label htmlFor="username">Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Your username"
						name="username"
						onChange={handleInputChange}
						value={userFormData.username}
						required
					/>
					<Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Your email address"
						name="email"
						onChange={handleInputChange}
						value={userFormData.email}
						required
					/>
					<Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Your password"
						name="password"
						onChange={handleInputChange}
						value={userFormData.password}
						required
					/>
					<Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
				</Form.Group>
				<Button
					disabled={!(userFormData.username && userFormData.email && userFormData.password)}
					type="submit"
					variant="success">
					Submit
				</Button>
			</Form>
		</>
	);
};

export default SignupForm;
