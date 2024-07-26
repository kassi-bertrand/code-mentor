"use client";

import { useEffect, useState } from "react";
import {GoHome} from 'react-icons/go';
import {FaPlus} from 'react-icons/fa';
import { GiKidSlide } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";



const VerticalNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div className = 'flex'>
            <div className={`mt-0 bg-[#8CC0D6] 
                fixed h-screen transition-all 
                duration-300 z-10 
                ${isOpen ? 'w-64' : 'w-0 overflow-hidden'
            }`}> 

            <div className = "w-full p-2 mt-12 px-4 ">


                <button className="hover:bg-[#FFFBFB] w-full py-4 rounded-[10px] bg-[#D9D9D9] font-inter">
                   
                <Link href="">
                    <span className ='text-xl font-bold text-black text-xl sm:text-base'>Create New</span>
                        <FaPlus className='inline-block mx-3'/> 
                    </Link>
                    
                </button>
            </div>

                <ul>
                    <li className = 'mb-2 p-4'>

                        <Link href ="/dashboard" className =''>
                            <div className = 'grid grid-flow-col justify-between'>
                                <div>
                                    <h2 className = 'font-semibold'>Home</h2>
                                </div>
                                <div>
                                    <GoHome className = 'justify-end w-6 h-6 mr-2'></GoHome>
                                </div>
                            </div>
                        </Link>
                        
                    </li>
                    <li className = 'mb-2 p-4'>

                        <Link href="" className =''>
                            <div className = 'grid grid-flow-col justify-between'>
                                <div>
                                <h2 className = 'font-semibold'>Playgrounds</h2>
                                </div>
                                <div>
                                    <GiKidSlide className = 'justify-end w-6 h-6 mr-2'></GiKidSlide>
                                </div>
                            </div>
                        </Link>
                        
                    </li>
                    <li className = 'mb-2 p-4'>

                        <Link href ="" className =''>
                            <div className = 'grid grid-flow-col justify-between'>
                                <div>
                                <h2 className = 'font-semibold'>Profile</h2>
                                </div>
                                <div>
                                    <CgProfile className = 'justify-end w-6 h-6 mr-2'></CgProfile>
                                </div>
                            </div>
                        </Link>
                        
                    </li>
                    <li className = 'mb-2 p-4'>

                        <Link href ="" className =''>
                            <div className = 'grid grid-flow-col justify-between'>
                                <div>
                                <h2 className = 'font-semibold'>Settings</h2>
                                </div>
                                <div>
                                    <IoSettingsOutline className = 'justify-end w-6 h-6 mr-2'></IoSettingsOutline>
                                </div>
                            </div>
                        </Link>
                        
                    </li>
                    <li className = 'mb-2 p-4'>

                        <Link href ="" className =''>
                            <div className = 'text-center'>
                                <div>
                                <h2 className = 'font-light'>Logout</h2>
                                </div>
                                
                            </div>
                        </Link>
                        
                    </li>
                </ul>

            </div>

    <div className={`flex-1 p-4 
                        ${isOpen ? 'ml-64' : 'ml-0'}`}>

        {/* Button to toggle sidebar */}
        <div className="ml-auto">
          <button
            className="bg-blue-500 bg-black 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}>
            {/* Toggle icon based on isOpen state */}
            {isOpen ? (

                <FaArrowLeft className = 'm-1.5'>
                </FaArrowLeft>
            ) : (
              <svg
                className="h-6 w-6"
                fill="black"
                viewBox="0 0 24 24"
                stroke="white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        </div>
        </div>
    )

}

export default VerticalNavBar;

