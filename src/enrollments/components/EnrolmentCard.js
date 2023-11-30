import { Link, useNavigate } from 'react-router-dom'
import DeleteBtn from '../../components/Delete';

const EnrolmentCard = ({enrolment}) => {

    let navigate = useNavigate()

	return (
            <div className="card w-96 bg-neutral text-neutral-content">
    <div className="card-body items-center text-center">
        <p>{enrolment.date}</p>
        <p>{enrolment.time}</p>
        <p>{enrolment.status}</p>
        <div className="card-actions justify-end">
        <Link to={`/enrolments/${enrolment.id}/edit`}><button className="btn btn-outline btn-primary">Edit</button></Link>
        <DeleteBtn id={enrolment.id} resource="enrolments" deleteCallback={() => navigate('/enrolments')} />
        </div>
    </div>
    </div>
        )
};

export default EnrolmentCard;