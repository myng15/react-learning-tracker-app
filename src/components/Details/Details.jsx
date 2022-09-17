import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import useLearnings from '../../useLearnings'

import useStyles from './styles'
import LearningProgress from './LearningProgress'

const Details = ({ title, subheader }) => {
    const classes = useStyles();
    
    const { totalDuration, chartDataCategories, chartDataTypes } = useLearnings();
   
    return (
        <Card className={title === 'Time'? classes.time : classes.progress}>
            <CardHeader title={title} subheader={subheader}/>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    Total learning time required: {totalDuration} hour(s)
                </Typography>
                
                {title === 'Time' && 
                    <Card className={classes.chartsCard}>
                        <CardContent >
                            <Typography variant="h6" color="textSecondary">
                                LEARNING TIME BY TYPE (hours)
                            </Typography>
                            <div className={classes.doughnut}>
                                <Doughnut data={chartDataTypes}/>
                            </div>
                        </CardContent>
                        <CardContent> 
                            <Typography variant="h6" color="textSecondary">
                                LEARNING TIME BY CATEGORY (hours)
                            </Typography>
                            <div className={classes.doughnut}>
                                <Doughnut data={chartDataCategories}/>
                            </div>
                        </CardContent>
                    </Card>
                }

                {title === 'Progress' && 
                    <CardContent style={{padding: 0}}>
                        <CardContent style={{padding: '0 0 15px 0'}}>
                            <LearningProgress header="GENERAL PROGRESS" />
                        </CardContent>
                    
                        <CardContent style={{padding: 0}}>
                            <LearningProgress header="PROGRESS BY CATEGORY"/>
                        </CardContent>
                    </CardContent>
                }
                
            </CardContent>
        </Card>
    )
}

export default Details
