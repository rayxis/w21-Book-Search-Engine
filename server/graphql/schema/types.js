// Defines GraphQL types for User, Book, and Auth
export default `
	type Auth {
	    token:  ID!
	    user:   User
	}
  
    type Book {
        authors:     [String]
        description: String!
        bookId:      ID!
        image:       String
        link:        String
        title:       String!
    }
    
    type User {
        _id:        ID!
        username:   String!
        email:      String!
        password:   String!
        savedBooks: [Book]
    }
`;
