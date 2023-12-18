import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LecturersCreate = () => {
    const errorStyle = {
        color: 'red'
    };
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {

            if(!form[field]){
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!`
                    }
                }));
            }
            
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitted', form);

        if(isRequired(['name', 'email', 'address', 'phone'])){
            let token = localStorage.getItem('token');
            
            axios.post('https://college-api.vercel.app/api/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/lecturers');
                console.log('posted')
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    return (
        <div>
            <h2 className='m-3'>Edit lecturer</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Name:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.name} name='name' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.name?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Address:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.address} name='address' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.address?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">email:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.email} name='email' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.email?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Phone:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.phone} name='phone' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.phone?.message}</span>
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default LecturersCreate;