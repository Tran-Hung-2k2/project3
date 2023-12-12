import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuClipboardEdit } from 'react-icons/lu';
import { FiDelete } from 'react-icons/fi';

import WeekInfo from './WeekInfo';
import Loader from '../components/Loader';
import ButtonBack from '../components/ButtonBack';
import action from '../redux/course/course.action';
import service from '../services/course.service';
import confirm from '../utils/confirm';
import convertTime from '../utils/convertTime';

const CourseManager = () => {
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            action.setCourse(id, (course) => {
                if (course.User_ID == user.User_ID) setOwner(true);
                setLoading(false);
            }),
        );
    }, []);

    function deleteCourse(course) {
        confirm({
            title: 'Xóa khóa học',
            message: `Khi bạn xác nhận Khóa học "${course.Name}" sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa`,
            onConfirm: async () => {
                try {
                    setLoading(true);
                    await service.deleteCourse(course.Course_ID);
                } finally {
                    setLoading(false);
                }
                navigate('/course/manager');
            },
        });
    }

    return (
        <>
            <ButtonBack className="ml-8" />
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    <div>
                        <img
                            className="inline-block object-fill h-16 max-w-full mb-6 mr-4"
                            src={course.User.Avatar}
                            alt="organization"
                        />
                        <h3 className="inline-block text-xl font-semibold">{course.User.Name}</h3>
                    </div>
                    <div className="content-center mb-4 ">
                        <div className="flex items-center">
                            <h2 className="inline-block mb-1 text-3xl font-bold ">
                                {course ? course.Name : 'Course Name'}
                            </h2>
                            <div className="py-3 mx-4 text-lg font-semibold badge badge-primary badge-outline">
                                {course.Category.Name}
                            </div>
                            {owner && (
                                <Link
                                    to="/course/edit"
                                    className="inline-block mx-2"
                                    onClick={() => {
                                        dispatch(action.addCourse(course.Course_ID));
                                    }}
                                >
                                    <LuClipboardEdit className="text-green-700 w-7 h-7" />
                                </Link>
                            )}
                            {owner && (
                                <Link onClick={() => deleteCourse(course)} className="inline-block mx-2">
                                    <FiDelete className="w-7 h-7 text-error" />
                                </Link>
                            )}
                        </div>
                        <p className="my-2 text-lg font-bold text-green-600">{course.Level} Level</p>
                        <p className="text-md">
                            <b>Ngày tạo:</b> {convertTime(course.createdAt)}
                        </p>
                        <p className="text-md">
                            <b>Lần cập nhật gần nhất:</b> {convertTime(course.updatedAt)}
                        </p>
                        <p className="mt-4 text-lg">{course.Description}</p>
                    </div>
                    <WeekInfo {...{ course, owner }} />
                </div>
            )}
        </>
    );
};

export default CourseManager;
