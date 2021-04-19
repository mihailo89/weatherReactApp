import React, { useState } from 'react'

import { ImSearch } from "react-icons/im";
import './Header.css';


function Header(props) {

    const city = props.weather.timezone;

    const [searchBox, setSearchBox] = useState(false);
    const [query , setQuery] = useState('');

    /*style={{display: (searchBox) ? 'block' : 'none' }} */

    
    return (
        <>
            <div className="header">
                <header>
                    {city.split('/')[1]}
                    <div>{props.dateBuilder('full')}</div>
                </header>
                <div className="header__icon">
                    <ImSearch onClick={()=>{setSearchBox(true)}}/>
                </div>
            </div>
            
            <div className= "search-box"  style={{display: (searchBox) ? 'block' : 'none' }}>
                <button onClick={()=>{setSearchBox(false)}} className="btn btn-close">&times;</button>
                <div>
                    <input onChange={e=>{ setQuery(e.target.value) }} type="text" placeholder="Search your place" style={{flexBasis: '80%'}}/>
                    <button onClick={(e)=>{ props.searchPlace(query) }}  className="btn btn-primary" style={{flexBasis: '20%'}}>Search</button>
                </div>
                
            </div>
        </>
    )
}

export default Header;
