import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Card from '../components/CardEmployee'
import { useRouter } from 'next/router'

export default function Home() {
  const [Data, setData] = useState([{imageName: '', name: '', address:''}])
  const router = useRouter()
  
  useEffect(() => {
    //use swr please!! after playing valo
    axios.get('https://localhost:44374/api/Employees').then(response =>  {
        setData(response.data)
    }).catch(err => {
      if (err.response.status == 401) {
        router.push({
          path: '/Login'
        })
      } else {
        
      }
    })
  });

  return (
    <div className="min-h-screen">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center m-5">
        <p className="text-4xl text-blue-500">Employees</p>
      </div>
      <div className="m-6 grid grid-cols-4">
        {
           Data.map((data, i) => <Card ImagePath={`https://localhost:44374/${data.imagePath}`} ImageName={data.imageName} Name={data.name} Address={data.address} id={data.id} key={i} /> )
        }
      </div>
    </div>
  )
}
