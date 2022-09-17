import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'

import Main from './components/Main/Main'
import Details from './components/Details/Details'
import useStyles from './styles'

const App = () => {
    const classes = useStyles();
    
    useEffect(() => {
        document.title = "Learning Tracker";
      }, []);

    return (
        <div>
            <Grid container spacing={1} alignItems="center" justify="center" className={classes.grid} >
                
                <Grid item xl={4} lg={4} md={4} sm={10} xs={12} className={classes.main} >
                    <Main />
                </Grid>
                
                <Grid item xl={6} lg={6} md={7} sm={10} xs={11} >
                    <Grid item className={classes.time}>
                        <Details title="Time" subheader="Track the learning time you need to plan"/>
                    </Grid>

                    <Grid item className={classes.progress}>
                        <Details title="Progress" subheader="Cross completed learnings off your list and see your progress"/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default App
