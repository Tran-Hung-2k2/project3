import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

import LessonInfo from './LessonInfo';
import action from '../redux/course/lecture.action';
import confirm from '../utils/confirm';

function LectureInfo({ week, owner }) {
    const dispatch = useDispatch();

    function deleteLecture(lecture, index) {
        confirm({
            title: 'Xóa bài giảng',
            message: `Khi bạn xác nhận Bài giảng ${index + 1}: ${
                lecture.Lecture_Title
            } cùng với các TIẾT HỌC của bài giảng này sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: () => {
                dispatch(action.deleteLecture(lecture.Lecture_ID));
            },
        });
    }

    return (
        <>
            {_.sortBy(week.Lectures, ['Index', 'createdAt']).map((lecture, index) => (
                <details
                    key={lecture.Lecture_ID}
                    className="rounded-md collapse collapse-arrow hover:border border-primary"
                >
                    <summary className="!flex items-center justify-between text-lg font-medium collapse-title hover:bg-sky-50 text-stone-700 group hover:opacity-100">
                        <div className="">
                            Bài giảng {index + 1}: {lecture.Lecture_Title}
                        </div>
                        <div className="z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                            {owner && (
                                <Link to="/lecture/edit">
                                    <FaRegEdit
                                        onClick={() => {
                                            dispatch(action.addLecture(lecture.Lecture_ID));
                                        }}
                                        className="inline-block mr-10 text-green-600"
                                    />
                                </Link>
                            )}
                            {owner && (
                                <RiDeleteBinLine
                                    onClick={() => deleteLecture(lecture, index)}
                                    className="inline-block mr-10 text-error"
                                />
                            )}
                        </div>
                    </summary>

                    <div className="collapse-content">
                        <LessonInfo {...{ lecture, owner }} />
                    </div>
                </details>
            ))}
            {owner && (
                <Link
                    to="/lecture/add"
                    onClick={() => dispatch(action.addWeek(week.Week_ID))}
                    className="w-full mt-4 btn btn-outline btn-success"
                >
                    Thêm bài giảng
                </Link>
            )}
        </>
    );
}

export default LectureInfo;
