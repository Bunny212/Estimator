import React from 'react'
import Logo from '../Assets/cycleWaalylogo.png'
import { useMediaQuery } from 'react-responsive';
// import Header from './Header';
import { useNavigate } from "react-router-dom";
import {  NavLink } from 'react-router-dom'





function Footer() {


    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the route without an ID
        navigate("/");
        // SetNavbar(false)
    };

    const logoutHandler = () => {
        localStorage.removeItem('token'); // Remove authentication token
        navigate('/signin'); // Redirect to login page
        // SetNavbar(false)
    };

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    return (
        <div>
            {   isMobile ? (
                   
     <div class="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-4">
    <div class="flex flex-col items-center">
    <NavLink className="text-sm font-semibold leading-6 text-gray-900"
         to="/ProductView"
                        > 
        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
        </svg>
        <span class="text-xs mt-1">E-List</span>
        </NavLink>

    </div>

    <div class="flex flex-col items-center">
        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
        </svg>
        <span class="text-xs mt-1" onClick={handleClick} >Invoice</span>
    </div>

    <div class="flex flex-col items-center">
        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
        </svg>
        <span class="text-xs mt-1" onClick={logoutHandler}>Logout</span>
    </div>
</div>
                ) : (

                    <div className="bottom-0 left-0 w-full">
                        <footer className="bg-white rounded-lg  dark:bg-gray-900 m-4 " >
                            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <span  className="flex items-center mb-4 sm:mb-0">
                                        <img src={Logo} className="h-8 mr-3" alt="Flowbite Logo" />
                                    </span>
                                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                        <li>
                                            About
                                        </li>
                                        <li>
                                            Privacy Policy
                                        </li>
                                        <li>
                                            Licensing
                                        </li>
                                        <li>
                                            Contact
                                        </li>
                                    </ul>
                                </div>
                                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span className="hover:underline">cyclewalay.com</span>. All Rights Reserved.</span>
                            </div>
                        </footer>
                    </div>
                )
            }



        </div>

    )
}

export default Footer