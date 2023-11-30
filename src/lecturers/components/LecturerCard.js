import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from '../../components/Delete';

const LecturerCard = ({lecturer}) => {

    let navigate = useNavigate()

	return (
            <div className="card w-96 bg-neutral text-neutral-content">
    <div className="card-body items-center text-center">
        <h2 className="card-title">{lecturer.name}</h2>
        <p>{lecturer.email}</p>
        <p>{lecturer.phone}</p>
        <div className="card-actions justify-end">
        <Link to={`/lecturers/${lecturer.id}/edit`}><button className="btn btn-outline btn-primary">Edit</button></Link>
        <DeleteBtn id={lecturer.id} resource="lecturers" deleteCallback={() => navigate('/lecturers')} />
        </div>
    </div>
    </div>
        )
};

export default LecturerCard;