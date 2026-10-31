import { arrow, arrow2, book,  book2,  cpu, cpu2,  lock, lock2, search, search2, users, users2 } from "@/utils/images/landing"
import Offer from "./ui/offer"
import Image from "next/image"

const Offers = () => {
  return (
    <div className='font-primary w-full md:px-10 lg:px-20 xl:px-50 flex justify-center items-center flex-col gap-12 py-20 shadow-[0_4px_10px_0_rgba(0,0,0,0.05)]'>
        <div className='font-primary flex flex-col items-center justify-center tracking-wide [word-spacing:4px] font-semibold leading-10 w-fit text-4xl'>
            <div>WHAT<strong className='text-dark-green'> DZ-KITAB</strong> can</div>
             <div>
                 offer to you ?
             </div>
        </div>
        <div className='flex flex-col gap-y-5 w-full'>
            <div className='flex-1 flex gap-x-7'>
                <Offer logo={[<Image className="h-10" key="cpu1" src={cpu2} alt="cpu" />,<Image className="h-10" key="cpu2" src={cpu} alt="cpu2" />]} title="Affordable Books" description="Buy second-hand books at lower prices and save money" ></Offer>
                <Offer logo={[<Image className="h-10" key="arrow1" src={arrow} alt="arrow" />,<Image className="h-10" key="arrow2" src={arrow2} alt="arrow2" />]} title="Easy Sellings" description="Sell your used books in just a few steps and give them a second life" ></Offer>
                <Offer logo={[<Image className="h-10" key="lock1" src={lock} alt="lock" />,<Image className="h-10" key="lock2" src={lock2} alt="lock2" />]} title="Secure Contact" description="Contact sellers safely through the platform without sharing personal information" ></Offer>    
                      
            </div>
            <div className=' flex-1 flex gap-x-5'>
            <Offer logo={[<Image className="h-10" key="search1" src={search} alt="search" />,<Image className="h-10" key="search2" src={search2} alt="search2" />]} title="Smart Search" description="Find books quickly by title, author, or ISBN" ></Offer>
            <Offer logo={[<Image className="h-10" key="users1" src={users} alt="users" />,<Image className="h-10" key="users2" src={users2} alt="users2" />]} title="Trusted Community" description="Discover a reliable sellers through rating and feedback from other users" ></Offer>
            <Offer logo={[<Image className="h-10" key="book1" src={book} alt="book" />,<Image className="h-10" key="book2" src={book2} alt="book2" />]} title="Knowledge for Everyone" description="Access a wide range of books--academic, technical, and novels--all in one place" ></Offer>
            </div>
        </div>
    </div>
  )
}

export default Offers