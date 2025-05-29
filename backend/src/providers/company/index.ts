import * as count from './count';
import * as create from './create';
import * as getAll from './getAll';
import * as getByCnpj from './getByCnpj';
import * as update from './update';


export const companyProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getByCnpj,
    ...update,
}