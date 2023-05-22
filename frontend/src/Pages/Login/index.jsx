import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import loginMainImage from '../../assets/utils/images/login-main-img.svg';
import { useAuth } from "../../context/AuthContext/useAuth";
import { Spinner } from 'reactstrap';



const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { signIn, loading } = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate the login credentials and send a request to the server
        const data = {
            login,
            password,
            rememberMe
        }

        signIn(data)
    }
    return (
        <div className="min-h-screen bg-white flex">
            {loading &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                   <Spinner style={{ width: '10rem', height: '10rem' }} color="primary" />
                </div>
            }
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Entre na sua conta
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="mt-8">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Login
                                </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="text" autoComplete="email" required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={login}
                                        onChange={(event) => setLogin(event.target.value)} />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            checked={rememberMe}
                                            onChange={(event) => setRememberMe(event.target.checked)} />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Lembrar-me
                                        </label>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-6">
                                <button type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block relative flex-1 mt-10">
                <img className=" h-2/3 w-2/3"
                    src={loginMainImage} alt="" />
            </div>
        </div>
    );
};

export default Login;
