import React from 'react'
import Offer from './ui/offer'
import Image from 'next/image'
import { book, book2,  pc, pc2, Sell, Sell2, student, student2 } from '@/utils/images/landing'

const Community = () => {
  return (
     <div className='font-primary w-full md:px-10 lg:px-20 xl:px-50 flex justify-center items-center flex-col gap-12 py-20 shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]'>
        <div className='font-primary flex flex-col items-center justify-center tracking-wide [word-spacing:4px] font-semibold leading-10 w-fit text-4xl'>
        <div>Who is<strong className='text-dark-green'> DZ-KITAB </strong></div> for ?
        </div>
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
            <Offer logo={[<Image className="h-10" key="cpu1" src={student2} alt="cpu" />,<Image className="h-10" key="cpu2" src={student} alt="cpu2" />]} title="Students" description="Find affordable textbooks and sell books after the semester" ></Offer>
            <Offer logo={[<Image className="h-10" key="cpu1" src={book} alt="cpu" />,<Image className="h-10" key="cpu2" src={book2} alt="cpu2" />]} title="Books lovers" description="Discover novels and give your books a second life" ></Offer>
            <Offer logo={[<Image className="h-10" key="cpu1" src={pc} alt="cpu" />,<Image className="h-10" key="cpu2" src={pc2} alt="cpu2" />]} title="Tech & Science learners" description="Access technical and scientific books at better prices" ></Offer>
            <Offer logo={[<Image className="h-10" key="cpu1" src={Sell} alt="cpu" />,<Image className="h-10" key="cpu2" src={Sell2} alt="cpu2" />]} title="Smart sellers" description="Sell unused books easily and responsibly" ></Offer>
            
        </div>
    </div>
  )
}

export default Community