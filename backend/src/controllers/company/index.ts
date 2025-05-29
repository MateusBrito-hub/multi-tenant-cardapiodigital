import * as create  from './create';
import * as getAll from './getAll';
import * as getByCnpj from './getByCnpj';
import * as update from './update';

export const CompanyController = {
	...create,
	...getAll,
	...getByCnpj,
	...update,
};