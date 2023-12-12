import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { addFieldsReading as readingFields, addFieldsVideo as videoFields } from '../constants/lessonFields';
import FormAdd from '../components/FormAdd';
import Loader from '../components/Loader';
import service from '../services/lesson.service';
import notify from '../utils/notify';

export default function LessonAdd() {
    const { Lecture_ID } = useSelector((state) => state.course);
    const [type, setType] = useState('Reading');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e, data) => {
        e.preventDefault();

        const sendData = { Lecture_ID, Type: type, ...data, Duration: data.Duration ? data.Duration * 60 : 1 };

        const formData = new FormData();
        for (const key in sendData) {
            formData.append(key, sendData[key]);
        }
        try {
            if (type == 'Video') notify('Việc tải video sẽ tốn thời gian. Vui lòng đợi!', 'warning');
            setLoading(true);
            await service.addLesson(formData);
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <FormAdd fields={type == 'Reading' ? readingFields : videoFields} title="Thêm tiết học" onSubmit={handleSubmit}>
            <label className="block font-medium">Loại tiết học</label>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full max-w-xs select select-primary"
            >
                <option disabled>Loại tiết học</option>
                <option>Reading</option>
                <option>Video</option>
            </select>
        </FormAdd>
    );
}
