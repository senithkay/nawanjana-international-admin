'use client';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../ui/card"
import { Label } from "../ui/label"
import Link from "next/link"
import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";
import { Input } from 'antd';
import {useAppDispatch} from "@/redux/hooks";
import {Button} from "@/components/ui/button";
import {showHideLoading} from "@/redux/loading";
import axiosInstance from "@/utils/axiosInstance";
import {RESPONSE_STATUS} from "@/utils/enums";
import {authenticate} from "@/redux/auth";

interface Credentials {
  email:string,
  password:string
}

export function V0Signin() {
  const router = useRouter();
  const [isSigning, setIsSigning] = useState(false);
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSigning(true)
    axiosInstance.post('/auth/login', credentials)
        .then((response)=>{
          if (response.status === RESPONSE_STATUS.SUCCESS){
            dispatch(authenticate({
              isAuthenticated: true,
              id:undefined,
              name:undefined,
              email:undefined,
              image:undefined,
            }))
            router.push('/app/dashboard')
          }
          setIsSigning(false);
        })
  }

  useEffect(() => {
    dispatch(showHideLoading({
      show:false,
      message:"Authenticated Successfully"
    }))
  }, []);

  return (
        <div className="flex h-fit items-center justify-center ">

            <Card className="w-full shadow-xl rounded-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Nawanjana International</CardTitle>
                <CardDescription>Enter your admin credentials to sign in to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="m@example.com" value={credentials.email} onChange={(event) => {
                        setCredentials({...credentials, email: event.target.value})
                      }}/>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link className="text-sm font-medium text-gray-900 hover:underline dark:text-gray-400"
                              href="/auth/forgot-password">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" placeholder={'Enter the password'} value={credentials.password} onChange={(event) => {
                        setCredentials({...credentials, password: event.target.value})
                      }} />
                    </div>
                  </div>
                  <Button type={"submit"}>
                    {isSigning ? <CircularProgress size={20} sx={{color: 'black'}}/> : <>Sign in</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
  )
}

