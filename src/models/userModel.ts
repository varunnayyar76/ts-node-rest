import * as mongoose from 'mongoose';
import * as validators from 'mongoose-validators';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname: {
		type: String,
		required: 'FirstName is required.',
		validate: [
			validators.isAlphanumeric({ message: 'Firstname should be alphanumeric.' }),
			validators.isLength({ message: 'Length should be between 2 and 60' }, 2, 60)
		]
	},
	lastname: {
		type: String,
		required: 'LastName is required.',
		validate: [
			validators.isAlphanumeric({ message: 'Lastname should be alphanumeric.' }),
			validators.isLength({ message: 'Length should be between 2 and 60' }, 2, 60)
		]
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		validate: validators.isEmail({ message: 'Please enter a correct Email address.' })
	},
	company: {
		type: String,
		validate: validators.isLength({ message: 'Length should be between 2 and 60' }, 2, 60)
	},
	phone: {
		type: Number,
		validate: validators.isLength({ message: 'Length should be between 2 and 60' }, 2, 60)
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre("save", true, function(next, done) {
	const self: any = this;
	
	mongoose.models["User"].findOne({email: self.email}, function(err, user) {
			if(err) {
					done(err);
			} else if(user) {
					self.invalidate("email", "Email must be unique");
					done(new Error("User validation failed: email: Email must be unique"));
			} else {
					done();
			}
	});
	next();
});

export const User = mongoose.model('User', UserSchema);