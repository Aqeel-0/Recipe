/* eslint-disable */
import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
//https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`

export default function Veggie(){
    const [veggies, setVeggie] = useState([]);
    useEffect(()=>{
        getveggie();
    }, []);
    
    const getveggie = async()=>{
        const check = localStorage.getItem("veggie");
        if(check){
            setVeggie(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes);
        }
    };
    
    return(
        <Wrapper>
            <h3>Vegetarian pics</h3>
            <Splide options={{
                perPage:4,
                arrows: false,
                pagination: false,
                drag:'free',
                gap: '0rem',
            }}>
                {
                    veggies.map((recipe) => {
                        return(
                          <SplideSlide key = {recipe.title}> 
                          <Link to={'/recipe/'+recipe.id}>   
                                <Card>
                                    <Gradient>
                                    <p>{recipe.title}</p>
                                    <img src= {recipe.image} alt={recipe.title} />  
                                    </Gradient>
                                </Card>  
                            </Link>
                         
                  </SplideSlide>      
                        )
                    })
                }
            </Splide>
        </Wrapper>
    )

    
}


const Wrapper = styled.div`
    width: 100%;
    margin: 3rem 0 3rem 0;
    

`

const Card = styled.div`
    height: 13rem;
    width: 18rem;
    border-radius:1rem;
    overflow:hidden;
    position:relative;
    
    
    img{
        width: 100%;
        height:100%;
        position:absolute ;
        opacity: 0.8;
    }

    p{
        position: absolute;
        z-index: 10;
        left:50%;
        bottom: -10%;
        transform:translate(-50%, 0%);
        color:white;
        width:100%;
        text-align:center;
        font-weight:600;
        font-size:1rem;
        height:40%;
        display:flex;
        justify-content:center;
    } 
`
const Gradient = styled.div`
    z-index:4;
    position: absolute;
    width:100%;
    height:100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))
`
