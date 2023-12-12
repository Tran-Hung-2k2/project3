import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { updateFields as fields } from '../constants/lectureFields';
import Loader from '../components/Loader';
import FormEdit from '../components/FormEdit';
import service from '../services/lecture.service';

export default function LectureEdit() {
    const { course, Lecture_ID } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        fields.forEach((field) => {
            if (field.id === 'Week_ID') {
                field.options = course.Weeks.map((week) => ({
                    [week.Week_ID]: week.Title,
                }));
            }
        });

        setLoading(false);
    }, []);

    const getData = async () => {
        const res = await service.getLecture({ Lecture_ID });

        const { Lecture_Title, Index, Week_ID } = res.data[0];
        return { Lecture_Title, Index, Week_ID };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        await service.updateLecture(data, Lecture_ID);
        navigate(-1);
    };

    return loading ? (
        <Loader />
    ) : (
        <FormEdit fields={fields} title="Cập nhật bài giảng" onSubmit={handleSubmit} getData={getData} />
    );
}
