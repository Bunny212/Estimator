import React, { useState } from 'react'
import {  NavLink } from 'react-router-dom'
import Logo from '../Assets/cycleWaalylogo.png'
// import { useMediaQuery } from 'react-responsive';
import { useNavigate } from "react-router-dom";
// import { useApolloClient } from '@apollo/client';


function Header() {
    // const client = useApolloClient(); 
    const [Navbar, SetNavbar] = useState(false)
    const navigate = useNavigate();
    const handleClick = () => {
        // Navigate to the route without an ID
        navigate("/");
        SetNavbar(false)
    };

    const logoutHandler = () => {
        localStorage.removeItem('token'); // Remove authentication token
        navigate('/signin'); // Redirect to login page
        // client.resetStore(); 
        SetNavbar(false)
    };


    return (
        <div className=' p-1 my-0 '>
            <span  className="sm:hidden">
                {/* <span className="sr-only">Your Company</span> */}
                <img className="h-8 w-auto mx-auto " src={Logo} alt="" />
            </span>

            <header className="bg-dark  shadow-md hidden sm:block ">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <span className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src={Logo} alt="" />
                        </span>
                    </div>
                    <div className="flex lg:hidden" onClick={() => SetNavbar(!Navbar)}>
                        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        <NavLink className="text-sm font-semibold leading-6 text-gray-900 p-2 shadow-md"
                            to="/ProductView"
                        > Invoice Estimator List
                        </NavLink>

                        <button onClick={handleClick} className='p-2 shadow-md'>Invoice Estimator </button>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        
                        <button onClick={logoutHandler}>Logout</button>

                    </div>
                </nav>
                {
                    Navbar ?
                        <div className="lg:hidden" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 z-10"></div>
                            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <span className="-m-1.5 p-1.5">
                                        <span className="sr-only">Your Company</span>
                                        <img className="h-8 w-auto" src={Logo} alt="" />
                                    </span>
                                    <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => SetNavbar(!Navbar)} >
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <div className="-mx-3">
                                                {/* <button type="button" className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" aria-controls="disclosure-1" aria-expanded="false">
                        Product
                        <svg className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button> */}

                                                <div className="mt-2 space-y-2" id="disclosure-1">
                                                    {/* <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Analytics</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Engagement</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Security</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Integrations</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Automations</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Watch demo</a>
                        <a href="#" className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact sales</a> */}
                                                    {/* <NavLink className="text-sm font-semibold leading-6 text-gray-900"
                                                    onClick={() => SetNavbar(false)}    to="/"
                                                    >
                                                        Invoice Estimator
                                                    </NavLink>

                                                    <NavLink
                                                        to="/CreateInvoice"
                                                        className="text-sm font-semibold leading-6 text-gray-900"
                                                        onClick={() => SetNavbar(false)}
                                                                                                            >
                                                        Invoice Estimator List
                                                    </NavLink> */}

                                                    <div className=" lg:flex lg:gap-x-12">
                                                        <NavLink className="text-sm font-semibold leading-6 text-gray-900"
                                                            to="/ProductView"
                                                            onClick={() => SetNavbar(false)}
                                                        > Invoice Estimator
                                                        </NavLink>
                                                        <br />
                                                        <button onClick={handleClick}>Invoice Estimator List</button>
                                                    </div>
                                                    <div className=" lg:flex lg:flex-1 lg:justify-end">
                                                        <button onClick={logoutHandler}>Logout</button>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6">
                                            {/* <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : ''}
            </header>
        </div>
    )
}

export default Header