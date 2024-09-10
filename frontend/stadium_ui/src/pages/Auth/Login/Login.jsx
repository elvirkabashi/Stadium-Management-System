import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
import { getAuthToken } from '../../utils/Cookies';
import LoadingSpinner from '../../../components/LoadingSpinner';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const authToken = getAuthToken();
        if (authToken) {
            window.location.href = '/';
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:62166/api/Auth/Login', formData);
            const { token } = response.data;
            Cookies.set('token', token, { secure: true, sameSite: 'strict' });
            console.log('Token: ' + token);
            window.location.href = '/';
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="signup-form" style={{ marginTop: '10px', marginBottom: '0px' }}>
                <div className='container' style={{ maxWidth: '400px' }}>
                    <h1 className="signin" style={{ fontWeight: 'bold', paddingBottom: '30px', paddingTop: '20px' }}>
                        Log in
                    </h1>
                    <label>Email</label>
                    <input
                        type="email"
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <button type="submit" className="signup-button" style={{ marginBottom: '10px', marginTop: '5px' }}>
                            Log In
                        </button>
                    )}
                    <p>Dont have an account? 
                    <a href="/signup" className='ms-1'>Sign Up</a></p>
                </div>
                
            </form>
        </div>
    );
};

export default LoginForm;
