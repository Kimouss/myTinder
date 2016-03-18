/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	attributes: {
		email: {
			type: 'string',
			required: true,
			unique: true
		},
		login: {
			type: 'string',
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true,
			unique: true
		}
	}
};

