import { useState } from 'react';
import axios from '../config/api';
// import { useNavigate } from 'react-router-dom';

export default function DeleteBtn({id, resource, deleteCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    // const navigate = useNavigate();

    const onDelete = () => {
        setIsLoading(true);
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTdkY2RjNWU5NmZkNzkzZjMxZTNhYWFjYWI1YTg5MDkzMDVhNjZiZTBlODNmODkxM2FmNGEzNmRkNGIyNDY4YmFlYWVlZDdmYjI1NTQyYzkiLCJpYXQiOiIxNzAwNDk0OTk0LjMxMDczNSIsIm5iZiI6IjE3MDA0OTQ5OTQuMzEwNzM4IiwiZXhwIjoiMTczMjExNzM5NC4yOTg2ODQiLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.ftR4PC4MP83zoScfV7UJMUFt3CVZf-XoGa-VLQFdgx-44Zkeg3skrWvJXiL6P_oCG1H1kltIXqdxYhyCokFAXag-iG4g2UkKD9rWdmoHc2SY43MtMMc47LqrYM5Dgq6v6D5YJbyAVwLlYcIB7DRYlYSKpjiMZKNymCXkG0w4UEpMalGX25PvaV14GYfSuYKuCuN6X69xvaq1OSiJsX_CGiUKB2lchKcSvryjgRDqGGSGyJlJ9I5raw_VkKH0LYY9Gvs4D4XCmjQvIuv_IN4VpdIikemi_KJfax2d622T7fchomBfOQsg2dHq7kcMmMLM1P4O3Nrj0ofx52X9bF5yGbUzEPD4W5dxOkACOP3TFeKQrdu8Vd0D_Mh5jSAbZ85l65gCg2trf9TWgXEPshMxfQzF0aWd_-q2hNN4KJ5wT5Qsg-ex06JkE_ozSyByXP_AW1Q5TqFHhMHSNppIbQxw7zXSIlA8hp267exHsgM7mlfCv00lRKzm9lpw_Pucz26wpbMfncmtFUqqN3fGYZkXXNyCZgIfyvLgzWnbp-E7unkll0wrT4IQ7VtrGVvVmBI3EMsdyG5Ouh950yXwvWi7n-SWCfXC30U_4VFGdXJRswHGI3UZ_vSPAYvdzbjYdC3sqIWw1Bt7rzJ7jkI7Qh7Henx-0Fl3tLLQxp3-WtYerV0'

        axios.delete(`/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data);
                    deleteCallback(id);
                    // navigate('/courses');
                })
                .catch(err => {
                    console.log(err.response.data)
                });
    };

    return (
        <button onClick={onDelete} className="btn btn-outline btn-error">
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};