import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DeleteBtn from "../components/Delete";



const Show = () => {
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const navigate = useNavigate();

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTdkY2RjNWU5NmZkNzkzZjMxZTNhYWFjYWI1YTg5MDkzMDVhNjZiZTBlODNmODkxM2FmNGEzNmRkNGIyNDY4YmFlYWVlZDdmYjI1NTQyYzkiLCJpYXQiOiIxNzAwNDk0OTk0LjMxMDczNSIsIm5iZiI6IjE3MDA0OTQ5OTQuMzEwNzM4IiwiZXhwIjoiMTczMjExNzM5NC4yOTg2ODQiLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.ftR4PC4MP83zoScfV7UJMUFt3CVZf-XoGa-VLQFdgx-44Zkeg3skrWvJXiL6P_oCG1H1kltIXqdxYhyCokFAXag-iG4g2UkKD9rWdmoHc2SY43MtMMc47LqrYM5Dgq6v6D5YJbyAVwLlYcIB7DRYlYSKpjiMZKNymCXkG0w4UEpMalGX25PvaV14GYfSuYKuCuN6X69xvaq1OSiJsX_CGiUKB2lchKcSvryjgRDqGGSGyJlJ9I5raw_VkKH0LYY9Gvs4D4XCmjQvIuv_IN4VpdIikemi_KJfax2d622T7fchomBfOQsg2dHq7kcMmMLM1P4O3Nrj0ofx52X9bF5yGbUzEPD4W5dxOkACOP3TFeKQrdu8Vd0D_Mh5jSAbZ85l65gCg2trf9TWgXEPshMxfQzF0aWd_-q2hNN4KJ5wT5Qsg-ex06JkE_ozSyByXP_AW1Q5TqFHhMHSNppIbQxw7zXSIlA8hp267exHsgM7mlfCv00lRKzm9lpw_Pucz26wpbMfncmtFUqqN3fGYZkXXNyCZgIfyvLgzWnbp-E7unkll0wrT4IQ7VtrGVvVmBI3EMsdyG5Ouh950yXwvWi7n-SWCfXC30U_4VFGdXJRswHGI3UZ_vSPAYvdzbjYdC3sqIWw1Bt7rzJ7jkI7Qh7Henx-0Fl3tLLQxp3-WtYerV0"

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

    if(!course) return <h3>Course Not Found</h3>

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