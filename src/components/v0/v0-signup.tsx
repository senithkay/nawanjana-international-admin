
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../ui/card"
import { Label } from "../ui/label"
import Link from "next/link"
import Image from "next/image";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";
import { Input } from 'antd';
import {useAppDispatch} from "@/redux/hooks";
import ButtonBP from "@/components/inhouse/primary-button";

interface ICredentials {
    email: string;
    password: string;
    cpassword: string;
    firstName:string;
    lastName:string;
    mobile:string;
    username:string;
}

interface IInputFieldError {
    status:"" | "warning" | "error" | undefined,
    message:string|undefined,
}



export function V0Signup() {

    const [credentials, setCredentials] = useState<ICredentials>({
        email : '',
        password : '',
        cpassword : '',
        firstName:'',
        username:'',
        lastName:'',
        mobile:'',
    });

    const [isSigning, setIsSigning] = useState(false);
    const [passwordError, setPasswordError] = useState<IInputFieldError>({
        status:undefined,
        message:undefined
    });
    const [emailError, setEmailError] = useState<IInputFieldError>({
        status:undefined,
        message:undefined
    });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogin = () => {

    }

    return (
        <div className="flex h-fit items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="grid md:grid-cols-2 w-full max-w-6xl">
                <div className="hidden md:block">
                    <Image style={{
                        aspectRatio: "800/600",
                        objectFit: "cover",
                    }} className={'hover:scale-105 transition-all duration-150 w-full mx-auto mt-[50px]'} width={100}
                           height={50} src={'/images/signup.svg'}
                           alt={'About us'}></Image>
                </div>
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>Enter your email and password to sign in to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className={'flex gap-[5px]'}>
                            <div className="space-y-2">
                                <Label htmlFor="fname">First Name</Label>
                                <Input id="fname" placeholder="Ex: John" required
                                       type="text" onChange={(event) => {
                                    setCredentials({...credentials, firstName: event.target.value});
                                }}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lname">Last Name</Label>
                                <Input id="lname" placeholder="Ex: Doe" required
                                       type="text" onChange={(event) => {
                                    setCredentials({...credentials, lastName: event.target.value});
                                }}/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="Ex: JohnnyDep123" required
                                   type="text" onChange={(event) => {
                                setCredentials({...credentials, username: event.target.value});
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Contact Number</Label>
                            <Input id="mobile" placeholder="Ex: +94 112 232 232" required
                                   type="text" onChange={(event) => {
                                setCredentials({...credentials, mobile: event.target.value});
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input status={emailError.status} id="email" placeholder="Ex: m@example.com" required
                                   type="email" onChange={(event) => {
                                setEmailError({
                                    status: undefined,
                                    message: undefined
                                })
                                setCredentials({...credentials, email: event.target.value});
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input status={passwordError.status} id="password" placeholder={'Enter the password'}
                                   required type="password" onChange={(event) => {
                                setPasswordError({
                                    status: undefined,
                                    message: undefined
                                })
                                setCredentials({...credentials, password: event.target.value});
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpassword">Confirm Password</Label>
                            <Input status={passwordError.status} id="cpassword" placeholder={'Enter the password again'}
                                   required type="password" onChange={(event) => {
                                setPasswordError({
                                    status: undefined,
                                    message: undefined
                                })
                                setCredentials({...credentials, cpassword: event.target.value});
                            }}/>
                        </div>
                        <ButtonBP  onClick={handleLogin}>
                            {isSigning ? <CircularProgress size={30} sx={{color: 'white'}}/> : <>Sign in</>}
                        </ButtonBP>

                    </CardContent>
                    <CardFooter className="text-center text-sm">
                        {'   Don\'t have an account?'}
                        <Link className="font-medium text-gray-900 hover:underline dark:text-gray-400" href="#">
                            Sign up
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

const validatePassword = (value: string): IInputFieldError => {
    // if (value.length<8){
    //   return {
    //     status: "error",
    //     message: "Password must contain minimum of 8 characters"
    //   }
    // }
    return {
        status: undefined,
        message: undefined
    }
}

const validateEmail = (value: string):IInputFieldError  => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)){
        return {
            status: "error",
            message: "Invalid email format"
        }
    }
    return {
        status: undefined,
        message: undefined
    }
}
