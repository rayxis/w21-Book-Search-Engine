import { gql } from '@apollo/client';

// Query for a logged-in user's data
export const GET_ME = gql`
	query me {
		me {
			_id
			username
			email
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;
