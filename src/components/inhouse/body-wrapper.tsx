'use client';
import React, {useEffect, useState} from "react";
import {Inter} from "next/font/google";
import store from "@/redux/store";
import {Provider} from "react-redux";
import { useRouter } from 'next/navigation';

import {CircularProgress} from "@mui/material";

import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {showHideLoading} from "@/redux/loading";
import axiosInstance from "@/utils/axiosInstance";
import {RESPONSE_STATUS} from "@/utils/enums";
import {authenticate} from "@/redux/auth";


const inter = Inter({ subsets: ["latin"] });

interface User {
    name: string;
}


const BodyWrapper = ({children}: {children:React.ReactNode}) => {
    return (<body className={inter.className}>
       <Provider store={store}>
          <AuthProvider>
              {children}
          </AuthProvider>
       </Provider>
    </body>);
}

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const backDrop = useAppSelector(state => state.backdrop.backdrop);
    const auth = useAppSelector(state => state.auth.auth);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!auth || !auth.isAuthenticated) {
            axiosInstance.get('/auth/login')
                .then((response)=>{
                    if (response.status === RESPONSE_STATUS.SUCCESS){
                        dispatch(authenticate({
                            isAuthenticated: true,
                            id:undefined,
                            name:undefined,
                            email:undefined,
                            image:undefined,
                        }))
                        dispatch(showHideLoading({
                            show:false,
                            message:"Authenticated Successfully"
                        }))
                        router.push('/app/dashboard')
                    }
                    else{
                        router.push('/auth/signin');
                    }
                })

        }
    }, [router]);

    return (
        <div className={'relative'}>
            <div className={` h-screen w-full justify-center items-center gap-2.5 ${backDrop.show?'flex flex-col': 'hidden'}`}>
                <CircularProgress/>
                <h3 className={inter.className + ' font-bold'}>{backDrop.message}</h3>
            </div>
            <div className={`${backDrop.show?'hidden': ''}`}>
                {children}
            </div>
        </div>
    );

    // if (backDrop.show) {
    //     return (
    //         <div className={'relative'}>
    //             <div className={`flex flex-col h-screen w-full justify-center items-center gap-2.5 `}>
    //                 <CircularProgress/>
    //                 <h3 className={inter.className + ' font-bold'}>Authenticating, please wait...</h3>
    //             </div>
    //             <div className={`hidden`}>
    //                 {children}
    //             </div>
    //         </div>
    //     );
    // }
    //
    // return (
    //     <div className={inter.className}>
    //         {children}
    //     </div>
    // );
}

export default BodyWrapper;