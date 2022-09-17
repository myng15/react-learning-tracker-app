import React, { useContext } from 'react'
import { Card, Typography, List as ProgressList } from '@material-ui/core'
import useLearnings from '../../useLearnings'
import { CategoryContext } from '../../context/categoryContext';
import ProgressCard from './ProgressCard'
import useStyles from './styles' 

const LearningProgress = ({header}) => {
  const classes = useStyles();

  const { totalDuration, totalFinishedDuration } = useLearnings();
  const { categories } = useContext(CategoryContext);
  
  return (
    <Card style={{ padding: '1em 1em 1em 1.5em' }}>
      <Typography color="textSecondary" variant="h6" >
          {header}
      </Typography>

      {header === 'GENERAL PROGRESS' &&
          <ProgressCard header={header} 
                        total={totalDuration} totalFinished={totalFinishedDuration} />
      }

      {header === 'PROGRESS BY CATEGORY' &&
        <ProgressList dense={false} className={classes.progressList}>
          {categories.map((c) =>(
              <ProgressCard header={header} subheader={c.title} 
                            total={c.totalDuration} totalFinished={c.totalFinishedDuration} />
          ))}  
        </ProgressList>
      }
    </Card>
  )
};

export default LearningProgress;
  