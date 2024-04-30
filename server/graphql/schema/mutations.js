// Defines the Mutation type for the GraphQL schema.
module.exports = `
	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
	    login(username: String, email: String, password: String!): Auth
	    saveBook(bookId: ID): User
	    deleteBook(bookId: ID): User
	}
`;
