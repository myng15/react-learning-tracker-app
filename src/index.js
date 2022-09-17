import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './context/context'
import { CategoryProvider } from './context/categoryContext'

import App from './App'
import './index.css'

ReactDOM.render(
    <Provider>
        <CategoryProvider>
        
            <App />
            
        </CategoryProvider>
    </Provider>, 
    document.getElementById('root')
)
