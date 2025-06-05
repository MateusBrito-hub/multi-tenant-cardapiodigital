import * as create  from './create';
import * as getAll from './getAll';
import * as getByEmail from './getByEmail';
import * as update from './update';
import * as confirmEmail from './confirmEmail';
import * as singIn from './singIn';

export const UserController = {
	...create,
	...getAll,
	...getByEmail,
	...update,
	...confirmEmail,
	...singIn
};