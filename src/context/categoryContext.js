import React, { useReducer, createContext } from 'react';
import categoryContextReducer from './categoryContextReducer'

const initialState = JSON.parse(localStorage.getItem('categories')) || 
                     [
                         {"title":"Java","totalDuration":2,"totalFinishedDuration":0,"id":"9e655263-061e-4839-aada-33122a27d18a"},
                         {"title":"React JS","totalDuration":10,"totalFinishedDuration":0,"id":"2def1121-63ef-45fc-9b66-2bc6b5a7cf75"}
                     ];

export const CategoryContext = createContext(initialState);

export const CategoryProvider = ({ children }) => {
    const [categories, dispatch] = useReducer(categoryContextReducer, initialState); 

    const deleteCategory = (title) => dispatch({ type: 'DELETE_CATEGORY', payload: title });
    const addCategory = (category) => dispatch({ type: 'ADD_CATEGORY', payload: category });
    const updateCategory = (learning) => dispatch({ type: 'UPDATE_CATEGORY', payload: learning });
    const updateCategoryOnEdit = (learning) => dispatch({ type: 'UPDATE_CATEGORY_ON_EDIT', payload: learning });
    const updateCategoryOnFinish = (learning) => dispatch({ type: 'UPDATE_CATEGORY_ON_FINISH', payload: learning });

    const resetCategoriesDuration = () => {
        categories.forEach((c) => {c.totalDuration = 0; c.totalFinishedDuration = 0});
    }

    return (
        <CategoryContext.Provider value={{ 
            deleteCategory,
            addCategory,
            updateCategory,
            updateCategoryOnEdit,
            updateCategoryOnFinish,
            categories,
            resetCategoriesDuration
        }}>
            {children}
        </CategoryContext.Provider>
    );
}