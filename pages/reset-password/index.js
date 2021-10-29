/* eslint eqeqeq: "off", curly: "error" */
import axios from "axios";
import { useState, useEffect } from "react";
import Link  from "next/link";
import Head from 'next/head'
import config from "../../config"

export default function ForgotPassword() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Token, setToken] = useState('')
    const [ErrorMessage, setErrorMessage] = useState('')
    const [ValidatePassword, setValidatePassword] = useState(true)
    
    function getValue(){
        const query = new URLSearchParams(window.location.search);
        setEmail(query.get('email'))
        setToken(query.get('token'))
    }
    useEffect(() => {
        getValue();
    }, [getValue]);

    const EmailHandler = async event => {
        setEmail(event.target.value)
    }

    const PasswordHandler = async event => {
        setPassword(event.target.value)
        setErrorMessage('')
    }

    const ConfirmPasswordHandler = async event => {
        if(event.target.value != Password){
            setValidatePassword(false)
        }else{
            setConfirmPassword(event.target.value)
            setValidatePassword(true)
        }
        setErrorMessage('')
    }

    const HandleSubmit = async event => {
        event.preventDefault()
        const data = {
            email: Email,
            password: Password,
            confirmPassword: ConfirmPassword,
            token: Token
        }
        await axios.put(`${config.baseUrl}${config.ResetPassUrl}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => {
                console.log(response)
                setErrorMessage('')
            }
        ).catch(error => {
            if (error.response.data) {
                if (error.response.data.identityErrors) {
                    error.response.data.identityErrors.map(
                        err => setErrorMessage(err.description)
                    )
                } else {
                    if (error.response.data.errors.Password) {
                        error.response.data.errors.Password.map(
                            err => setErrorMessage(err)
                        )
                    }
                    if (error.response.data.errors.ConfirmPassword){
                        setErrorMessage(error.response.data.errors.ConfirmPassword[0])
                    }
                }
            } else {
                alert(error.response)
            }
        })
    }

    return (
        <div className="min-h-screen flex justify-center flex-wrap content-center">
            <Head>
                <title>Reset Password</title>
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
                            Email
                        </label>
                        <input className={`shadow bg-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline`} id="email" type="text" placeholder="Email" autoComplete="off" onChange={EmailHandler} value={Email} readOnly />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*****" onChange={PasswordHandler} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm_password" type="password" placeholder="*****" onChange={ConfirmPasswordHandler} />
                        <p className={`text-red-500 text-xs italic ${ValidatePassword ? 'hidden' : ''}`}>Password did not match!</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                    <div className="flex items-center mt-2 justify-center">
                        <span className="text-sm text-gray-300">
                            Already have account? <Link href="/Login"><a className="text-blue-400 hover:text-blue-600">Login</a></Link>
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