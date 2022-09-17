import { useContext } from 'react'
import { LearningTrackerContext } from './context/context'
import { CategoryContext } from './context/categoryContext'
import getRandomColor from './utils/getRandomColor'
import { red, blue } from '@material-ui/core/colors';

const useLearnings = () => {
    const { learnings } = useContext(LearningTrackerContext);
    const totalDuration = learnings.reduce((acc, curVal) => acc += curVal.duration, 0);

    //Chart 1 - Learning Time by Category:
    const { categories, resetCategoriesDuration } = useContext(CategoryContext);
    resetCategoriesDuration();
    
    learnings.forEach((l) => {
        const category = categories.find((c) => c.title === l.category);
        if (category) 
            category.totalDuration += l.duration;
    });

    const filteredCategories = categories.filter((c) => c.totalDuration > 0);

    const chartDataCategories = {
        datasets: [{
            data: filteredCategories.map((c) => c.totalDuration),
            backgroundColor: filteredCategories.map((c) => getRandomColor()),
        }],

        labels: filteredCategories.map((c) => c.title),
    }

    //Chart 2 - Learning Time by Type:
    const types = [
        { title: "Media", totalDuration: 0, color: blue[500] },
        { title: "Project", totalDuration: 0, color: red[500] }
    ];

    learnings.forEach((l) => {
        const type = types.find((t) => t.title === l.type);
        if (type) 
            type.totalDuration += l.duration;
    });

    const filteredTypes = types.filter((t) => t.totalDuration > 0);

    const chartDataTypes = {
        datasets: [{
            data: filteredTypes.map((t) => t.totalDuration),
            backgroundColor: filteredTypes.map((t) => t.color),
        }],

        labels: filteredTypes.map((t) => t.title)
    }

    //Progress:
    const finishedLearnings = learnings.filter((l) => l.isFinished === true);
    const totalFinishedDuration = finishedLearnings.reduce((acc, curVal) => acc += curVal.duration, 0);

    finishedLearnings.forEach((l) => {
        const category = categories.find((c) => c.title === l.category);
        if (category) 
            category.totalFinishedDuration += l.duration;
    });

    
    return { learnings, 
             categories, 
             totalDuration, 
             totalFinishedDuration, 
             chartDataCategories, 
             chartDataTypes 
    };
}

export default useLearnings