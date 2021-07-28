const {Schema, model} = require('mongoose');

const userSchema = Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	role: {
		type: String,
		require: true,
		default: 'USER_ROLE'
	},
	google: {
		type: Boolean,
		default: false
	},
	state: {
		type: Boolean,
		default: true
	},
	image: {
		type: String
	},
});

userSchema.methods.toJSON = function(){
	const { __v, password, _id, ...user} = this.toObject();
	user.id = _id;
	return user;
}

module.exports = model('User', userSchema);