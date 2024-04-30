// GraphQL schema for the Query type.
module.exports = `
	type Query {
        getSingleUser(id: ID, username: String): User
    }
`;
