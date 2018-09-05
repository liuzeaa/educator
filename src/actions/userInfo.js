import * as actionTypes from '../constants';

const update  = (data) => {
    return {
        type:actionTypes.USERINFO_UPDATE,
        data
    }
}

export {update}