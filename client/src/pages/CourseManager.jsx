import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import { FaArrowDownAZ } from 'react-icons/fa6';
import { FaArrowUpAZ } from 'react-icons/fa6';

import Loader from '../components/Loader';
import service from '../services/course.service';
import label from '../constants/label';
import Indicator from '../components/Indicator';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(label.course.VISIBLE);
    const [sort, setSort] = useState({ field: 'updatedAt', dimension: 'desc' });
    const [count, setCount] = useState({});
    const { user } = useSelector((state) => state.auth);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await service.getCourses({
                User_ID: user.Role != label.role.ADMIN ? user.User_ID : null,
                Name: searchParams.get('Name'),
                Category_ID: searchParams.get('Category_ID'),
            });
            const sortedCourses = _.orderBy(res.data, sort.field, sort.dimension);

            const statusCounts = {};
            sortedCourses.forEach((course) => {
                statusCounts[course.Status] = (statusCounts[course.Status] || 0) + 1;
            });

            setCount(statusCounts);
            setCourses(sortedCourses.filter((course) => course.Status === status));
            setLoading(false);
        };

        fetchData();
    }, [status, sort]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="m-6">
                        <Indicator
                            primaryColor="primary"
                            label="Hiện"
                            active={status == label.course.VISIBLE}
                            subLabel={count[label.course.VISIBLE] || 0}
                            onClick={() => setStatus(label.course.VISIBLE)}
                        />
                        <Indicator
                            primaryColor="primary"
                            label="Đã ẩn"
                            active={status == label.course.HIDDEN}
                            subLabel={count[label.course.HIDDEN] || 0}
                            onClick={() => setStatus(label.course.HIDDEN)}
                        />
                        <Indicator
                            primaryColor="primary"
                            label="Chờ xét duyệt"
                            active={status == label.course.PENDING_APPROVAL}
                            subLabel={count[label.course.PENDING_APPROVAL] || 0}
                            onClick={() => setStatus(label.course.PENDING_APPROVAL)}
                        />
                    </div>
                    <div className="m-6">
                        <span className="ml-3 font-bold">Sắp xếp theo</span>
                        <Indicator
                            primaryColor="success"
                            label="Tên"
                            active={sort.field == 'Name'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'Name') setSort({ ...sort, field: 'Name' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Tổ chức"
                            active={sort.field == 'User_ID'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'User_ID') setSort({ ...sort, field: 'User_ID' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                        <Indicator
                            primaryColor="success"
                            label="Ngày cập nhật"
                            active={sort.field == 'updatedAt'}
                            subLabel={
                                sort.dimension == 'asc' ? (
                                    <FaArrowDownAZ className="w-4 h-4" />
                                ) : (
                                    <FaArrowUpAZ className="w-4 h-4" />
                                )
                            }
                            onClick={() => {
                                if (sort.field != 'updatedAt') setSort({ ...sort, field: 'updatedAt' });
                                else setSort({ ...sort, dimension: sort.dimension == 'asc' ? 'desc' : 'asc' });
                            }}
                        />
                    </div>

                    <div className="grid items-center gap-4 m-8 w-fit sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {courses.map((course) => (
                            <div key={course.Course_ID} className="h-full border shadow-xl card bg-base-100">
                                <Link to={`/course/${course.Course_ID}`} className="w-full p-3 border rounded-lg">
                                    <img
                                        className="object-cover w-full rounded-lg h-52"
                                        src={course.Image}
                                        alt={course.Name}
                                    />
                                </Link>
                                <div className="mx-4 my-2">
                                    <img
                                        className="inline-block object-fill h-6 max-w-full mr-3"
                                        src={course.User.Avatar}
                                        alt="organization"
                                    />
                                    <p className="inline-block translate-y-1">{course.User.Name}</p>
                                </div>
                                <Link
                                    to={`/course/${course.Course_ID}`}
                                    className="flex flex-col justify-between p-4 pt-1 card-body"
                                >
                                    <h2 className="card-title">{course.Name}</h2>
                                    <div className="justify-end card-actions">
                                        {user.Role == label.role.ADMIN && status == label.course.PENDING_APPROVAL && (
                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await service.updateCourse(
                                                        { Status: label.course.VISIBLE },
                                                        course.Course_ID,
                                                    );
                                                    setStatus(label.course.VISIBLE);
                                                }}
                                                className="mt-4 text-white btn btn-success"
                                            >
                                                Duyệt
                                            </button>
                                        )}
                                        {user.User_ID == course.User_ID && status == label.course.HIDDEN && (
                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await service.updateCourse(
                                                        { Status: label.course.VISIBLE },
                                                        course.Course_ID,
                                                    );
                                                    setStatus(label.course.VISIBLE);
                                                }}
                                                className="mt-4 text-white btn btn-success"
                                            >
                                                Hiện
                                            </button>
                                        )}
                                        {user.Role == label.role.ADMIN &&
                                            user.User_ID != course.User_ID &&
                                            status == label.course.VISIBLE && (
                                                <button
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        await service.updateCourse(
                                                            { Status: label.course.PENDING_APPROVAL },
                                                            course.Course_ID,
                                                        );
                                                        setStatus(label.course.PENDING_APPROVAL);
                                                    }}
                                                    className="mt-4 text-white btn btn-error"
                                                >
                                                    Hủy xét duyệt
                                                </button>
                                            )}
                                        {user.User_ID == course.User_ID && status == label.course.VISIBLE && (
                                            <button
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    await service.updateCourse(
                                                        { Status: label.course.HIDDEN },
                                                        course.Course_ID,
                                                    );
                                                    setStatus(label.course.HIDDEN);
                                                }}
                                                className="mt-4 text-white btn btn-active"
                                            >
                                                Ẩn
                                            </button>
                                        )}
                                        <button className="mt-4 btn btn-primary">Chi tiết</button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default CourseManager;
