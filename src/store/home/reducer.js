import * as home from './action-type';


let defaultState = {
    count:1,
    imgPath:''
};


export const genHomeState = (state = defaultState, action = {}) => {
    switch (action.type) {
        case home.PLUSCOUNT:
            console.log(action.value,'reducer')
            return {...state, ...{count:action.value}};
        default:
            return state;
    }
}


