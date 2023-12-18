import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/api';

const Edit = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        title: "",
        code: "",
        description: "",
        points: "",
        level: ""
    });


    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            setCourse(response.data.data);
            setForm(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

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

        if(isRequired(['title', 'code', 'points', 'level'])){
            let token = localStorage.getItem('token');

            axios.put(`/courses/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/courses/${id}`);
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    

    if(!course) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);

    return (
        <div>
            <h2 className='m-3'>Edit Course</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Title:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.title} name='title' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.title?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Code:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.code} name='code' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.code?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Points:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.points} name='points' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.points?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Level:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.level} name='level' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.level?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control">
            <div className="label">
                <span className="label-text">Course Description:</span>
            </div>
            <textarea className="textarea textarea-bordered h-24" placeholder="Type Here" onChange={handleForm} value={form.description} name='description'></textarea><span style={errorStyle}>{errors.description?.message}</span>
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default Edit;