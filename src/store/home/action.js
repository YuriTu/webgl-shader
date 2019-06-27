import * as home from './action-type';
import {url} from "./config";

export const plusCount = (value, datatype) => {

    let nValue = value + 1;
    return {
        type:home.PLUSCOUNT,
        value:nValue
    }
}

export const saveData = (dataType,value) => {
    return {
        type:home.SAVEDATA,
        value:value,
        dataType:dataType

    }
}

export const genRequest = (sid) => {
    return async dispatch => {
        try {
            let param = {
                r: 'api/createSurveyBySid',
                ak: url.token,
                sid: sid
            };

            let rs = await get(param);

            dispatch({
                type:'',
                value:''
            })
        } catch (e) {
            console.error(e)
        }



    }
}
