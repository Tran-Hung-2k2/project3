import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditForm from '../components/FormEdit';
import service from '../services/week.service';
import fields from '../constants/weekFields';

export default function WeekEdit() {
    const { Week_ID } = useSelector((state) => state.course);
    const navigate = useNavigate();

    const getData = async () => {
        const res = await service.getWeek({ Week_ID });

        const { Title, Index, Description, Target } = res.data[0];

        return {
            Title,
            Index,
            Description,
            Target,
        };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.updateWeek(data, Week_ID);
        navigate(-1);
    };

    return <EditForm fields={fields} title="Cập nhật tuần học" onSubmit={handleSubmit} getData={getData} />;
}
