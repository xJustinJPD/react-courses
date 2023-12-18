import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const { onAuthenticated } = useAuth();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        console.log("clicked", form);
        let regToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTYwYzZkZDg3ZWQzZGQ4YzA3ZmMwOWUzMmNjMzM4ZWYxMjEyNDRkODYxYzg0OTBkZmY5MmQ1OWFkYzk1YjRjNzM3NGFiNzI0NzJjOGNiYjMiLCJpYXQiOiIxNzAyODM3MDQzLjA2NzgxNSIsIm5iZiI6IjE3MDI4MzcwNDMuMDY3ODE5IiwiZXhwIjoiMTczNDQ1OTQ0My4wNTc5MjkiLCJzdWIiOiIxMyIsInNjb3BlcyI6W119.AQILzhLS8WmNZL7icNmvE0qs4GtIbnrXv22iUQead2lXHir7mdob7RjRUgeNCcPpTUcpGA-4OaRY4qXzXlfhQh8C5XRi1W7F3bIf2ccrzTnz-66X2O-5DKrJzMNmOlqlllRBmd-lmwyy83bgTOJ6TIzL__vKtQGV4QVnH-ilLkZa8GYqzKBNom7V6XxR2Fiy-QIWLztTmt6K1gT7KOyZ6IcRrlRWdy1ru7I59WiJvaSOA9WIHvfKU7Ypto_l9CdoUWl8Wv6kAcghray3TAn-VjvCKpoaxYIGm0eSLkHRHfkXYJqfnVIIi1jeAynoBQs7ymLNfpdbndYsK8BXUJSVHSr2yc6TUivWIKyXBKxj9NHPGwpirUS2slWau91QgE2xA2wd550mHUrfpiv4NN76af9BfdqW69OYCW0IxHL5TvZYx4pbGBfqgXL77zpBrXh8yUoCU5tdDk1q-sZzV-uRLyWi-i9-3PL514hUok-pdEakgP7wPv9DmQCTcuTg3fflJF6yPgmVcQnKcAieIstfLsnfolAb3DGLdl0nHJV9B0DnwFBz1lUp3P8Hu0WJsa8k-djTtLx7ho2gxl5YM0mVJzGQGPZYSvni16-rTKS5mHvTPOMj4DIleGmE6oBKokvgtG4WfWWXHJS4ERIAf_hSAZifyDngSSYCIsTcQ2nuM0o'

        axios.post('https://college-api.vercel.app/api/login', {
            headers: {
                'Authorization': `Bearer ${regToken}`
            },
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data);
            onAuthenticated(true, response.data.token);
        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
        });
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Login:</b></h2>
            Email: <input onChange={handleForm} type="text" name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />
            <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p>

            <button className='btn btn-primary w-20' onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default LoginForm;