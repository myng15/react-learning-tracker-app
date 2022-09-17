import React, { useContext } from 'react'
import { List as LearningList, ListSubheader, Divider, ListItemSecondaryAction, Tooltip, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import LearningListItem from './LearningListItem'
import useStyles from './styles'

import { LearningTrackerContext } from '../../../context/context'
import { CategoryContext } from '../../../context/categoryContext'

const List = ({ formData, setFormData }) => {
    const classes = useStyles();

    const { learnings, deleteLearning } = useContext(LearningTrackerContext);
    const { deleteCategory, categories } = useContext(CategoryContext);

    let learningsGroups = [];
    categories.forEach((c) => {
        const learningsByThisCategory = learnings.filter((l) => l.category === c.title);
        const learningsGroupByCategory = {category: c.title, learnings: learningsByThisCategory};
        learningsGroups.push(learningsGroupByCategory);
    })

    const filterLearnings = (category) => {
        const filteredLearningsGroups = learningsGroups.filter((group) => group['category'] === category);
        return filteredLearningsGroups[0].learnings;
    }

    const deleteCategoryWithLearnings = (title) => {
        const categoryToDelete = categories.find((c) => c.title === title);
        const learningsOfCategoryToDelete = learnings.filter((l) => l.category === categoryToDelete.title);
        learningsOfCategoryToDelete.forEach((l) => deleteLearning(l.id));
        deleteCategory(title);
    }    


    return (
        <LearningList dense={false} className={classes.list} subheader={<li />}>
            {categories.map((category) => (
                <li key={category.id} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader className={classes.listSubheader}>
                            {category.title}
                            <ListItemSecondaryAction>
                            <Tooltip title="Delete Category" placement="top">
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteCategoryWithLearnings(category.title)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            </ListItemSecondaryAction>
                        </ListSubheader>
                        
                        {filterLearnings(category.title).map((learning) => {
                                return (<LearningListItem key={learning.id} learning={learning} setFormData={setFormData} />);
                            })
                        }
                    </ul>
                    <Divider />
                </li>
            ))}
        </LearningList>
    )
}

export default List;
