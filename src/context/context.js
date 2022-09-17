import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer'

const initialState = JSON.parse(localStorage.getItem('learnings')) || 
                     [
                        {"type":"Media","category":"Java","content":"Test Tutorial","url":"","duration":2,"date":"2021-09-05","isFinished":false,"id":"3d8e9e25-7987-42a2-b66e-a15defb20a95"},
                        {"type":"Project","category":"React JS","content":"Test React App","url":"","duration":10,"date":"2021-09-05","isFinished":false,"id":"b8c25ebc-0131-4bcd-b3ba-ad1bf303755d"}
                     ];

export const LearningTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [learnings, dispatch] = useReducer(contextReducer, initialState); 

    const deleteLearning = (id) => dispatch({ type: 'DELETE_LEARNING', payload: id });
    const addLearning = (learning) => dispatch({ type: 'ADD_LEARNING', payload: learning });
    const finishLearning = (id) => dispatch({ type: 'FINISH_LEARNING', payload: id });
    const updateLearning = (learning) => dispatch({ type: 'UPDATE_LEARNING', payload: learning });

    return (
        <LearningTrackerContext.Provider value={{ 
            deleteLearning, 
            addLearning,
            finishLearning,
            updateLearning,
            learnings
        }}>
            {children}
        </LearningTrackerContext.Provider>
    );
}