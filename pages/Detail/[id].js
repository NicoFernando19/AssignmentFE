/* eslint eqeqeq: "off", curly: "error" */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Cookies from "js-cookie";
import config from "../../config"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Detail() {
    const [Data, setData] = useState({})
    const [Token, setToken] = useState(null)
    const router = useRouter()

    function getToken(){
        setToken(Cookies.get('Token'))
    }
    
    useEffect(() => {
        getToken();
        const {id} = router.query
        if(!(id == '' || id == undefined || Token == null)){
            axios.get(`${config.baseUrl}${config.EmployeeUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            }).then(response =>  {
                setData(response.data)
            }).catch(err => {
                if (err.response.status == 401) {
                    Cookies.remove('Email')
                    Cookies.remove('Token')
                    Cookies.remove('UserName')
                    Cookies.remove('Name')
                    router.push('/Login')
                } else {
                    
                }
            })
        }
    }, [getToken])

    const DeleteHandler = event => {
        const {id} = router.query
        axios.delete(`${config.baseUrl}${config.EmployeeUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${Token}`
            }
        }).then(response =>  {
            router.push('/')
        }).catch(err => {
            if (err.response.status == 401) {
                router.push('/Login')
            } else {
                
            }
        })
    }

    if (!Data.name || Token == null) {
        return(
            <div className="container mx-auto my-5 p-5">
                <Head>
                    <title>Detail</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Skeleton count={15}/> 
            </div>
        )
    }else {
        return(
            <div className="container mx-auto my-5 p-5">
                <Head>
                    <title>Detail || {Data.name}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-blue-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src={`${config.baseUrl}/${Data.imagePath}`}
                                    alt={Data.imageName} />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{Data.name}</h1>
                            {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3> */}
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{Data.address}</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                            className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">Nov 07, 2016</span>
                                </li>
                            </ul>
                        </div>
                        <div className="my-4"></div>
                    </div>
                    <   div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                        <div className="px-4 py-2">{Data.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                        <div className="px-4 py-2">{Data.gender}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2">{Data.phoneNumber}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Address</div>
                                        <div className="px-4 py-2">{Data.address}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href={`mailto:${Data.email}`}>{Data.email}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                        <div className="px-4 py-2">{Data.doB}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="my-4"></div>
    
                        <div className="flex flex-wrap justify-end items-center">
                            <Link href={`/Edit/${Data.id}`}>
                                <a className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                                    Edit
                                </a>
                            </Link>
                            <button onClick={DeleteHandler} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}