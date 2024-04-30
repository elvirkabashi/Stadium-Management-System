import React, { useContext, useState } from 'react';
import './kits.css';
import ProductFilter from '../FilterKits/Products';
import {ShopContext, ShopContextProvider } from '../Context/shop-context';
import { PRODUCTS } from '../FilterKits/productsdata';
import MyNavbar from '../ShopNavbar/ShopN';
import SecondN from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Kits = () => {
//     const { cartItems } = useContext(ShopContext);


    return (
        <>
            
            <SecondN />
            <div className="events">
                <h2>SHOP</h2>
            </div>
            <div className="container">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="form span">
                            <i className="fa fa-search"></i>
                            <input type="text" className="form-control form-input" placeholder="Search anything..." />
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <MyNavbar />

            <hr />

            <div className='image-banner container-fluid'>
                <div className='container text-bannerr'>
                    <p className='heading-banner'>FOOTBALL KITS</p>
                    <p className='paragraph-banner'>Introducing the official kits worn by Kosova National Football Team players at the Santiago Bernabéu and around the world. For men, women and youth, personalise your shirt with your name or your favourite player´s name.</p>
                    <a href='#' className='read-link'>READ MORE</a>
                </div>
            </div>



            <div className="container">
                <ProductFilter products={PRODUCTS} />
            </div>

            
                 

        
        </>
    );
};

export default Kits;



































// import React from 'react'
// import './kits.css'
// import Cart from "../Cart/Cart"
// import ProductFilter from '../FilterKits/Products'
// import ShopContext from '../Context/shop-context'
// import { PRODUCTS } from '../FilterKits/productsdata'



// import MyNavbar from '../ShopNavbar/ShopN'
// import SecondN from '../Navbar/Navbar';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// export const Kits = () => {
//     return(
//         <>
//             <SecondN/>
//             <div className="events">
//                 <h2>SHOP</h2>
//             </div>
//             <div class="container">

//                 <div className="row height d-flex justify-content-center align-items-center">
//                     <div className="col-md-6">
//                         <div className="form span">
//                             <i className="fa fa-search"></i>
//                             <input type="text" className="form-control form-input" placeholder="Search anything..."/>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <hr />
//             <MyNavbar/>

//             <hr />

//             <div className='image-banner container-fluid'>
//                 <div className='container text-bannerr'>
//                     <p className='heading-banner'>FOOTBALL KITS</p>
//                     <p className='paragraph-banner'>Introducing the official kits worn by Kosova National Football Team players at the Santiago Bernabéu and around the world. For men, women and youth, personalise your shirt with your name or your favourite player´s name.</p>
//                     <a href='#' className='read-link'>READ MORE</a>
//                 </div>
//             </div>

//             <div className="container">

//                 {PRODUCTS.map((product) => (
//                 <ProductFilter data={product} key={product.id}/>
//             ))}
//             </div>
//         </>
//     )
// }

// export default Kits;