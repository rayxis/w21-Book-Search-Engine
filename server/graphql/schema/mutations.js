// Defines the Mutation type for the GraphQL schema.
export default `
	type Mutation {
		createUser(username: String!, email: String!, password: String!): Auth
	    login(username: String, email: String, password: String!): Auth
	    saveBook(bookId: ID): User
	    deleteBook(bookId: ID): User
	}
`;
