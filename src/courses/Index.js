import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContexts";

import CourseCard from './components/CourseCard';

const CoursesIndex = () => {
    const { authenticated } = useAuth();
    const [courses, setCourseList] = useState([])
    const [term, setTerm] = useState("");
    const [filteredCourses, setFilteredCoursesList ] = useState([])


    let searchTerm = term.toLowerCase()
    
    let token = localStorage.getItem('token');

    useEffect(()=> {
        if(searchTerm<=3){
            setFilteredCoursesList(courses)
        }
        else{
            let filter = courses.filter((course)=>{
                return course.title.toLowerCase().includes(searchTerm)
            })
            console.log(filter)
            setFilteredCoursesList(filter)
        }
    },[courses, term])

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

    const handleChange = (e) => {
        setTerm(e.target.value)
    };

    const courseList = filteredCourses.map((course, i) => {
        return <CourseCard key={course.id} course={course}/>
    })

    return (
        <>
        <div className="grid grid-cols-1 gap-1 justify-items-center m-3">
        <input type="text" value={term} onChange={handleChange} placeholder="         Search Course"/>
        </div>
        <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
        {courseList}
        </div>
        </>
    );
};

export default CoursesIndex;