import { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { getAuthToken } from '../../utils/Cookies';
import LoadingSpinner from '../../../components/LoadingSpinner';

const SignUp = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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
            await axios.post('http://localhost:60311/api/Auth/Register', formData);
            window.location.href = '/login';
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
                        Sign Up
                    </h1>

                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <button type="submit" className="signup-button" style={{ marginBottom: '10px', marginTop: '5px' }}>
                            Sign Up
                        </button>
                    )}
                    <p>Already have an account?
                    <a href="/Login" className='ms-1'>Log In</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
