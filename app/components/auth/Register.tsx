import { ShowErrorObject } from '@/app/types';
import { useRouter } from 'next/navigation'
import React, { use, useState } from 'react'
import TextInput from '../TextInput';
import { BiLoaderCircle } from 'react-icons/bi';
import { useUser } from '@/app/context/user';
import { useGeneralStore } from '@/app/store/general';

export default function Register() {
    const contextUser = useUser();

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<ShowErrorObject | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const { setIsLoginOpen } = useGeneralStore();
    const showError = (type: string) => {
        if (error && Object.keys(error).length > 0 && error?.type === type) {
            return error.message;
        }
        return '';
    }

    const regiser = async () => {
        let isError = validate();
        if (isError) return;

        try {
            setLoading(true);
            await contextUser?.register(name, email, password);
            router.refresh();
        }
        catch (error) {
            alert(error);
            console.log(error);
        }
        finally {
            setIsLoginOpen(false);
            setLoading(false);
        }
    }

    const validate = () => {
        setError(null);
        let isError = false;

        const reg = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;

        if (!name) {
            setError({
                message: 'Name is required',
                type: 'name'
            })
            isError = true;
        }
        else if (!email) {
            setError({
                message: 'Email is required',
                type: 'email'
            })
            isError = true;
        }
        else if (!reg.test(email)) {
            setError({
                message: 'Invalid email address',
                type: 'email'
            })
            isError = true;
        }
        else if (!password) {
            setError({
                message: 'Password is required',
                type: 'password'
            })
            isError = true;
        }
        else if (password.length < 8) {
            setError({
                message: 'Password must be at least 8 characters long',
                type: 'password'
            })
            isError = true;
        }
        else if (password !== confirmPassword) {
            setError({
                message: 'Passwords do not match',
                type: 'confirmPassword'
            })
            isError = true;
        }
        return isError;
    }
    return (
        <>
            <div>
                <h1 className='text-center text-[28px] mb-4 font-bold'>Register</h1>
                <div className='px-6 pb-2'>
                    <TextInput
                        string={name}
                        placeholder='Name'
                        onUpdate={setName}
                        inputType="text"
                        error={showError('name')}
                    />
                </div>
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
                <div className='px-6 pb-2'>
                    <TextInput
                        string={confirmPassword}
                        placeholder='Confirm Password'
                        onUpdate={setConfirmPassword}
                        inputType="password"
                        error={showError('confirmPassword')}
                    />
                </div>

                <div className='px-6 pb-2 mt-6'>
                    <button disabled={loading}
                        onClick={() => regiser()}
                        className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                                        ${(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#f02c56]'}`}>
                        {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : 'Log in'}
                    </button>
                </div>
            </div>
        </>
    )
}

