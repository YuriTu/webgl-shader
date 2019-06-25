import * as home from './action-type';

export const plusCount = (value, datatype) => {

    let nValue = value + 1;
    console.log(nValue,'action')
    return {
        type:home.PLUSCOUNT,
        value:nValue
    }
}
