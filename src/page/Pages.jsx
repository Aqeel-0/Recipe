
import React from 'react'
import Home from './Home'
import {Route, Routes} from 'react-router-dom'
import Cuisine from './Cuisine'
import Search from './Search'
import Recipe from './Recipe'
const Pages = () => {
  return (
      
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cuisine/:country' element={<Cuisine/>} />
          <Route path='/search/:search' element={<Search/>}/>
          <Route path='/recipe/:name' element={<Recipe/>}/>
        </Routes>

        
  )
}

export default Pages