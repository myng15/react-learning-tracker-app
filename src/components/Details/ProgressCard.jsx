import React from 'react'
import { Box, Slide, List as ListItem, Grid, LinearProgress, Typography } from '@material-ui/core'

const ProgressCard = ({header, subheader, total, totalFinished}) => {
  
    return (
      <Slide direction="down" in mountOnEnter unmountOnExit>
        <ListItem style={{paddingBottom: '15px', marginLeft: '10px'}}>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h5">
                {header === 'PROGRESS BY CATEGORY' &&
                  <Typography variant="h6">{subheader}</Typography>
                }
              </Typography>
            
              <Typography color="textPrimary" variant="h4">
                  {total > 0 &&
                      `${(totalFinished / total * 100).toFixed(1)}%`
                  }
              </Typography>
            </Grid>
          </Grid>

          {total > 0 &&
              <Box sx={{ pt: 2 }}>
                <LinearProgress
                    style={{maxWidth: '90%'}}
                    value={totalFinished / total * 100}
                    variant="determinate"
                />
              </Box>
          }
        </ListItem>
      </Slide>)
    };
  
  export default ProgressCard;