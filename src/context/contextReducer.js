const contextReducer = (state, action) => {
    let learnings;
    
    switch(action.type) {
        case 'DELETE_LEARNING': 
            learnings = state.filter((l) => l.id !== action.payload);
            localStorage.setItem('learnings', JSON.stringify(learnings));
            return learnings;   
            
        case 'ADD_LEARNING':
            learnings = [action.payload, ...state];
            localStorage.setItem('learnings', JSON.stringify(learnings));
            return learnings;

        case 'FINISH_LEARNING':
            const learning = state.find((l) => l.id === action.payload);
            learning.isFinished = !learning.isFinished;
            learnings = [...state];
            localStorage.setItem('learnings', JSON.stringify(learnings));
            return learnings;

        case 'UPDATE_LEARNING':
            const updatedLearning = action.payload;
            const updatedLearnings = state.map((l) => {
                return l.id === updatedLearning.id ? updatedLearning : l;
            });
            localStorage.setItem('learnings', JSON.stringify(updatedLearnings));
            return updatedLearnings;
        
        default:
            return state;
    }
}

export default contextReducer