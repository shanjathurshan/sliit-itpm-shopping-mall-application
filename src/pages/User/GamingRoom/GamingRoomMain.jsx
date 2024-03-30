import React from 'react'
import GamingRoomBanner from './GamingRoomBanner'
import GamingRooms from './GamingRooms'
import GamingRoomPopupCard from './GamingRoomPopupCard'

const GamingRoomMain = () => {
  return (
    <div className='bg-black min-h-screen pt-10'>
        <GamingRoomBanner />
        <GamingRooms />

        

    </div>
  )
}

export default GamingRoomMain