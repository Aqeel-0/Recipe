import React from "react";
import Pages from './page/Pages'
import Category from "./components/Categories";
import {HashRouter} from 'react-router-dom'
import Search_bar from "./components/Search_bar";
import './index.css'
const App = ()=>{
    return(
        <div className="App">
            <HashRouter>
                <Search_bar/>
                <Category/>
                <Pages/>
            </HashRouter>
        </div>
    )
}
export default App
