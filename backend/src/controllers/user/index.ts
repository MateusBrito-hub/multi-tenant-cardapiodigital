import * as create  from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as update from './update';
import * as confirmEmail from './confirmEmail';

export const UserController = {
	...create,
	...getAll,
	...getById,
	...update,
	...confirmEmail
};