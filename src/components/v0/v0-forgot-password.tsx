
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from 'antd';
import { Button } from "../ui/button"
import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
import {NOTIFICATION_TYPES, RESPONSE_STATUS} from "../../utils/enums";
import {useRouter} from "next/navigation";
import {CircularProgress} from "@mui/material";
import {showHide} from "../../redux/notification";
import {useAppDispatch} from "../../redux/hooks";


interface IInputFieldError {
    status:"" | "warning" | "error" | undefined,
    message:string|undefined,
}


export function V0ForgotPassword() {
    const [emailError, setEmailError] = useState<IInputFieldError>({
        status:undefined,
        message:undefined
    });
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleSendRecoveryEmail = ()=>{
        setIsLoading(true);
        axiosInstance.get(`/auth/sendmail/${email}`)
            .then((response:any)=>{
                if (response.status === RESPONSE_STATUS.SUCCESS){
                    router.push('/auth/recover-password')
                }
                else{
                    dispatch(showHide({
                        type:NOTIFICATION_TYPES.ERROR,
                        message:response.description,
                        show:true
                    }))
                }
                setIsLoading(false);
            })
    }
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>{'Enter your email address and we\'ll send you a link to reset your password.'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input status={emailError.status}  id="email" placeholder="m@example.com" required type="email" onChange={(event)=>{
              setEmail(event.target.value)
          }}/>
        </div>
        <Button className="w-full" type="submit" onClick={handleSendRecoveryEmail}>
            {isLoading?                  <CircularProgress size={30} sx={{color:'white'}}/>: <>Send Recovery Email</>}
        </Button>
      </CardContent>
    </Card>
  )
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
