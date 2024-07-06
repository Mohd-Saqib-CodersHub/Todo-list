import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-[#39135e] text-white justify-between py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>iTask</span>
      </div>
     <ul className="flex gap-8 mx-9">
      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>About</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Contact us</li>
     </ul>
    </nav>
  )
}

export default Navbar
