import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {

	return (
        <>
            {/* <div className="collapse bg-base-200">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-neutral peer-checked:text-neutral-content">
            {course.title} <p><b>{course.code}</b></p>
            </div>
            <div className="collapse-content bg-neutral text-neutral-content peer-checked:bg-neutral peer-checked:text-neutral-content"> 
            <p><b>Points: </b>{course.points} / <b>Level: </b>{course.level}</p> 
            <Link to={`/courses/${course.id}`}><button className="btn btn-outline btn-primary mt-5">More</button></Link>
            </div>
            </div> */}
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{course.title} </h2><p><b>{course.code}</b></p>
                    <p><b>Points: </b>{course.points} / <b>Level: </b>{course.level}</p> 
                    <div className="card-actions justify-end">
                    <Link to={`/courses/${course.id}`}><button className="btn btn-outline btn-primary">More</button></Link>
                    </div>
    </div>
    </div>
        </>
        )
};

export default CourseCard;