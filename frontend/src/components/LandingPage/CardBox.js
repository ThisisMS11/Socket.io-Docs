import React, { useEffect, useLayoutEffect, useContext } from 'react'
import Card from './CardMain';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import documentContext from '../context/documents/documentContext.js';
import Navbar from '../Navbar';

const CardBox = () => {

    const docContext = useContext(documentContext);
    let { GetAllCards, allcards, giveid } = docContext;


    const navigate = useNavigate();

    useLayoutEffect(() => {
        let token = localStorage.getItem('token');
        // console.log('token inside cardbox = ', token);

        if (!token) {
            // console.log('token at cardbox ' + token );

            navigate('/login');
        }
    }, [])

    useEffect(() => {
        GetAllCards();
    }, [])

    const showmethecards=()=>{
        console.log('All the cards are listed below : ',allcards);
    }



    let styleitem = {
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'
    }

    // for unique cards photos for now
    const categories = ['technology', 'web-development', 'android-development', 'city', 'market', 'love', 'building', 'stockmarket']
    return (

        <>
            <Navbar dissavedocument={'none'}/>
            <Grid container spacing={2} sx={{ padding: '15px 0px' }}>
                {/* iterating the cards here */}

                {allcards.map((e, index) => {
                    return (<Grid item xl={3} xs={12} md={6} lg={4} sx={styleitem} key={index}>
                        <Card title={e.title} description={e.description}
                        thumbnailurl={giveid(e.thumbnailurl)}
                        tag={e.tag} blogid={e.blogID}/>
                    </Grid>)
                })}


            </Grid >

            <button onClick={showmethecards}>click me to get cards</button>
        </>

    )
}

export default CardBox