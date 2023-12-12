import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import fields from '../constants/categoryFields';
import FormAdd from '../components/FormAdd';
import action from '../redux/category/category.action';

export default function CategoryAdd() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        dispatch(action.addCategory(data, () => navigate('/category/manager')));
    };

    return <FormAdd fields={fields} title="Thêm danh mục" onSubmit={handleSubmit} />;
}
