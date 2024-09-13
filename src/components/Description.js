import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

export const Description = () => {
  const {id}=useParams();
  const [item,setitem]=useState()
  const fetch=async()=>{
    const res=await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=fc2869291838e67a65110bf2481ae1ce&hash=58a3bde180d6f93f57f05cc741050783&limit=20&offset=1`)
    setitem(res.data.data.results[0])
  }
  fetch();
  return (
    <>
    {
 (!item)?"":(
  <div className='box-content'>
    <div className='left-box'>
        <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt=''/>
    </div>
    <div className='right-box'>
        <h1>{item.name}</h1>
        <h3>{(!item.description)?`No description`:(item.description)}</h3>
    </div>
  </div>

)
    }
     
    </>
  )
}
