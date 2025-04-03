"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token = sessionStorage.getItem("authorization")
  useEffect(()=>{
    if(token){
      router.push('/main');
    }else{
      router.push('/login');
    }
  },[])

  return(
    <div>...</div>
  )
}