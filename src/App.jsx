import React from 'react';

import arrow from "./images/icon-arrow.svg";
import "leaflet/dist/leaflet.css"
import background from "./images/pattern-bg-mobile.png";
import { MapContainer, TileLayer } from 'react-leaflet'
import { useState,useEffect } from "react";
import PositionMarker from "./PositionMarker";



//asdasdasdmn vsl;kwgkl;mgkl;smvb;skmghsdf;lkm

function App() {
      const [address, setAddress] = useState(null);
      const [ipAddress,setIpAddress] = useState("");
      const checkIpAddress =   /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
      const checkDomain =      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
      useEffect(()=>{
        try {
          const getInitialData=async()=>{
            const res = await fetch (`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=192.212.174.101`)
            const data = await res.json();
            setAddress(data);
          }
          getInitialData()
        } catch (error) {
          console.log(error);
        }
      },[]);

      async function getEnteredAddress (){
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&${
            checkIpAddress.test(ipAddress)
              ? `ipAddress=${ipAddress}`
              : checkDomain.test(ipAddress)
              ? `domain=${ipAddress}`
              : ""
          }`      )
          const data = await res.json();
          setAddress(data);
        }

      function handleSubmit(e){
        e.preventDefault()
        getEnteredAddress ();
      }

  return (
    <>
    <section>
        <div>
          <img src={background} className = "absolute -z-10 w-full h-80 object-cover" alt="background"/>
        </div>
        <article className="p-8">

            <h1 className="text-2xl text-center text-white lg:text-2xl font-bold mb-8">IP Address Tracker </h1>

            <form autoComplete = "off"onSubmit={handleSubmit} className="flex justify-center max-w-xl mx-auto" >

                <input type="text" className = "py-2 px-4 rounded-l-lg w-full" name="ipaddress" id="ipaddress" placeholder="Search for any IP address or domain" required value={ipAddress} onChange={(e)=>setIpAddress(e.target.value)}/>

                <button type="submit" className="bg-black py-4 px-4 hover:opacity-60 rounded-r-lg">
                  <img src={arrow} alt=""/>
                </button>
              
            </form>
        </article>

        {address && <>
          <article className=" bg-white text-center shadow mx-8 rounded-lg max-w-6xl p-8 sm:-mb-60 sm:-mt-3 md:text-left md:-mb-20 md:mt-1 lg:-mb-20 xl:mx-auto gap-8 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 " style={{zIndex:10000}}>
            <div className="lg:border-r lg:border-slate-400">
              <h2 className="text-sm font-bold text-slate-400 tracking-wider mb-3"> IP ADDRESS</h2>
              <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.ip}</p>
            </div>

            <div className="lg:border-r lg:border-slate-400">
              <h2 className="text-sm font-bold text-slate-400 tracking-wider mb-3"> LOCATION</h2>
              <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.location.region}, {address.location.country}</p>
            </div>

            <div className="lg:border-r lg:border-slate-400">
              <h2 className="text-sm font-bold text-slate-400 tracking-wider mb-3"> TIMEZONE</h2>
              <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">UTC{address.location.timezone}</p>
            </div>

            <div className="">
              <h2 className="text-sm font-bold text-slate-400 tracking-wider mb-3"> ISP</h2>
              <p className="font-semibold text-slate-900 text-lg md:text-xl xl:text-2xl">{address.isp}</p>
            </div>
        </article>


        <MapContainer center={[address.location.lat,address.location.lng]} zoom={13} scrollWheelZoom={true} style={{height:"800px", width:"100vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         <PositionMarker address={address} />
        </MapContainer>
        </>}


    </section>
    </>
  );
}

export default App;
