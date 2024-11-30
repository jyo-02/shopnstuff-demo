import React from 'react'

//styling component, all the other components are within this container 
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>
    {children}
    </div>; // return is in one line
  
}

export default Container