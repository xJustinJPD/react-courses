import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/api';

const EnrolmentsCreate = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [courses, setCourseList] = useState([])
    const [lecturers, setLecturerList] = useState([])
    const [form, setForm] = useState({
        course_id: "",
        lecturer_id: "",
        date: "",
        time: "",
        status: ""
    });

    let token = localStorage.getItem('token');

    useEffect(()=>{
        axios.get("https://college-api.vercel.app/api/courses",{
            headers: {
                'Authorization' :  `Bearer ${token}`
            }
        })
        .then(response => {
            setCourseList(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    })

    useEffect(()=>{
        axios.get("https://college-api.vercel.app/api/lecturers",{
            headers: {
                'Authorization' :  `Bearer ${token}`
            }
        })
        .then(response => {
            setLecturerList(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    })


    const errorStyle = {
        color: 'red'
    };

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

        if(isRequired(['course_id', 'lecturer_id', 'date', 'time', 'status'])){
            let token = localStorage.getItem('token');

            axios.post(`/enrolments`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate(`/enrolments`);
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    const courseOptions = courses.map((course) => (
        <option value={course.id} key={course.id}>{course.title}</option>
    ));

    const lecturerOptions = lecturers.map((lecturer) => (
        <option value={lecturer.id} key={lecturer.id}>{lecturer.name}</option>
    ));


    return (
        <div>
            <h2 className='m-3'>Create Enrolment</h2>
            <form onSubmit={submitForm}>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Course:</span>
            </div>
            <select name="course_id" onChange={handleForm}>
                <option value="">Choose a course:</option>
                {courseOptions}
            </select>
            <span style={errorStyle}>{errors?.course_id?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Lecturer:</span>
            </div>
            <select name="lecturer_id" onChange={handleForm}>
                <option value="">Choose a lecturer:</option>
                {lecturerOptions}
            </select>
            <span style={errorStyle}>{errors?.lecturer_id?.message}</span>
            </label>
            </div>

            <div className="form-control w-full max-w-xs m-3">
                <label className="label">
                <span className="label-text">Date</span>
                </label>
                <input type="date" onChange={handleForm} value={form.date} name="date" className="input input-bordered" /><span style={errorStyle}>{errors?.date?.message}</span>
            </div>

            <div className="form-control w-full max-w-xs m-3">
            <label className="label">
                <span className="label-text">Time</span>
                </label>
                <input type="time" onChange={handleForm} value={form.time} name="time" className="input input-bordered" /><span style={errorStyle}>{errors?.time?.message}</span>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Status:</span>
            </div>
            <select name="status" id="status" onChange={handleForm}>
                <option value="">Choose Status</option>
                <option value="interested">Interested</option>
                <option value="assigned">Assigned</option>
                <option value="associate">Associate</option>
                <option value="career_break">Career Break</option>
            </select>
            <span style={errorStyle}>{errors?.status?.message}</span>
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};




export default EnrolmentsCreate;