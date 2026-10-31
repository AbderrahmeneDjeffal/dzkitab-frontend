/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import React, { useState } from 'react'
type Props = {
    logo : any[];
    title : string;
    description : string;
}
const Offer = ({ logo, title, description }: Props) => {
    const  [hover , setHover] = useState(false)
  return (
    <div className='flex flex-1 flex-col justify-evenly items-center h-[250px] bg-gray hover:bg-dark-green transition-colors duration-300 ease-in-out rounded-2xl cursor-pointer' onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        <div>{hover ? logo[1] : logo[0]}</div>
        <div className={`font-semibold ${hover ? 'text-white' : ''}`}>{title}</div>
        <div className={`px-2 text-xs text-center  tracking-wide ${hover ? 'text-white' : ''}`}>{description}</div>
    </div>
  )
}

export default Offer