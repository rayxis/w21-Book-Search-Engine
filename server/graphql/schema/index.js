import { gql } from 'apollo-server-express';
import queries from './queries';
import mutations from './mutations';
import types from './types';

// Exporting queries, mutations, and types for the GraphQL schema
export default gql`
    ${types}
    ${queries}
    ${mutations}
`;
