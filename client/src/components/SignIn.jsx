import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fields from '../constants/signinFields';
import action from '../redux/auth/auth.action';
Link

const fieldsState = fields.reduce((acc, field) => ({ ...acc, [field.id]: '' }), {});

export default function SignIn() {
    const [state, setState] = useState(fieldsState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            action.login(state, () => {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }),
        );
    };

    return (
        <form className="m-auto -translate-x-36 w-200" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-primary">Đăng nhập</h3>
            <p className='mt-2 mb-6'>Bạn chưa có tài khoản? <Link to='/signup' className='text-primary'>Đăng ký ngay</Link> </p>
            <div className="flex flex-col space-y-4 w-80">
                {fields.map((field) => (
                    <input
                        key={field.id}
                        onChange={handleChange}
                        {...field}
                        className="w-full max-w-xl input input-bordered input-primary"
                    />
                ))}
            </div>

            <button type="submit" className="mt-4 btn btn-active btn-primary">
                Đăng nhập
            </button>
        </form>
    );
}
