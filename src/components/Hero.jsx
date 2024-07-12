import React, { useState } from 'react'
import Left from './Left'
import Right from './Right'

export default function Hero({searchKey,id,setId,showRightNav,setShowRightNav,setNumber,number}) {
  const [clickedOne,setClickedOne] = useState(-1)
  const [hoveredOne,setHoveredOne] = useState()
  const [listId,setListId] = useState(new Set([]))
  return (
    <div className=' h-[90%] my-auto items-center justify-center flex gap-10 '>
        <Left listId={listId} setListId={setListId} setClickedOne={setClickedOne} hoveredOne={hoveredOne} setHoveredOne={setHoveredOne} number={number} setNumber={setNumber} setShowRightNav={setShowRightNav} setId={setId} searchKey={searchKey} />
        <Right listId={listId} setListId={setListId} setShowRightNav={setShowRightNav} hoveredOne={hoveredOne} setHoveredOne={setHoveredOne} clickedOne={clickedOne} setClickedOne={setClickedOne} setId={setId} showRightNav={showRightNav} id={id} />
    </div>
  )
}
