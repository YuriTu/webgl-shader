import axios from 'axios';


axios.defaults.timeout = 10000;

axios.defaults.retry = 4;
axios.defaults.retryDelay = 2000;



export const get = (url,params) => {
    return axios.get(url,{
        params
    })
}
