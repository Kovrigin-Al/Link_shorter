import 'materialize-css'
import { BrowserRouter } from 'react-router-dom';
import { Loader } from './components/Loader';
import { NavBar } from './components/NavBar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';
import { routesSwitcher } from './routes';

function App() {
  const { ready, login, logout, token, userId } = useAuth();
  const isAuthenticated =  Boolean(token);
  const routes = routesSwitcher(isAuthenticated);

  if (!ready) {
    return (
      <Loader/>
    )
  }

  return (

    <AuthContext.Provider value={ {login, logout, token, userId} }>
    <BrowserRouter>
    {isAuthenticated && <NavBar/>}
    {routes}
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
