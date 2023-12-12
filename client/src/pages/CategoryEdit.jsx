import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import fields from '../constants/categoryFields';
import FormEdit from '../components/FormEdit';
import action from '../redux/category/category.action';
import service from '../services/category.service';

export default function CategoryEdit() {
    const { categories, Category_ID } = useSelector((state) => state.category);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getData = async () => {
        const category = await service.getCategory({ Category_ID });
        return { Name: category.data[0].Name };
    };

    const handleSubmit = (e, data) => {
        e.preventDefault();
        dispatch(action.updateCategory(data, Category_ID));
        navigate(-1);
    };

    return <FormEdit fields={fields} title="Cập nhật danh mục" onSubmit={handleSubmit} getData={getData} />;
}
