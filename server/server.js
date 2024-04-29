// Import required modules
const { ApolloServer }   = require('apollo-server-express');
const express            = require('express');
const path               = require('path');
const db                 = require('./config/connection');
const typeDefs           = require('./graphql/schema');     // GraphQL schemas
const resolvers          = require('./graphql/resolvers');  // GraphQL resolvers, both Query and Mutation
const { authMiddleware } = require('./utils/auth');         // Authentication middleware

// Setup express app
const app  = express();
const PORT = process.env.PORT || 3001;

// URL encoded and JSON request body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files only in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of Apollo Server
const server = new ApolloServer({
	                                // The GraphQL schemas
	                                typeDefs,
	                                // The resolvers for executing the graphQL queries
	                                resolvers,
	                                // Make sure resolvers have access to the `authMiddleware`
	                                context: authMiddleware
                                });

// Apply the Apollo GraphQL middleware and set the path to /graphql
server.applyMiddleware({ app, path: '/graphql' });

// Listen for connections on the specified port, once the database is open
db.once('open', () => {
	app.listen(PORT, () => {
		// Log where the server is listening
		console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
	});
});
