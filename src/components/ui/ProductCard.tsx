import React from 'react';
import type { CartItemType } from '../../features/user/cart/types';
import { useCart } from '../../context/CartContext';
import PrimaryBtn from './PrimaryBtn';


interface ProductCardProps {
  product: CartItemType;
}

const ProductCard: React.FC<ProductCardProps> = ({product }) => {
  const { addItem, incrementQuantity, decrementQuantity, isInCart, items } = useCart();
  
  const cartItem = items.find((item:CartItemType) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrement = () => {
    incrementQuantity(product.id);
  };

  const handleDecrement = () => {
    decrementQuantity(product.id);
  };
  
  return (
    <div className="group  relative h-[200px] md:h-57.5 pb-4 w-full  overflow-hidden rounded-2xl  shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Product Image with Overlay */}
      <div className="relative h-[60%] w-full rounded-md  flex mx-auto   overflow-hidden ">
        <img 
           src={product.imageUrl}
          alt={product.name}
          className=" flex mx-auto   object-cover transition-transform duration-500 group-hover:scale-110"
        />
          </div>
      {/* Product Info */}
      <div className="px-6 ">
        <div className="">
          <div className="flex items-start flex-col">
            <h3 className="text-md pt-1 font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <div className='flex w-full mt-0 text-xs justify-between'>
              <p>
              time:{product.duration}Min
             </p>
               <p >
              Rs: <span className='font-semibold  text-xs'>{product.price}</span>
            </p>           
            </div>
          </div> 
        </div>
        {/* Add to Cart / Quantity Controls */}
        <div className="">
          {!isInCart(product.id) ? (
            <PrimaryBtn  onClick={handleAddToCart}>
               add to cart
            </PrimaryBtn>
          ) : (
            <div className="flex items-center justify-between shadow-inner">
              <button
                onClick={handleDecrement}
                className="flex h-5 items-center justify-center rounded-full  text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg active:scale-95"
                aria-label="Decrease quantity"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-md font-normal text-gray-900">{quantity}</span>
              </div>
              <button
                onClick={handleIncrement}
                className="flex h-5 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-lg active:scale-95"
                aria-label="Increase quantity"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;