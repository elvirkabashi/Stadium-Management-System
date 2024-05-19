import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
import { getAuthToken } from '../../utils/Cookies';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    useEffect(() => {
        const authToken = getAuthToken();
        if(authToken){
            window.location.href = '/';
        }
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8001/api/Account', formData);
            const { token } = response.data;
            Cookies.set('token', token, { secure: true, sameSite: 'strict' });
            console.log('Token: ' + token);
            window.location.href = '/';
        } catch (error) {
            console.log(error.response.data);
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
            <p className='text-center'>Per momentin userat jan te shtuar hard code sa per testim <br/>
            <b>Kyqu si admin</b>: Username: <b>Admin</b>, Password: <b>admin123</b> <br/>
            <b>Kyqu si user</b>: Username: <b>User</b>, Password: <b>user123</b></p>
            <form onSubmit={handleSubmit} className="signup-form" style={{ marginTop: '10px', marginBottom: '0px' }}>
                <div className='container' style={{ maxWidth: '400px' }}>
                    <h1 className="signin" style={{ fontWeight: 'bold', paddingBottom: '30px', paddingTop: '20px' }}>
                        Log in
                    </h1>
                    <label>Username</label>
                    <input 
                        type="text"
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
                    <button type="submit" className="signup-button" style={{ marginBottom: '10px', marginTop: '5px' }}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
