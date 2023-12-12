import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {updateFields as fields} from '../constants/courseFields';
import FormEdit from '../components/FormEdit';
import Loader from '../components/Loader';
import service from '../services/course.service';

export default function CourseEdit() {
    const { Course_ID } = useSelector((state) => state.course);
    const { categories } = useSelector((state) => state.category);
    const [loading, setLoading] = useState(true);
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

    const getData = async () => {
        const res = await service.getCourses({ Course_ID });

        const { Name, Level, Category_ID, Need_Approval, Description } = res.data[0];
        // console.log(res.data[0]);
        return { Name, Level, Category_ID, Need_Approval, Description };
    };

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        try {
            setLoading(true);
            await service.updateCourse(formData, Course_ID);
        } finally {
            setLoading(false);
        }
        navigate(-1);
    };

    return loading ? (
        <Loader />
    ) : (
        <FormEdit fields={fields} title="Cập nhật khóa học" onSubmit={handleSubmit} getData={getData} />
    );
}
