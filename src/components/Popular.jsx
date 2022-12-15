import React from 'react'
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    },[])

    const getPopular = async () => {
        //check to see if the is recipe in local storage
        //if there is then save it so we do not max out api key
        const check = localStorage.getItem('popular');
        //check local storage for key: value
        if(check){
            setPopular(JSON.parse(check));
        }else{
            //get api key and value if no value exists in local storage
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data.recipes)
        }

        
    }

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                {/* slide options  */}
                <Splide options={{
                    perPage:4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem"
                }}>
                    {/* map will loop through each recipe 
                        and display the title and image */}
                    {popular.map((recipe) =>{
                        return(
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Card>
                            </SplideSlide>
                            )
                        })}
                </Splide>
            </Wrapper>
        </div>
    )
}

{/* styled css jsx */}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`
const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index:1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0.5));
`
export default Popular;