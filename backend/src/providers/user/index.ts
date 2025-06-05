import * as count from './count';
import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as update from './update';


export const userProvider = {
    ...count,
    ...create,
    ...getAll,
    ...getById,
    ...update,
}