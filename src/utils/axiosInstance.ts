import axios from "axios";
import store from "@/redux/store";
import {authenticate} from "@/redux/auth";
import {showHide} from "@/redux/notification";
import {NOTIFICATION_TYPES, RESPONSE_STATUS} from "@/utils/enums";


interface INotification {
    _id: string;
    title: string;
    description: string;
    isBroadCasted: boolean;
    read: boolean;
}


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        const requestedUrl = response.config.url;
        if (requestedUrl === '/auth/login' && response.status === 200) {
            const user = response.data.data;
            // store.dispatch(authenticate({
            //     isAuthenticated: true,
            //     email: user.email,
            //     id: user._id,
            //     name: user.username,
            //     image: user.image
            // }))

        }

        return response.data;
    },
    (error) => {
        const requestedUrl = error.response.config.url;
        const requestedMethod = error.response.config.method;
        if (error.response.status === 401) {
            handle401(requestedUrl, requestedMethod, error.response.data.description)
        }

        return error.response.data
    }
);

const handle401 = (requestedUrl:string, requestedMethod:string, description:string)=>{
    if (requestedUrl !== '/auth/login') {
        store.dispatch(authenticate({
            isAuthenticated:false,
            email: undefined,
            id: undefined,
            name:undefined,
            image:undefined
        }))

    }
    else if (requestedMethod.toUpperCase() === 'POST'){
        store.dispatch(showHide({
            type:NOTIFICATION_TYPES.ERROR,
            message:description,
            show:true
        }))
    }
}



export default axiosInstance;