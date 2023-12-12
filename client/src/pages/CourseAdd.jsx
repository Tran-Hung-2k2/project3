import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { addFields as fields } from '../constants/courseFields';
import FormAdd from '../components/FormAdd';
import Loader from '../components/Loader';
import service from '../services/course.service';

export default function CourseAdd() {
    const [loading, setLoading] = useState(true);
    const { categories } = useSelector((state) => state.category);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fields.forEach((field) => {
            if (field.id === 'Category_ID') {
                field.options = categories.map((category) => ({
                    [category.Category_ID]: category.Name,
                }));
            }
        });

        setLoading(false);
    }, [categories]);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {
            setLoading(true);
            await service.addCourse(formData);
        } finally {
            setLoading(false);
        }
        navigate('/course/manager');
    };

    return loading ? <Loader /> : <FormAdd fields={fields} title="Thêm khóa học" onSubmit={handleSubmit} />;
}
