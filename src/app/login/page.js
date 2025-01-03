"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";


export default function login() {
    const [isPending, setPending] = useState(false)

    const {register,handleSubmit,setValue,setFocus,reset}=useForm()

    const router = useRouter()

    const onLogin=(data)=>{
       setPending(true)
       setTimeout(async()=>{
        const res = await axios.post('/api/login',data)
        const resData = res.data
        setPending(false)
        if(resData.status){
            toast.success(resData.message)
            Cookies.set('user',JSON.stringify(data),{expires:2})
            router.push('/dashboard')
        } else{
            toast.error(resData.message)
            if(resData.message==="Wrong Password"){
                setValue('password',"")
            } else {
                reset()
            }
        }
       }, 1200);

    }
     
    useEffect(()=>{
        if(Cookies.get('user')){
            const data = JSON.parse(Cookies.get('user'))
            setValue('username',data.username)
            setValue('password',data.password)
            setFocus('password')
            setTimeout(()=>{
                onLogin(data)
            }, 500);

        } else{
            setFocus('username')
        }
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


        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-700 to-cyan-600 text-white">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit(onLogin)} autoComplete="off">
                    <h2 className="my-4 text-2xl text-center font-bold text-blue-700">Blog Login</h2>

                    <div className="md-5">
                        <label className="mt-2 block mb-2 font-medium text-gray-500 text-sm">Username</label>
                        <input type="email"
                        {...register('username')} className="w-full text-black rounded-lg border border-gray-300 p-2 focus:outline focus:ring-2 focus:ring-blue-600 focus:font-medium disabled:cursor-not-allowed disabled:bg-gray-300"
                            name="username"  disabled={isPending}
                            ></input>
                    </div>
                    <div className="md-5">
                        <label className=" mt-2 block mb-2 font-medium text-gray-500 text-sm">Password</label>
                        <input type="password" className="w-full text-black  rounded-lg border border-gray-300 p-2 focus:outline focus:ring-2 focus:ring-blue-600 focus:font-medium disabled:cursor-not-allowed disabled:bg-gray-300"
                            name="password" {...register('password')} disabled={isPending}></input>
                    </div>
                    <button disabled={isPending} type="submit" className=" disabled:cursor-not-allowed disabled:bg-blue-300 w-full bg-blue-800 mb-5 text-white p-2.5 my-4 rounded-lg hover:bg-blue-500 transition duration-300">Login</button>
                </form>
                <p className="w-full text-center text-sm text-gray-600"> If don't have account? <Link href="/Register" className="text-blue-700 focus:underline font-bold">Register</Link></p>
            </div>
        </div>
    </>
)
}
