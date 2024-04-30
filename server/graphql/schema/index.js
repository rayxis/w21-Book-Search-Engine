const { gql }   = require('apollo-server-express');
const queries   = require('./queries');
const mutations = require('./mutations');
const types     = require('./types');

// Exporting queries, mutations, and types for the GraphQL schema
module.exports = gql`
	${types}
	${queries}
	${mutations}
`;
