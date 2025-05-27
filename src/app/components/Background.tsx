import React from "react"

type BackgroundProps =  {
    children : React.ReactNode;
}

export default function Background({children}: BackgroundProps) {
  return( 
    <div className="w-full h-screen bg-[#4B4B4B] flex flex-col items-center pt-[50px] pb-[10vh] overflow-y-auto">
    {children}
  </div>
  )
}
