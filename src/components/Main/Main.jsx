import React, { useState } from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'
import Form from './Form/Form'
import List from './List/List'

import formatDate from '../../utils/formatDate'

const Main = () => {

    const initialState = {
        type: '',
        category: '',
        content: '',
        url: '',
        duration: '',
        date: formatDate(new Date()),
        isFinished: false,
    }

    const [formData, setFormData] = useState({...initialState});

    return (
        <Card>
            <CardHeader title="Learning Tracker" subheader="Personal App"/>
            
            <CardContent>
                <Typography align="center" variant="h5">Learning List</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    Organize your learning plans into activity types and topic categories. Then start tracking! 
                </Typography>

                <Divider style={{marginBottom: '15px'}} />
                
                <Form formData={formData} setFormData={setFormData} />
            </CardContent>
            
            <CardContent style={{paddingTop: '20px'}} >
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <List formData={formData} setFormData={setFormData} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
