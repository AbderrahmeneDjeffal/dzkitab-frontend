import React from 'react'

const Work = () => {
  return (
      <div className='font-primary w-full md:px-10 lg:px-20 xl:px-50 flex justify-center items-center flex-col gap-12 py-20 shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]'>
        <div className='font-primary flex flex-col items-center justify-center tracking-wide [word-spacing:4px] font-semibold leading-10 w-fit text-4xl'>
        <div>How it<strong className='text-dark-green'> works ?</strong></div>
            
        </div>
        <div className="flex items-center  w-full  mt-10 gap-0 justify-center">
      <div className="flex flex-col items-center w-[25%] ">
        <div className="w-17 h-17 rounded-full bg-dark-green flex items-center justify-center text-white font-bold text-2xl">
          1
        </div>
        <span className="mt-2 font-bold text-lg h-20">Create an account</span>
      </div>

      <div className="flex flex-col items-center relative w-[50%]">
        <div className="absolute top-8 -left-20 md:-left-28  h-1 bg-dark-green -z-10 w-[150%]"></div> {/* line behind */}
        <div className="w-17 h-17 rounded-full bg-dark-green flex items-center justify-center text-white z-10 font-bold text-2xl">
          2
        </div>
        <span className="mt-2 font-bold text-lg h-20">Post or find a book</span>
      </div>

      <div className="flex flex-col items-center w-[25%]">
        <div className="w-17 h-17 rounded-full bg-dark-green flex items-center justify-center text-white font-bold text-2xl">
          3
        </div>
        <span className="mt-2 font-bold text-lg h-20">Contact the seller securely</span>
      </div>
    </div>
        </div>

  )
}

export default Work