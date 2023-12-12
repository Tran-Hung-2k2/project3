import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { updateFieldsReading as readingFields, updateFieldsVideo as videoFields } from '../constants/lessonFields';
import Loader from '../components/Loader';
import FormEdit from '../components/FormEdit';
import service from '../services/lesson.service';
import notify from '../utils/notify';

export default function LessonEdit() {
    const { course, Lesson_ID } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('Reading');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const lecturesArray = [];
        // Duyệt qua tất cả các tuần của khóa học
        course.Weeks.forEach((week) => {
            week.Lectures.forEach((lecture) => {
                const lectureInfo = {
                    [lecture.Lecture_ID]: lecture.Lecture_Title,
                };
                lecturesArray.push(lectureInfo);
            });
        });

        readingFields.forEach((field) => {
            if (field.id === 'Lecture_ID') {
                field.options = lecturesArray;
            }
        });

        videoFields.forEach((field) => {
            if (field.id === 'Lecture_ID') {
                field.options = lecturesArray;
            }
        });

        setLoading(false);
    }, []);

    const getData = async () => {
        const res = await service.getLesson({ Lesson_ID });

        const { Title, Index, Duration, Content, Lecture_ID, Type } = res.data[0];
        setType(Type);
        return { Title, Index, Duration: Math.ceil(Duration / 60), Content, Lecture_ID };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        const sendData = { ...data, Type: type, Duration: data.Duration ? data.Duration * 60 : 1 };

        const formData = new FormData();
        for (const key in sendData) {
            formData.append(key, sendData[key]);
        }

        try {
            if (type == 'Video') notify('Việc tải video sẽ tốn thời gian. Vui lòng đợi!', 'warning');
            setLoading(true);
            await service.updateLesson(formData, Lesson_ID);
            navigate(-1);
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <FormEdit
            fields={type == 'Reading' ? readingFields : videoFields}
            title="Cập nhật bài giảng"
            onSubmit={handleSubmit}
            getData={getData}
        >
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
        </FormEdit>
    );
}
