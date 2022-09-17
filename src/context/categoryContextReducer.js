const categoryContextReducer = (state, action) => {
    let categories;
    let updatedCategory;
    let learning;
    const learnings = JSON.parse(localStorage.getItem('learnings'));

    switch(action.type) {
        case 'DELETE_CATEGORY': 
            categories = state.filter((c) => c.title !== action.payload);
            localStorage.setItem('categories', JSON.stringify(categories));
            return categories;   
            
        case 'ADD_CATEGORY':
            categories = [action.payload, ...state];
            localStorage.setItem('categories', JSON.stringify(categories));
            return categories;

        case 'UPDATE_CATEGORY':
            learning = action.payload;
            updatedCategory = state.find((category) => category.title === learning.category );
            
            if (learnings.find((l) => l.id === learning.id) === undefined) {
                updatedCategory.totalDuration += learning.duration;
            } else {
                updatedCategory.totalDuration -= learning.duration;
            }
            
            categories = [...state];
            localStorage.setItem('categories', JSON.stringify(categories));
            return categories;
            
        case 'UPDATE_CATEGORY_ON_EDIT':
            const updatedLearning = action.payload;
            updatedCategory = state.find((category) => category.title === updatedLearning.category );
            updatedCategory.totalDuration = 0;
            updatedCategory.totalFinishedDuration = 0;
            
            learnings.forEach((learning) => {
                if (learning.category === updatedCategory.title) {
                    updatedCategory.totalDuration += learning.duration;
                    if (learning.isFinished) {
                        updatedCategory.totalFinishedDuration += learning.duration;
                    }
                }
            });

            categories = [...state];
            localStorage.setItem('categories', JSON.stringify(categories));
            return categories;
        
        case 'UPDATE_CATEGORY_ON_FINISH':
            learning = action.payload;
            updatedCategory = state.find((category) => category.title === learning.category );
            
            learning.isFinished ?
                updatedCategory.totalFinishedDuration += learning.duration
            :
                updatedCategory.totalFinishedDuration -= learning.duration;
            
            categories = [...state];
            localStorage.setItem('categories', JSON.stringify(categories));
            return categories;

        default:
        return state;
    }
}

export default categoryContextReducer