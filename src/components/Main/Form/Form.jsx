import React, {useState, useContext } from 'react'
import { TextField, Grid, Tooltip, IconButton, Button, FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@material-ui/core'
import { AddCircle, Cancel, Send } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid'
import formatDate from '../../../utils/formatDate'
import useStyles from './styles'

import { LearningTrackerContext } from '../../../context/context'
import { CategoryContext } from '../../../context/categoryContext'

const initialState = {
    type: '',
    category: '',
    content: '',
    url: '',
    duration: '',
    date: formatDate(new Date()),
    isFinished: false,
}

const Form = ({ formData, setFormData }) => {
    const classes = useStyles();

    const [newCategoryTitle, setNewCategoryTitle] = useState('');
    const { addCategory, deleteCategory, updateCategory, updateCategoryOnEdit, categories } = useContext(CategoryContext);

    const createCategory = () => {
        if (newCategoryTitle !== "" && newCategoryTitle.length < 50 && !alreadyExists(newCategoryTitle)) {
            const category = { title: newCategoryTitle, totalDuration: 0, totalFinishedDuration: 0, id: uuidv4() };
            addCategory(category);
            setNewCategoryTitle('');
        }
    }

    const alreadyExists = (categoryTitle) => {
        return categories.find((c) => c.title === categoryTitle) !== undefined;
    }
    
    //Form Actions
    const { addLearning, updateLearning } = useContext(LearningTrackerContext);
    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

    const handleInputChange = (e)=> {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const saveLearning = (e) => {
        e.preventDefault();
        
        if (validate()){
            if(formData.id){
                const updatedLearning = {
                    type: formData.type,
                    category: formData.category,
                    content: formData.content,
                    url: formData.url,
                    duration: Number(formData.duration),
                    date: formData.date,
                    isFinished: formData.isFinished,
                    id: formData.id
                }
                
                updateLearning(updatedLearning);
                updateCategoryOnEdit(updatedLearning);
                
            } else {
                const learning = { ...formData, duration: Number(formData.duration), id: uuidv4() };
                
                //updateCategory before addLearning to be able to check the condition
                //for distinguishing updateCategory upon adding or upon deleting the learning     
                updateCategory(learning); 
                addLearning(learning);  
            }
            
            resetForm();
        }
    }

    const resetForm = () => {
        setFormData(initialState);
        setErrors({})
    }

    //Form Validation
    const [errors, setErrors] = useState({});

    const validate = () => {
        let temp = { ...errors };
        temp.type = formData.type ? "" : "This field is required"
        temp.category = formData.category ? "" : "This field is required"
        temp.content = !formData.content ? "This field is required" 
                       : formData.content.length > 100 ? "Content overview can be max. 100 characters long" 
                       : ""
        temp.duration = formData.duration ? "" : "This field is required"
        setErrors({ ...temp });

        return Object.values(temp).every(x => x === "");
    }
    
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <FormControl fullWidth
                             {...(errors.type && {error:true, helperText:errors.type})}>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} onChange={handleInputChange}>
                        <MenuItem value="Media">Media (Passive learning)</MenuItem>
                        <MenuItem value="Project">Project (Active learning)</MenuItem>
                    </Select>
                    {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
                </FormControl>
            </Grid>
            
            <Grid item xs={7}>
                <FormControl fullWidth 
                             {...(errors.category && {error:true, helperText:errors.category})}>
                <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category} onChange={handleInputChange}>
                        {categories.length > 0
                            ? categories.map((c) => 
                                <MenuItem key={c.id} value={c.title}>
                                    <span>{c.title}</span> 
                                </MenuItem>) 
                            : <MenuItem value="">No Category Created Yet</MenuItem>
                        }
                    </Select>
                    {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
            </Grid>

            <Grid item xs={1}>
                {showNewCategoryForm ? 
                    <Tooltip title="Close" placement="top">
                        <IconButton edge="end" aria-label="closeForm" 
                                    className={classes.newCategoryFormButton}  
                                    onClick={() => setShowNewCategoryForm(prev => !prev)}>
                            <Cancel />
                        </IconButton>
                    </Tooltip>
                    : 
                    <Tooltip title="Create new category" placement="top">
                        <IconButton edge="end" aria-label="openForm" 
                                    className={classes.newCategoryFormButton} 
                                    onClick={() => setShowNewCategoryForm(prev => !prev)}>
                            <AddCircle />
                        </IconButton>
                    </Tooltip>
                }
            </Grid>

            {showNewCategoryForm && 
                <Grid container xs={12} spacing={1} style={{paddingLeft: '.3em'}}> 
                    <Grid item xs={11} style={{display: 'inline-block'}} >
                        <TextField type="text" fullWidth label="New Category" 
                                   value={newCategoryTitle} 
                                   onChange={(e) => setNewCategoryTitle(e.target.value)}
                            {...(newCategoryTitle === "" ? 
                                  {error:false, helperText:"Name your new category"} 
                                : newCategoryTitle.length > 50 ? 
                                  {error:true, helperText:"Category name can be max. 50 characters long"}
                                : alreadyExists(newCategoryTitle) && {error:true, helperText: "This category already exists."}
                                )
                            } 
                        />
                    </Grid>

                    <Grid item xs={1} style={{display: 'inline-block', paddingLeft: '.6em'}} >
                        <IconButton edge="end" aria-label="add" 
                                    className={classes.newCategoryFormButton}  
                                    onClick={createCategory}>
                            <Send />
                        </IconButton>
                    </Grid>
                </Grid>
            }

            <Grid item xs={12}>
                <TextField type="text" name="content" label="Content Overview" fullWidth 
                           value={formData.content} 
                           onChange={handleInputChange}
                    {...(errors.content && {error:true, helperText:errors.content})}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField type="text" name="url" label="URL" fullWidth 
                           value={formData.url} 
                           onChange={handleInputChange}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField type="number" name="duration" label="Duration (hours)" fullWidth 
                           inputProps={{ maxLength: 10, step: ".25", min: .25 }}
                           value={formData.duration} 
                           onChange={handleInputChange}
                    {...(errors.duration && {error:true, helperText:errors.duration})}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField type="date" name="date" label="Start Date" fullWidth 
                           value={formData.date} 
                           onChange={handleInputChange}
                />
            </Grid>
            
            <Button variant="contained" color="primary" fullWidth
                    className={classes.button}  
                    onClick={saveLearning}
            >
                Save
            </Button>
        </Grid>
    )
}

export default Form
