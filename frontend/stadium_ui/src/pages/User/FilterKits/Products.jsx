import React , {useState} from 'react'
// import {ShopContext} from '../Context/shop-context'
import { PRODUCTS } from './productsdata';
import { useContext } from 'react';
import axios from 'axios';


export const ProductFilter = (props) => {
  const {id, image, title, price, color, size, matchwear} = props.data ?? {};
//   const {addToCart, cartItems} = useContext(ShopContext);

//   const cartItemAmount = cartItems[id];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMatchWear, setSelectedMatchWear] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [filteredData, setFilteredData] = useState(PRODUCTS);


  const handleColorFilter = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    filterProducts(color, selectedSize,selectedMatchWear, selectedSortBy);
  };

  const handleSizeFilter = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
    filterProducts(selectedColor, size, selectedMatchWear, selectedSortBy);
  };

  const handleMatchWearFilter = (event) => {
  const matchwear = event.target.value;
  setSelectedMatchWear(matchwear);
  filterProducts(selectedColor, selectedSize , matchwear, selectedSortBy);
  }

  const handleSortByFilter = (event) => {
   const sortBy = event.target.value;
   setSelectedSortBy(sortBy);
   filterProducts(selectedColor, selectedSize, selectedMatchWear, sortBy);
  }



 const filterProducts = (color, size, matchwear, sortBy) => {
   let sortedProducts = [...PRODUCTS];
   if (sortBy === 'lowesthighest') {
     sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
   } else if (sortBy === 'highestlowest') {
     sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
   } else if (sortBy === 'atoz') {
     sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
   } else if (sortBy === 'ztoa') {
     sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
   }

   const filteredProducts = sortedProducts.filter((product) => {
     if (color === '' && size === '' && matchwear === '') {
       return true;
     }
     if (color === '') {
       return product.size.includes(size) && product.matchwear.includes(matchwear);
     }
     if (size === '') {
       return product.color === color && product.matchwear.includes(matchwear);
     }
     if (matchwear === '') {
       return product.color === color && product.size.includes(size);
     }
     return (
       product.color === color &&
       product.size.includes(size) &&
       product.matchwear.includes(matchwear)
     );
   });

     setFilteredData(filteredProducts)
  };

//   const handleBuyNow = (productId) => {
//     addToCart(productId);
//   };

  console.log(PRODUCTS);


return (
  <div>
    <div className='container filter-options'>
        <select class="btn btn-lg btn-outline-dark buton1" id="color-filter"
        value={selectedSize}
        onChange={handleSizeFilter}
        >
          <option value="">Size</option>
          <option value="XXL">XXL</option>
          <option value="XL">XL</option>
          <option value="L">L</option>
          <option value="M">M</option>
          <option value="S">S</option>
          <option value="XS">XS</option>
        </select>
        <select
          className="btn btn-lg btn-outline-dark buton2"
          id="color-filter"
          value={selectedColor}
          onChange={handleColorFilter}
        >
         <option value="">Color</option>
         <option value="red">Red</option>
         <option value="blue">Blue</option>
         <option value="black">Black</option>
        </select>
        <select class="btn btn-lg btn-outline-dark buton3" id="color-filter"
        value={selectedMatchWear}
        onChange={handleMatchWearFilter}
        >
         <option value="">Matchwear</option>
         <option value="GoalKeeper">GoalKeeper</option>
         <option value="Defender">Defender</option>
         <option value="Midfielder">Midfielder</option>
         <option value="Attacker">Attacker</option>
        </select>
        <select class="btn btn-lg btn-outline-dark buton4" id="color-filter"
        value={selectedSortBy}
        onChange={handleSortByFilter}
        >
         <option value="">Sort By</option>
         <option value="bestseller">Best Seller</option>
         <option value="lowesthighest">Lowest to Highest</option>
         <option value="highestlowest">Highest to Lowest</option>
         <option value="atoz">Alphabetically A-Z</option>
         <option value="ztoa">Alphabetically Z-A</option>
        </select>
    </div>

    <div className="container snap-scroll-container">
      <div className="row">
          {filteredData.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className={`d-inline-block mx-10 card card-style-${product.id}`}>
              <img className="snap-scroll-images" src={product.image} alt="Product" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.price}</p>
//                 <button className="btn btn-outline-light"> Buy Now </button>
              </div>
            </div>
          </div>
          ))}
        </div>
    </div>
    </div>


);
};

export default ProductFilter;
