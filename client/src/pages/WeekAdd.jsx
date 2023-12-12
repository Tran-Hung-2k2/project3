import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fields from '../constants/weekFields';
import FormAdd from '../components/FormAdd';
import service from '../services/week.service';

export default function WeekAdd() {
    const { Course_ID } = useSelector((state) => state.course);
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.addWeek({ Course_ID, ...data });
        navigate(-1);
    };

    return <FormAdd fields={fields} title="Thêm tuần học" onSubmit={handleSubmit} />;
}
