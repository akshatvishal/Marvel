import React, { useDebugValue, useEffect, useState } from 'react'
import { Card } from './card'
import axios from "axios"
import LOTTIE from "lottie-react"
import Loadings from "./loading.json"
import Loadingvideo from "../components/Loadingvideo.mp4"

export const Main = () => {
  const[url,seturl]=useState("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=fc2869291838e67a65110bf2481ae1ce&hash=58a3bde180d6f93f57f05cc741050783&limit=20&offset=0");
  const [item,setitem]=useState([]);
  const [search,setSearch]=useState("");
  const [Loading,setloading]=useState(false)
  const [offset,setoffset]=useState(0)
  useEffect(()=>{ 
    const fetch=async()=>{
      setloading(true)
      try{
        const res=await axios.get(url)
        console.log(res.data.data.results);
        setitem(res.data.data.results)
      }catch(error){
        console.error('error fetching data')
      }finally{
        setloading(false);
      }
    }
    fetch()
  },[url])
  const pagenext = () => {
    setoffset(prevOffset => prevOffset + 20);
  }
  
  const pageback = () => {
    if (offset > 0) {
      setoffset(prevOffset => prevOffset - 20);
    }
  }
  useEffect(()=>{
    seturl(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=fc2869291838e67a65110bf2481ae1ce&hash=58a3bde180d6f93f57f05cc741050783&limit=20&offset=${offset}`);
  },[offset]);

  const searchMarvel=()=>{
    seturl(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=fc2869291838e67a65110bf2481ae1ce&hash=58a3bde180d6f93f57f05cc741050783&limit=20&offset=0`)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setloading(true)
      searchMarvel();
      setloading(false)
    }
  }

  return (
    <>
    <div className="header">
    <div className="bg">
        <h1>Marvel Super Hero </h1>
        <h1> Information Booklet</h1>
    </div>
    <div className="search-bar">
        <img src="./Images/Marvellogo.png" alt="logo" />
        <input type="search" placeholder='Search Here' className='search' onChange={e=>setSearch(e.target.value)}onKeyDown={handleKeyDown}/>
        </div>
    </div>
    <div className='content'>
    {Loading ? (
      <div className='loadingscreen' style={{width:"500px"}}>
          <video src={Loadingvideo} class="my-video" autoPlay loop/>
          <LOTTIE animationData={Loadings}/>
      </div>
         // Show loading indicator when loading state is true
        ) : item.length === 0 ? (
          <p>No results found</p>
        ) : (
          <Card data={item} />)}
    </div>
    <div className='buttons'>
    <button className='Button next' onClick={pagenext}>Next</button>
    <button className='Button back' onClick={pageback}>Back</button>
    </div>
    
    </>
  )
}
