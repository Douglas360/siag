import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    //Navigate,
    

} from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';
import {CombinedProvider} from '../context/index'



//const Login = lazy(() => import('../Pages/Login'));
const Dashboards = lazy(() => import('../DemoPages/Dashboards'));
const Login = lazy(() => import('../Pages/Login'));
const Widgets = lazy(() => import('../DemoPages/Widgets'));
const Elements = lazy(() => import('../DemoPages/Elements'));
const Components = lazy(() => import('../DemoPages/Components'));
const Charts = lazy(() => import('../DemoPages/Charts'));
const Forms = lazy(() => import('../DemoPages/Forms'));
const Tables = lazy(() => import('../DemoPages/Tables'));

const Administrative = lazy(() => import('../Pages/Administrative'));
const Register = lazy(() => import('../Pages/Registration'));

const AppLoader = () => (
    <div className="loader-container">
        <div className="loader-container-inner">
            <h6 className="mt-3">
                Aguarde...
                <small>Está carregando</small>
            </h6>
        </div>
    </div>
);

export const AppRouter = () => {
    const Private = ({ children }) => {
        const { isAuthenticated } = useAuth()
        return isAuthenticated ? children : <Login />
    }

  /*  const Authenticated = ({ children }) => {
        const token = localStorage.getItem('token') || null;
        return token ? <Navigate to="/dashboards/basic" /> : children
    }*/



    return (


        <Router>
            <CombinedProvider>
                    <Suspense fallback={<AppLoader />}>
                        <Routes>
                            <Route path="/" exact element={<Login />} />

                            <Route path="/dashboards/basic" element={<Private><Dashboards/></Private>} />
                            <Route path="administrative/*" element={<Administrative />} />
                            <Route path="create/*" element={<Register />} />
                            
                            <Route path="widgets/*" element={<Widgets />} />
                            <Route path="elements/*" element={<Elements />} />
                            <Route path="components/*" element={<Components />} />
                            <Route path="charts/*" element={<Charts />} />
                            <Route path="forms/*" element={<Forms />} />
                            <Route path="tables/*" element={<Tables />} />
                        </Routes>
                    </Suspense>
               </CombinedProvider>
        </Router>

    );
}

