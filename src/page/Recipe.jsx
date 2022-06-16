
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components"
export default function Recipe() {

  const param = useParams()
  const [details, setDetails] = useState({})
  const [isactive, setIsactive] = useState("")
  
  useEffect(()=>{
      get_items();
  }, [param.name])
  

  const get_items = async() =>{
      const api = await fetch(`https://api.spoonacular.com/recipes/${param.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
      const data = await api.json()
      setDetails(data)
  }
  console.log(details)

  return(
    <DetailsWrapper>
        <div>
          <h2 className="maxi">{details.title}</h2>
          <img src={details.image} alt={details.title}/>
        </div>
        <Info>
          <ButtonWrapper>
            <Button className={isactive == 'instruction' ? "active" : ""} onClick={() => setIsactive(() => 'instruction')}>Instructions</Button>
            <Button className={isactive == 'ingridients' ? "active" : ""} onClick={() => setIsactive(() => "ingridients")}>Ingridients</Button>
          </ButtonWrapper>
          
          {isactive === 'instruction' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
          </div>
        )}
        {isactive === 'ingridients' && (
          <ul>
            {details.extendedIngredients.map((items) =>(
              <li key ={items.id}>{items.original}</li>
            ))}
          </ul>
        )}
        </Info>
        
    </DetailsWrapper>
  )
}

const DetailsWrapper = styled.div`
  
  justify-content:space-around ;
  display:flex;
  width:66%;
  margin:5rem auto 5rem auto;
  align-items:flex-start;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color:white;
  }
  img{
    width:100% ;
  }
  h2{
    margin-bottom:2rem;
  }
  li{
    font-size:1.2rem;
    line-height: 2.5rem;
  } 
  ul{
    margin-top:2rem;
  }
  


`
const ButtonWrapper = styled.div`
  display:flex;

`
const Button = styled.button`
  padding:1rem 2rem;
  color:#313131;
  background:white;
  border:2px solid black;
  margin-top:2rem;
  font-weight:600;
  margin-right:1rem;
  font-size:14px;

`

const Info = styled.div`
  margin-left:15rem;
`