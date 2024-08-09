"use client";

import { useState } from "react";
import {GoHome} from 'react-icons/go';
import {FaPlus} from 'react-icons/fa';
import { GiKidSlide } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";
import LanguageSelector from "../language-selector";
import LevelSelector from "../level-selector";
import { CODE_SNIPPETS } from "@/constants";

const VerticalNavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('Choose language');
    const[level, setLevel] = useState('Choose level');

    const onSelect = (language : string) => {
        setLanguage(language);
        setUrl(`/code/id/${language}`)
        // setValue(CODE_SNIPPETS[language])
    };
    
    const onChoose = (level : string) => {
        setLevel(level);
    }

    const[url, setUrl] = useState('/dashboard/')

    return(
        <div className = 'flex'>
            <div className={`mt-0 bg-[#8CC0D6] 
                fixed h-screen transition-all 
                duration-300 z-10 
                ${isOpen ? 'w-64' : 'w-0 overflow-hidden'
            }`}> 

            <div className = "w-full p-2 mt-12 px-4 ">


                <button className="hover:bg-[#FFFBFB] w-full py-4 rounded-[10px] bg-[#D9D9D9] font-inter" onClick = {() => setShowModal(true)}>
                   
                <Link href="">
                    <span className ='text-xl font-bold text-black text-base sm:text-xl'>Create New</span>
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
            className="bg-black
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

        <div className = "z-20">
            {showModal ? (
                <div className = "fixed inset-0 flex justify-center items-center bg-black/10">
                    <div className = "bg-white  flex flex-col place-content-center border-[0.5px] border-black rounded-[10px] w-[500px] h-[600px] md:w-3/4 md:h-3/4 ">
                        <div className = "basis-2/12 px-6 py-8 grid grid-flow-col justify-start">
                            <h3 className = "text-xl font-bold md:text-3xl"> Create New Playground </h3>
                            <SlPencil className = "w-6 h-6 mx-2 md:w-8 h-8 "/>
                        </div>
                        <div className = "basis-2/12 md:grid md:grid-flow-col">
                            <div className = "px-6 w-[500px] md:w-auto mb-2 md:mb-0">
                                <LanguageSelector language = {language} onSelect = {onSelect}/>
                            </div>
                            <div className = "px-6 w-[500px] md:w-auto mt-2 md:mt-0">
                                <LevelSelector level = {level} onChoose = {onChoose}/>
                            </div>
                        </div>
                        <div className = "basis-6/12 px-6">
                            <textarea placeholder ="What topics would you like to learn today?" className ="resize-none overflow-y-auto overflow-x-hidden w-full h-full bg-[#D9D9D9] p-3">
                            </textarea>
                        </div>
                        <div className = "basis-2/12 px-6 py-8 grid grid-flow-col gap-4">
                            <button className ="bg-black text-white px-4 py-2" onClick = {() => setShowModal(false)}>
                            Cancel
                            </button>
                            <button className = "bg-[#8CC0D6] px-4 py-2">
                                <Link href = {url}>
                                    Generate 
                                </Link>
                            </button>
                        </div>
                    </div> 
                </div>
                
            ):
                null
            }
            
        </div>
        </div>
    )

}

export default VerticalNavBar;