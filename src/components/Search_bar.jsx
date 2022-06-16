import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'


export default function Search_bar() {
    const [s_value, setS_value] = useState("")
    const navigate = useNavigate()
    function submit_form(event){
        event.preventDefault()
        navigate('/search/'+s_value)
    }
    
    return (
        
        <FormStyle onSubmit={submit_form}>
            <FaSearch></FaSearch>
            <input onChange={(e)=>setS_value(e.target.value)} type='text' value={s_value}></input> 
            
        </FormStyle>  
        
    )
}

const FormStyle = styled.form`
    margin:0rem, 20rem;
    position: relative;
    width:50%;
    margin: 2rem auto 0 auto;
    
    input{
        border:none;
        background: linear-gradient(35deg, #494949, #313131);
        color:white;
        padding:1rem 3rem;
        border-radius:1rem;
        outline:none;
        width:100%;
        font-size:17px;

    }
    svg{
        position: absolute;
        top:50%;
        left:0%;
        transform: translate(100%, -50%);
        color:white;
    }

`

