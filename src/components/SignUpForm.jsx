import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { yupResolver } from '@hookform/resolvers/yup'; 
import * as Yup from 'yup'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import './SignUpForm.css'; 

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false); //  управління видимістю пароля
    const navigate = useNavigate(); // useNavigate для перенаправлення

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Repeat Password is required')
    });

    const {
        register,
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: yupResolver(validationSchema) 
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/register', data); 
            toast.success('Registration successful!');
            // Зберігання токена та перенаправлення на сторінку TrackerPage
            localStorage.setItem('token', response.data.token);
            navigate('/tracker');
        } catch (error) {
            toast.error('There was an error during registration. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Перемикання showPassword
    };

    return (
        <div className="sign-up-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Sign Up</h2>
                <div className="input-container">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register('password')} />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? '👁️' : '👁️'}
                    </span>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="input-container">
                    <label>Repeat password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Repeat password" {...register('repeatPassword')} />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? '👁️' : '👁️'}
                    </span>
                    {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <a href="/signin">Sign In</a></p>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUpForm;