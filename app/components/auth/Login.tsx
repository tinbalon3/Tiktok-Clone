import { ShowErrorObject } from '@/app/types';
import React, { useState } from 'react'
import TextInput from '../TextInput';
import { BiLoaderCircle } from 'react-icons/bi';
import { useUser } from '@/app/context/user';
import { useRouter } from 'next/navigation';
import { useGeneralStore } from '@/app/store/general';

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const contextUser = useUser();
    const router = useRouter();

    const { setIsLoginOpen } = useGeneralStore();
    
    const showError = (type: string) => {
        if (error && Object.keys(error).length > 0 && error?.type === type) {
            return error.message;
        }
        return '';
    }

    const validate = () => {
        setError(null);
        let isError = false;

        const reg = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;

        if(!email) {
            setError({
                message: 'Email is required',
                type: 'email'
            })
            isError = true;
        }
        else if(!reg.test(email)) {
            setError({
                message: 'Invalid email address',
                type: 'email'
            })
            isError = true;
        }
        else if(!password) {
            setError({
                message: 'Password is required',
                type: 'password'
            })
            isError = true;
        }
        return isError;
    }
    const login = async () => {
        let isError = validate();
        if(isError) return;
        if(!contextUser) return;
       
        try {
            setLoading(true);
            await contextUser?.login(email, password);
        }
        catch(error){
            alert(error);
            console.log(error);
        }
        finally{
            setIsLoginOpen(false);
            setLoading(false);
        }
    }
    return (
        <>
            <div>
                <h1 className='text-center text-[28px] mb-4 font-bold'>Log in</h1>
                <div className='px-6 pb-2'>
                    <TextInput
                        string={email}
                        placeholder='Email address'
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                </div>
                <div className='px-6 pb-2'>
                    <TextInput
                        string={password}
                        placeholder='Password'
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>
               
                <div className='px-6 pb-2 mt-6'>
                    <button disabled={loading}
                        onClick={() => login()}
                        className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                            ${(!email || !password) ? 'bg-gray-200' : 'bg-[#f02c56]'}`}>
                        {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Log in'}
                    </button>
                </div>
            </div>
        </>
    )
}

