import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import EnrolmentCard from "./components/EnrolmentCard";

const EnrolmentsIndex = () => {
    const [enrolments, setEnrolmentList] = useState([])

    const [term, setTerm] = useState("");
    const [filteredEnrolments, setFilteredEnrolmentsList ] = useState([])


    let searchTerm = term

    let token = localStorage.getItem('token');
    

    useEffect(()=> {
        if(searchTerm<1){
            setFilteredEnrolmentsList(enrolments)
        }
        else{
            let filter = enrolments.filter((enrolments)=>{
                return (enrolments.id.toString().includes(searchTerm) )
            })
            console.log(filter)
            setFilteredEnrolmentsList(filter)
        }
    },[enrolments, term])

    useEffect(()=>{
        axios.get("https://college-api.vercel.app/api/enrolments",{
            headers: {
                'Authorization' :  `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setEnrolmentList(response.data.data)
        })
        .catch(err => {
            console.error(err)
        })
    })

    const handleChange = (e) => {
        setTerm(e.target.value)
    };

    const enrolmentList = filteredEnrolments.map((enrolment, i) => {
        return <EnrolmentCard key={enrolment.id} enrolment={enrolment}/>
    })

    return (
            
        <>
        <div className="grid grid-cols-1 gap-1 justify-items-center m-3">
        <input type="text" value={term} onChange={handleChange} placeholder="       Search Enrolment"/>
        </div>
        <div className='grid grid-cols-3 mt-3 gap-6 justify-items-center'>
        {enrolmentList}
        </div>
        </>
    );
};

export default EnrolmentsIndex;