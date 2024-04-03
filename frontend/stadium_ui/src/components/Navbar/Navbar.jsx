import React, { useEffect, useState } from 'react';
import './navbar.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { MdOutlineStadium } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [active, setActive] = useState('navBar');

    const showNav = () => {
        setActive('navBar activeNavbar');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const removeNavbar = () => {
        setActive('navBar');
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        window.location.replace('/login');
    };

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1>
                            <MdOutlineStadium className="icon" /> Kosovo Stadium.
                        </h1>
                    </Link>
                </div>
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/eventet" className="navLink">
                                Eventet
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/stadiumi" className="navLink">
                                Stadiumi
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/tours" className="navLink">
                                Tours
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/fans" className="navLink">
                                Fans
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/tiketat" className="navLink">
                                Tiketat
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/shop" className="navLink">
                                Shop
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link to="/contact" className="navLink">
                                Kontakt
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <li className="navItem">
                                <button className="btn" onClick={handleLogout}>
                                    <span className="navLink">LOGOUT</span>
                                </button>
                            </li>
                        ) : (
                            <li className="navItem">
                                <button className="btn">
                                    <Link to="/login" className="navLink">
                                        LOGIN
                                    </Link>
                                </button>
                            </li>
                        )}
                        <li className="navItem">
                            <Link to="/login">
                                <AiOutlineSearch />
                            </Link>
                        </li>
                    </ul>
                    <div onClick={removeNavbar} className="closeNavBar">
                        <AiFillCloseCircle className="icon"/>
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavBar">
                    <TbGridDots className="icon" />
                </div>
            </header>
        </section>
    );
};

export default Navbar;
