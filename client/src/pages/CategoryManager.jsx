import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';

import Loader from '../components/Loader';
import action from '../redux/category/category.action';
import convertTime from '../utils/convertTime';
import confirm from '../utils/confirm';

const CategoryManager = () => {
    const [loading, setLoading] = useState(true);
    const { categories } = useSelector((state) => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(action.getCategory());
        setLoading(false);
    }, []);

    function deleteCategory(category) {
        confirm({
            title: 'Xóa danh mục khóa học',
            message: `Khi bạn xác nhận Danh mục "${category.Name}" cùng với các KHÓA HỌC thuộc danh mục này sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn vẫn muốn xóa?`,
            onConfirm: () => {
                dispatch(action.deleteCategory(category.Category_ID));
            },
        });
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="m-8 overflow-x-auto w-fit">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.Category_ID}>
                                    <th>{index + 1}</th>
                                    <td className="flex items-center gap-3">
                                        {category.Name}
                                        <Link
                                            to="/category/edit"
                                            onClick={() => dispatch(action.setCategoryID(category.Category_ID))}
                                            className="ml-2 text-lg text-green-700"
                                        >
                                            <FaRegEdit />
                                        </Link>
                                        <Link className="text-xl text-error" onClick={() => deleteCategory(category)}>
                                            <TiDeleteOutline />
                                        </Link>
                                    </td>
                                    <td>{convertTime(category.createdAt)}</td>
                                    <td>{convertTime(category.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default CategoryManager;
