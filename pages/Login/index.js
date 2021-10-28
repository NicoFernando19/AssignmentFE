import axios from "axios";
import { useState } from "react";
import Link from "next/link"
import Head from 'next/head'
import Cookies from "js-cookie";

export default function Login(){
    const [Email, setEmail] = useState('')
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [ErrorMessage, setErrorMessage] = useState('')

    const HandleSubmit = async event => {
        event.preventDefault()
        const data = {
            email: Email,
            userName: Username,
            password: Password
        }
        await axios.post('https://localhost:44374/api/Authentication/Login', data).then(
            response => {
                console.log(response)
                setErrorMessage('')
            }
        ).catch(error => {
            error.response.data.identityErrors.map(
                err => setErrorMessage(err.description)
            )
        })

    }

    const usernameHandle = async event => {
        setErrorMessage('')
        setUsername(event.target.value)
        setEmail(event.target.value)
    }

    const passwordHandle = async event => {
        setErrorMessage('')
        setPassword(event.target.value)
    }

    return(
        <div className="min-h-screen flex justify-center flex-wrap content-center">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="m-4 w-full max-w-xs">
                <form className="bg-blue-900 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={HandleSubmit}>
                    <div className={`flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 ${ErrorMessage == '' ? 'hidden' : ''}`} role="alert">
                        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                        <p>{ErrorMessage}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={usernameHandle} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*****" onChange={passwordHandle} />
                        <span className="flex justify-end text-sm">
                            <p className="text-gray-300">
                                Forgot Password? <Link href="/forgot-password"><a className="text-blue-400 hover:text-blue-600">Reset Password!</a></Link>
                            </p>
                        </span>
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                    </div>
                    <div className="flex items-center mt-2 justify-center">
                        <span className="text-sm text-gray-300">
                            Don't have account? <Link href="/Register"><a className="text-blue-400 hover:text-blue-600">Register</a></Link>
                        </span>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2021 Assignment. All rights reserved.
                </p>
            </div>
        </div>
    )
}