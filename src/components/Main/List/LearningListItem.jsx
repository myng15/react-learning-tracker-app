import React, { useContext } from 'react'
import { List as ListItem, ListItemAvatar, ListItemText, Grid, 
         Avatar, ListItemSecondaryAction, Tooltip, IconButton, Slide } from '@material-ui/core'
import { Delete, AddToQueue, CheckCircle, CheckCircleOutline, Edit, Launch } from '@material-ui/icons'

import useStyles from './styles'
import { LearningTrackerContext } from '../../../context/context'
import { CategoryContext } from '../../../context/categoryContext'

const LearningListItem = ({ learning, setFormData }) => {
    const classes = useStyles();
    const { deleteLearning, finishLearning } = useContext(LearningTrackerContext);
    const { updateCategory, updateCategoryOnFinish } = useContext(CategoryContext);

    const handleFinishLearning = (learning) => {
        finishLearning(learning.id);
        updateCategoryOnFinish(learning);
    }

    const handleDeleteLearning = (learning) => {
        updateCategory(learning);
        deleteLearning(learning.id);
    }

    return (
            <Slide direction="down" in mountOnEnter unmountOnExit>
                <ListItem>
                    <Grid item xs={8}>
                        <ListItemAvatar>
                            <Tooltip title={learning.type === "Media" ? "Media" : "Project"} placement="top">
                                <Avatar className={learning.type === "Media" ? classes.avatarMedia : classes.avatarProject}>
                                    <AddToQueue />
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText primary={learning.content} 
                                      secondary={`${learning.duration} hour(s) - ${learning.date}`}
                                      style={{textDecoration: learning.isFinished ? 'line-through' : 'none'}}>
                        </ListItemText>
                    </Grid>

                    <Grid item xs={3}>
                        
                        <ListItemSecondaryAction>
                            <a href={learning.url} target="_blank" rel="noreferrer">
                                <Tooltip title="Open URL" placement="top">
                                    <IconButton edge="end" aria-label="edit" size="small" color="primary">
                                        <Launch />
                                    </IconButton>
                                </Tooltip>
                            </a>
                            <Tooltip title="Edit" placement="top">
                                <IconButton edge="end" aria-label="edit" onClick={() => setFormData({...learning})}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            {learning.isFinished ?
                                <Tooltip title="Bring back to plan" placement="top">
                                    <IconButton edge="end" aria-label="finish" onClick={() => handleFinishLearning(learning)}>
                                        <CheckCircle />
                                    </IconButton>
                                </Tooltip>
                                : 
                                <Tooltip title="Mark as completed" placement="top">
                                    <IconButton edge="end" aria-label="unfinish" onClick={() => handleFinishLearning(learning)}>
                                        <CheckCircleOutline />
                                    </IconButton>
                                </Tooltip>
                            }     

                            <Tooltip title="Delete" placement="top">
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLearning(learning)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </Grid>
                </ListItem>                                  
            </Slide>
    )
}

export default LearningListItem;