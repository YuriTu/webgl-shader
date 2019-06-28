import * as home from './action-type';


let defaultState = {
    count:1,
    sid:'',
    result:''
};


export const genHomeState = (state = defaultState, action = {}) => {
    switch (action.type) {
        case home.PLUSCOUNT:
            console.log(action.value,'reducer')
            return {...state, ...{count:action.value}};
        case home.SAVEDATA:
            return {...state, ...{[action.dataType]:action.value}}
        case home.POSTREQUEST:
            return {...state, ...{result: action.value}}
        default:
            return state;
    }
}


