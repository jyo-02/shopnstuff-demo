import { IoBagOutline } from 'react-icons/io5';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShoppingBag() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); 

  const cartHandler = () => {
    navigate('/cart')

  };
  return (
    <button className=' px-6 py-2 duration-200 text-black hover:underline rounded-full flex items-center' onClick={cartHandler}
>
      <div className='flex items-center'>
        <IoBagOutline className='mr-2' /> {/* Add margin to the right for spacing */}
        Shopping bag ({itemCount})
      </div>
    </button>
  );
}

export default ShoppingBag