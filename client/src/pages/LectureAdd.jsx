import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addFields as fields } from '../constants/lectureFields';
import FormAdd from '../components/FormAdd';
import service from '../services/lecture.service';

export default function LectureAdd() {
    const { Week_ID } = useSelector((state) => state.course);
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.addLecture({ Week_ID, ...data });
        navigate(-1);
    };

    return <FormAdd fields={fields} title="Thêm bài giảng" onSubmit={handleSubmit} />;
}
