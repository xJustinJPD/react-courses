import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="m-5">
            <h2>Page not found</h2>
            <p>You may need to <b><Link to='/login'>Login</Link></b></p>
            <p>Or, go back to <b><Link to='/'>Home</Link></b></p>
        </div>
    );
};

export default PageNotFound;