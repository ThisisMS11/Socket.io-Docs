import React, { useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import documentContext from '../context/documents/documentContext';
import Card from '../LandingPage/CardMain';
import Navbar from '../Navbar';
import Spinner from '../Utility_Components/Spinner';

const UserblogCards = () => {

    const docContext = useContext(documentContext);
    let { usercards, GetUserCards, giveid, loading } = docContext;

    useEffect(() => {
        GetUserCards(localStorage.getItem('token'));
    }, [])

    return (
        <div>
            {loading && <Spinner />}
            <Navbar dissavedocument='none' />
            <Grid container spacing={2} sx={{ padding: '15px 0px' }}>
                {usercards.map((e, index) => {
                    return (<Grid item xl={3} xs={12} md={6} lg={4} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around' }} key={index}>
                        <Card title={e.title} description={e.description}
                            thumbnailurl={giveid(e.thumbnailurl)}
                            tag={e.tag} />
                    </Grid>)
                })}
            </Grid>
        </div>
    )
}

export default UserblogCards
