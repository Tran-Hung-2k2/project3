import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import label from '../constants/label';
import Loader from '../components/Loader';
import ButtonBack from '../components/ButtonBack';
import service from '../services/lesson.service';

const Lesson = () => {
    const [lesson, setLesson] = useState();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await service.getLesson({ Lesson_ID: id });
            setLesson(res.data[0]);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <>
            <ButtonBack className="ml-6" />
            {loading ? (
                <Loader />
            ) : (
                <div className="m-6">
                    <h2>{lesson.Title}</h2>
                    {lesson.Type == label.lesson_type.READING ? (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
                        </div>
                    ) : (
                        <video id="uploadedVideo" src={lesson.Content} controls></video>
                    )}
                </div>
            )}
        </>
    );
};

export default Lesson;
