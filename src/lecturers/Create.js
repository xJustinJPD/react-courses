import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LecturersCreate = () => {
    const errorStyle = {
        color: 'red'
    };
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {

            if(!form[field]){
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!`
                    }
                }));
            }
            
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitted', form);

        if(isRequired(['name', 'email', 'address', 'phone'])){
            let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTdkY2RjNWU5NmZkNzkzZjMxZTNhYWFjYWI1YTg5MDkzMDVhNjZiZTBlODNmODkxM2FmNGEzNmRkNGIyNDY4YmFlYWVlZDdmYjI1NTQyYzkiLCJpYXQiOiIxNzAwNDk0OTk0LjMxMDczNSIsIm5iZiI6IjE3MDA0OTQ5OTQuMzEwNzM4IiwiZXhwIjoiMTczMjExNzM5NC4yOTg2ODQiLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.ftR4PC4MP83zoScfV7UJMUFt3CVZf-XoGa-VLQFdgx-44Zkeg3skrWvJXiL6P_oCG1H1kltIXqdxYhyCokFAXag-iG4g2UkKD9rWdmoHc2SY43MtMMc47LqrYM5Dgq6v6D5YJbyAVwLlYcIB7DRYlYSKpjiMZKNymCXkG0w4UEpMalGX25PvaV14GYfSuYKuCuN6X69xvaq1OSiJsX_CGiUKB2lchKcSvryjgRDqGGSGyJlJ9I5raw_VkKH0LYY9Gvs4D4XCmjQvIuv_IN4VpdIikemi_KJfax2d622T7fchomBfOQsg2dHq7kcMmMLM1P4O3Nrj0ofx52X9bF5yGbUzEPD4W5dxOkACOP3TFeKQrdu8Vd0D_Mh5jSAbZ85l65gCg2trf9TWgXEPshMxfQzF0aWd_-q2hNN4KJ5wT5Qsg-ex06JkE_ozSyByXP_AW1Q5TqFHhMHSNppIbQxw7zXSIlA8hp267exHsgM7mlfCv00lRKzm9lpw_Pucz26wpbMfncmtFUqqN3fGYZkXXNyCZgIfyvLgzWnbp-E7unkll0wrT4IQ7VtrGVvVmBI3EMsdyG5Ouh950yXwvWi7n-SWCfXC30U_4VFGdXJRswHGI3UZ_vSPAYvdzbjYdC3sqIWw1Bt7rzJ7jkI7Qh7Henx-0Fl3tLLQxp3-WtYerV0'

            axios.post('https://college-api.vercel.app/api/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                navigate('/lecturers');
                console.log('posted')
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    return (
        <div>
            <h2 className='m-3'>Edit lecturer</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Name:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.name} name='name' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.name?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Address:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.address} name='address' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.address?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">email:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.email} name='email' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.email?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Phone:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.phone} name='phone' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.phone?.message}</span>
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default LecturersCreate;