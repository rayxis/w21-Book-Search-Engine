import { gql } from 'apollo-server-express';
import queries from './queries';
import mutations from './mutations';
import types from './types';

// Export the typeDefs
export default gql`
    ${queries}
    ${mutations}
    ${types}
`;
