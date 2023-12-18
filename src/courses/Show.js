import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DeleteBtn from "../components/Delete";



const Show = () => {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const navigate = useNavigate();

    let token = localStorage.getItem('token');
    
    useEffect(()=>{
        axios.get(`https://college-api.vercel.app/api/courses/${id}`,{
            headers: {
                'Authorization' :  `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setCourse(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    },[id]);

    if(!course) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);

    return (
    <>
        <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
        <div className="max-w-md">
        <h1 className="text-5xl font-bold">{course.title}</h1>
        <p className="py-6">{course.points} Points</p>
        <p className="py-6">Level {course.level}</p>
        <p className="py-6">{course.description}</p>
        </div>
        <Link to={`/courses/${course.id}/edit`}><button className="btn btn-outline btn-primary m-3">Edit</button></Link>
        <DeleteBtn className="m-3" id={course.id} resource="courses" deleteCallback={() => navigate('/courses')} />
    </div>
    </div>
    </>
    )
}

export default Show;