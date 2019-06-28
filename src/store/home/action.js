import * as home from './action-type';
import {url} from "./config";
import {get} from "../../api/api";

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
                sid: sid
            };
            let rs = await get(url.domain,param);
            let data = rs.data;
            dispatch({
                type:home.POSTREQUEST,
                value:data.msg
            })
        } catch (e) {
            console.error(e)
        }



    }
}
