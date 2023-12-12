import { GrUserManager } from 'react-icons/gr';
import { SiCoursera } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import label from '../constants/label';
import { useSelector } from 'react-redux';

const menuItem = [
    { label: 'MENU' },
    {
        title: 'Người dùng',
        role: [label.role.ADMIN],
        child: [
            {
                path: '/user/manager',
                title: 'Quản lý người dùng',
                role: [label.role.ADMIN],
            },
        ],
        icon: <GrUserManager />,
    },
    {
        title: 'Khóa học',
        role: [label.role.ADMIN, label.role.ORGANIZATION],
        child: [
            {
                path: '/course/manager',
                title: 'Quản lý khóa học',
                role: [label.role.ADMIN, label.role.ORGANIZATION],
            },
            {
                path: '/course/add',
                title: 'Thêm khóa học',
                role: [label.role.ADMIN, label.role.ORGANIZATION],
            },
            {
                path: '/course/approval',
                title: 'Xét duyệt học viên',
                role: [label.role.ADMIN, label.role.ORGANIZATION],
            },
        ],
        icon: <SiCoursera />,
    },
    {
        title: 'Danh mục khóa học',
        role: [label.role.ADMIN],
        child: [
            {
                path: '/category/manager',
                title: 'Quản lý danh mục',
                role: [label.role.ADMIN],
            },
            {
                path: '/category/add',
                title: 'Thêm danh mục',
                role: [label.role.ADMIN],
            },
        ],
        icon: <BiCategory />,
    },
    {
        label: 'OTHER',
    },
    {
        path: '/signin',
        title: 'Đăng xuất',
        role: [...Object.values(label.role)],
    },
];

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className="overflow-x-hidden bg-white shadow-md drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="p-3 bg-white menu">
                {/* Sidebar content here */}
                {/* <!-- SIDEBAR HEADER --> */}
                <div className="flex items-center justify-between gap-2 px-6 pt-5.5">
                    <NavLink to="/" className="flex items-center justify-center w-full">
                        <p className="px-0 py-3 text-4xl font-bold text-primary">Coursera</p>
                    </NavLink>
                </div>
                {/* <!-- SIDEBAR HEADER --> */}

                <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                    {/* <!-- Sidebar Menu --> */}
                    <nav className="lg:px-2">
                        {/* <!-- Menu Group --> */}
                        <ul className="w-full menu rounded-box">
                            {menuItem.map((item, index) =>
                                item.label ? (
                                    <h3
                                        key={index}
                                        className="pt-1 pb-1 mt-6 ml-4 text-base font-bold text-bodylight2 dark:text-white"
                                    >
                                        {item.label}
                                    </h3>
                                ) : item.role.includes(user.Role) ? (
                                    <li key={index}>
                                        {item.child ? (
                                            <details open>
                                                <summary className="relative text-lg gap-2.5 rounded-sm py-2 px-4 font-medium text-bodylight1 duration-300 ease-in-out dark:hover:bg-meta-4 dark:text-white">
                                                    <span className={`w-6 h-4.5`}>{item.icon}</span>
                                                    {item.title}
                                                </summary>
                                                <ul>
                                                    {item.child.map((subItem, subIndex) =>
                                                        subItem.role.includes(user.Role) ? (
                                                            <li key={subIndex}>
                                                                <NavLink
                                                                    to={subItem.path}
                                                                    className={({ isActive }) =>
                                                                        'text-base relative flex items-center gap-2.5 rounded-md font-medium duration-300 ease-in-out hover:text-bodylight dark:text-white transform hover:scale-105 ' +
                                                                        (isActive && 'link-primary')
                                                                    }
                                                                >
                                                                    {subItem.title}
                                                                </NavLink>
                                                            </li>
                                                        ) : (
                                                            <p key={subIndex}></p>
                                                        ),
                                                    )}
                                                </ul>
                                            </details>
                                        ) : (
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    (isActive && '!bg-primary !text-white') +
                                                    ' dark:hover:bg-meta-4 text-lg rounded-md  font-medium text-bodylight1 duration-300 ease-in-out dark:text-white transform hover:scale-105'
                                                }
                                            >
                                                <span className={`w-6 h-4.5`}>{item.icon}</span>
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </li>
                                ) : (
                                    <p key={index}></p>
                                ),
                            )}
                        </ul>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;
