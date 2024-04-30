// Import User model
const { User } = '../../models';

module.exports = {
	// 'getSingleUser' resolver for GraphQL
	async getSingleUser(parent, { id, username }) {
		// Find a User by ID or username and return it
		return User.findOne({
			                    $or: [{ _id: id }, { username }]
		                    });
	}
};
