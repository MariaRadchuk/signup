import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpForm.css';

const SignUpForm = () => {

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    repeatPassword: Yup.string()
      .required('Repeat Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), 
  });

  const onSubmit = async (data) => {
    try {
      // Відправка POST-запиту на backend для реєстрації користувача
      const response = await axios.post('/api/register', data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Збереження токена в localStorage
        window.location.href = '/tracker'; // Перенаправлення на сторінку TrackerPage
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>} 
        </div>
        
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>} 
        </div>

        <div>
          <label>Repeat Password</label>
          <input type="password" {...register('repeatPassword')} />
          {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>} 
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUpForm;
