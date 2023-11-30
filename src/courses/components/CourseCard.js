import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

	return (
        <>
            <div className="collapse bg-base-200">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-neutral peer-checked:text-neutral-content">
            {course.title} <p><b>{course.code}</b></p>
            </div>
            <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-neutral peer-checked:text-neutral-content"> 
            <p><b>Points:</b>{course.points} / <b>Level:</b>{course.level}</p> 
            <Link to={`/courses/${course.id}`}><button className="btn btn-outline btn-primary mt-1">More</button></Link>
            </div>
            </div>
        </>
        )
};

export default CourseCard;