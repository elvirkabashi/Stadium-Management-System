// import React, { useContext, useState } from 'react'
// import { PRODUCTS } from '../FilterKits/productsdata';
// import { ShopContext } from '../Context/shop-context';
// import { CartItem } from './cart-item';
//
// const Cart = () => {
//
//     const { cartItems } = useContext(ShopContext);
//
//     return(
//         <div>
//             <div>
//                 <h1>Your Cart Items</h1>
//             </div>
//             <div>
//                 {PRODUCTS.map((product) => {
//                     if(cartItems[product.id] !== 0){
//                         return <CartItem data={product}/>
//                     }
//                 })}
//
//             </div>
//
//         </div>
//     );
// }
//
// export default Cart;