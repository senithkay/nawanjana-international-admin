'use client';
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axiosInstance from "../../utils/axiosInstance";
import {NOTIFICATION_TYPES, RESPONSE_STATUS} from "../../utils/enums";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import {useAppDispatch} from "../../redux/hooks";
import {showHide} from "../../redux/notification";

export function V0RecoverPassword() {
    const [credentials, setCredentials] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const params = useParams();
    const token = params.token;

    const handleRest = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        setIsLoading(true)
        if (credentials.confirmPassword !== credentials.password){
            dispatch(showHide({
                type:NOTIFICATION_TYPES.ERROR,
                message:'Password and Confirm Password do not match',
                show:true
            }))
            return;
        }

        axiosInstance.post('/auth/pwd-reset', {...credentials, key: token})
            .then((response)=>{
                if (response.status === RESPONSE_STATUS.SUCCESS){
                    router.push('/auth/signin')
                    dispatch(showHide({
                        type:NOTIFICATION_TYPES.SUCCESS,
                        message:'Password reset successful',
                        show:true
                    }))
                }
                setIsLoading(false);
            })
    }
  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter a new password for your account.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input id="password" placeholder="Enter a new password" required type="password" onChange={(event) => {
              setCredentials({...credentials, password: event.target.value});
          }}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" placeholder="Confirm your new password" required type="password" onChange={(event) => {
              setCredentials({...credentials, confirmPassword: event.target.value});
          }}/>
        </div>
        <Button className="w-full" onClick={handleRest}>
          Reset Password
        </Button>
      </form>
    </div>
  )
}
