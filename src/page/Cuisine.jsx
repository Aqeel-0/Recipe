import { useState, useEffect } from 'react'
import { useParams, Link} from 'react-router-dom'
import styled from 'styled-components'
export default function Cuisine() {

    const [cuisine, setCuisine] = useState([])
    let param = useParams()
    const get_cuisine = async(name)=>{
        const check = localStorage.getItem(name);
        if(check){
            setCuisine(JSON.parse(check))
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
            const data = await api.json()
            setCuisine(data.results)
            localStorage.setItem(name, JSON.stringify(data.results))
            console.log("stored!!!")
        }
        
        
    }
    useEffect(()=>{
        get_cuisine(param.country)
    }, [param.country])


  return (
    <Grid>
        {cuisine.map((item)=>{
            return(
                <Link to={'/recipe/'+item.id} key ={item.title}>
                    <Card>
                    <img src={item.image} alt={item.title}/>
                    <h4>{item.title}</h4>
                    </Card>
                </Link>
            )
        })}
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
