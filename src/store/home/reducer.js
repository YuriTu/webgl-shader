import * as home from './action-type';


let defaultState = {
    count:1,
    imgPath:''
};


export const genHomeState = (state = defaultState, action = {}) => {
    switch (action.type) {
        case home.PLUSCOUNT:
            return {...state, ...{[action.type]:action.value}};
        default:
            return state;
    }
}


