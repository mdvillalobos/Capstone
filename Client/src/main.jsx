import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext.jsx'
import { RankContextProvider } from '../context/rankContext.jsx';
import App from './App.jsx';
import './assets/css/index.css';
import PageLoader from '../context/PageLoader.jsx';

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RankContextProvider>
      <PageLoader>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PageLoader>
    </RankContextProvider>
  </UserContextProvider>
)
