import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import adminRoutes from './routes/admin.route';
import AuthLayout from './layout/AuthLayout';
import ManagerLayout from './layout/ManagerLayout';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VerifySignup from './pages/VerifySignup';
import ForgetPassword from './pages/ForgetPassword';
import VerifyForgetPassword from './pages/VerifyForgetPassword';
import NotFound from './pages/NotFound';

import RequireManager from './components/RequireManager';
import Loader from './components/Loader';
import RequireUser from './components/RequireUser';
import RequireSignin from './components/RequireSignin';

const UserProfile = lazy(() => import('./pages/UserProfile'));
const ChangePassword = lazy(() => import('./pages/ChangePassword'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/user/manager" />} />
                <Route path="/verify_signup" element={<VerifySignup />} />
                <Route element={<AuthLayout />}>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forget_passord" element={<ForgetPassword />} />
                    <Route path="/verify_forget_password" element={<VerifyForgetPassword />} />
                    <Route element={<RequireSignin />}>
                        <Route
                            path="/change_password"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ChangePassword />
                                </Suspense>
                            }
                        />
                    </Route>
                </Route>

                <Route element={<RequireManager />}>
                    <Route element={<ManagerLayout />}>
                        <Route
                            path="/profile"
                            element={
                                <Suspense fallback={<Loader />}>
                                    <UserProfile />
                                </Suspense>
                            }
                        />
                        {adminRoutes.map((adminRoute, index) => {
                            const { path, component: Component } = adminRoute;
                            return (
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <Suspense fallback={<Loader />}>
                                            <Component />
                                        </Suspense>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
