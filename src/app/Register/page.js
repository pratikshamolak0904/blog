"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const [isPending, setPending] = useState(false)
    const {register,handleSubmit,setFocus,setValue}=useForm()
    const router=useRouter()

    
    const onRegister=(data)=>{
        if(data.password !== data.cpassword){
            toast.error("Password doesn't match !!")
            setValue('password',"")
            setValue('cpassword',"")
            return

        }
        setPending(true)
        setTimeout(async() =>{
            const res = await axios.post('/api/Register',data)
            const resData = res.data
            setPending(false)
            if(resData.status){
                toast.success(resData.message)
                router.push('/login')
            } else{
                toast.error(resData.message)
            }
        }, 1200);
    }

    useEffect(()=>{
        setFocus('fullname')
    },[])

    return (
        <>

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
            <div className="flex items-center justify-center min-h-screen px-7 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="shadow-lg bg-white rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-r from-navyblue-700 to-navyblue-600 text-white-100 to-pink-600">
                    <form autoComplete="off" className="bg-white w-full max-w-md px-9 py-7" onSubmit={handleSubmit(onRegister)}>
                        <h2 className="my-4 text-2xl text-center font-bold text-blue-700">Register</h2>
                        <div>
                            <label className="text-blue-600 block mb-1 text-sm">Fullname</label>
                            <input {...register('fullname')} required disabled={isPending} name="fullname"
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                                 />
                        </div>
                        <div>
                            <label className="text-blue-600 block mb-1 text-sm">Username</label>
                            <input {...register('username')}required 
                            disabled={isPending}
                             
                                type="email" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition" 
                                 />
                        </div>
                        <div>
                            <label className="text-blue-600 block mb-1 text-sm">Password</label>
                            <input {...register('password')} required disabled={isPending} 
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition" 
                               />
                        </div>
                        <div>
                            <label className="text-blue-600 block mb-1 text-sm">Confirm Password</label>
                            <input {...register('cpassword')} required disabled={isPending} 
                                type="password" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition" 
                                />
                        </div>
                        <button disabled={isPending}
                            type="submit"
                            className="disabled:cursor-not-allowed disabled:bg-blue-300  w-full py-3 my-7 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center rounded-lg transition duration-300 hover:from-blue-400 hover:to-blue-600 active:scale-95">Register
                        </button>
                    </form>
                    <div className="flex items-center justify-center w-full px-3 py-7 bg-gradient-to-r from-pink-700 to-cyan-600 text-white">
                        <p className="text-md text-center">
                            If Already have an account?
                            <Link href="login" className="hover:underline font-bold text-yellow-300 hover:text-yellow-500 transition">Click here</Link> to Login
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}