import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@/styles/styles.css'
import { RecoilRoot } from 'recoil'
import { Provider as ReduxProvider } from 'react-redux';
import { ContextProvider } from './store/cs.jsx';
import { store } from './y/ds';

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
      <ReduxProvider store = {store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ReduxProvider>
    </RecoilRoot>
)