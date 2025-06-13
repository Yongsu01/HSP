"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    const token = sessionStorage.getItem("authorization")
    if(token){
      router.push('/mainpage');
    }else{
      router.push('/login');
    }
  },[])

  return(
    <div>...</div>
  )
}