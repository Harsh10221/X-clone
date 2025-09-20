import React from 'react'
import TabBar from '../../../components/TabBar'
import PostFeed from './PostFeed'

function HomeCenter() {
  return (
   
       <div className="w-2/5 overflow-y-auto scrollbar-hide ">
          <TabBar />
          <div className="h-28 w-full border-b border-[#414141]"></div>
          <PostFeed />
        </div>
    
  )
}

export default HomeCenter
