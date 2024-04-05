import React from 'react'

function DestSelect({setDestination}) {
  return (
    <div className='absolute top-24 shadow-xl bg-white shadow-gray-500 border border-gray-200 rounded-2xl p-6'>
      <div className='pb-3 pt-1 font-bold'>
        <h1>Select by region</h1>
      </div>
      <div className='grid grid-cols-3 grid-rows-2 gap-1'>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('f')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/flexible.jpg" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            I'm flexible
          </h1>
        </div>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('sa')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/southEastAsia.webp" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            Southeast Asia
          </h1>
        </div>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('t')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/Thiland.webp" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            Thailand
          </h1>
        </div>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('e')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/Europe.webp" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            Europe
          </h1>
        </div>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('uk')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/UK.webp" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            United Kingdom
          </h1>
        </div>
        <div className='w-auto h-auto text-sm hover:bg-gray-200 rounded-xl p-2' onClick={() => setDestination('me')}>
          <div className='h-28 w-28 border border-gray-300 rounded-xl overflow-hidden'>
            <img className='h-full w-full object-contain' src="https://virbnb-server.vercel.app/dest/middleEast.webp" alt="" />
          </div>
          <h1 className='ml-1 mt-2'>
            Middle East
          </h1>
        </div>
      </div>
    </div>
  )
}

export default DestSelect
