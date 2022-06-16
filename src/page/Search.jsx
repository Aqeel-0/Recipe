import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Search() {
    const param = useParams()
    const [dynamic_dish, setDynamic_dish] = useState([])
    useEffect(()=>{
        get_searched(param.search)
    }, [param.search])

    const get_searched = async(name)=>{
        const check = localStorage.getItem(name);
        if(check){
            setDynamic_dish(JSON.parse(check))
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
            const data = await api.json()
            if(!data){

            }
            setDynamic_dish(data.results)
            localStorage.setItem(name, JSON.stringify(data.results))
            console.log("stored!!!")
        } 
    }
    

    const item_array = dynamic_dish.map((item)=>{
        return(
            <Link to = {'/recipe/'+item.id}>
                <Card key ={item.title}>
                    <img src={item.image} alt={item.title}/>
                    <h4>{item.title}</h4>
                </Card>
            </Link>
        )
    })
    const error = (<h1>Error!! Not Found</h1>)
    return (
        <Grid>
            {dynamic_dish.length ? item_array : error}
        </Grid>
    )
}
const Grid = styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(14rem, 1fr));
    grid-gap:3rem;
    margin-top: 4rem;
`
const Card = styled.div`
    img{
        width:100%;
        border-radius:2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align:center;
        padding:1rem;
    }


`