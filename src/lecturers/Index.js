import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import LecturerCard from "./components/LecturerCard";

const LecturersIndex = () => {
    const [lecturers, setLecturerList] = useState([])
    const [term, setTerm] = useState("");
    const [filteredLecturers, setFilteredLecturersList ] = useState([])


    let searchTerm = term.toLowerCase()


    let token = localStorage.getItem('token');

    useEffect(()=> {
        if(searchTerm<=3){
            setFilteredLecturersList(lecturers)
        }
        else{
            let filter = lecturers.filter((lecturer)=>{
                return lecturer.name.toLowerCase().includes(searchTerm)
            })
            setFilteredLecturersList(filter)
        }
    },[lecturers, term])

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

    const handleChange = (e) => {
        setTerm(e.target.value)
    };

    const lecturerList = filteredLecturers.map((lecturer, i) => {
        return <LecturerCard key={lecturer.id} lecturer={lecturer}/>
    })

    return (
        <>
        <div className="grid grid-cols-1 gap-1 justify-items-center m-3">
        <input type="text" value={term} onChange={handleChange} placeholder="         Search Lecturer"/>
        </div>
        <div className='grid grid-cols-3 mt-3 gap-6 justify-items-center'>
        {lecturerList}
        </div>
        </>
    );
};

export default LecturersIndex;