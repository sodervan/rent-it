import { useState } from 'react'


export default function FavouritesHeader({ count = 4 }) {


  return (
    <div className="   max-w-[1000px] w-[95%] mt-9 mx-auto">
 
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Your Favourites</h2>
        <p className="mt-1 text-sm text-gray-500">{count} Properties Saved</p>
      </div>

     
    </div>
  )
}