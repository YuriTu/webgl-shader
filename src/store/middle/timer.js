export const loger = store => next => action => {
    let stime = new Date();
    next(action)
    let endTime = new Date();
    console.log('time cost:',endTime - stime);
    console.log(store.getState());
}
