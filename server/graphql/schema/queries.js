// GraphQL schema for the Query type.
export default `
	type Query {
        getSingleUser(id: ID, username: String): User
    }
`;
