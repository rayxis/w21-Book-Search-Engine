// Import necessary packages and modules
const { signToken } = require('../../utils/auth');
const { Error } = require('mongoose');
const { User } = '../../models';

module.exports = {
	// Mutation for creating a new user
	async createUser(parent, { username, email, password }, context) {
		// Create new user in the database
		const user = await User.create({ username, email, password });

		// If user was not successfully created, throw an error
		if (!user) throw new Error('Something is wrong!');

		// Sign a JSON Web Token for the user
		const token = signToken(user);

		// Return the new user and their token
		return { user, token };
	},

	// Mutation for logging in an existing user
	async login(parent, { username, password }, context) {
		// Find user in the database by their username
		const user = await User.findOne({ username });

		// If user is not found, throw an error
		if (!user) throw new Error('User not found!');

		// Validate password entered is correct
		const correctPassword = await user.isCorrectPassword(password);

		// If password is incorrect, throw an error
		if (!correctPassword) throw new Error('Incorrect password!');

		// Sign a JSON Web Token for the user
		const token = signToken(user);

		// Return the user and their token
		return { user, token };
	},

	// Mutation for saving a book to a user's 'savedBooks' set
	async saveBook(parent, { userId, bookData }, context) {
		// Find user and update their 'savedBooks' set with provided bookData
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { savedBooks: bookData } },
			{ new: true, runValidators: true }
		);

		// If user is not found, throw an error
		if (!user) throw new Error('User not found!');

		// Return updated user
		return user;
	},

	// Mutation for removing a book from user's 'savedBooks' set
	async deleteBook(parent, { userId, bookId }, context) {
		// Find user and pull the specified book from their 'savedBooks' set
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{ $pull: { savedBooks: { bookId } } },
			{ new: true }
		);

		// If user is not found, throw an error
		if (!user) throw new Error('User not found!');

		// Return updated user
		return user;
	}
};
