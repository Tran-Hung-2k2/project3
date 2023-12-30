import { lazy } from 'react';

const UserProfile = lazy(() => import('../pages/UserProfile'));
const CourseManager = lazy(() => import('../pages/CourseManager'));
const UserManager = lazy(() => import('../pages/UserManager'));


const coreRoutes = [
    {
        path: '/user/profile',
        component: UserProfile,
    },
    {
        path: '/user/manager',
        component: UserManager,
    },
    {
        path: '/course/manager',
        component: CourseManager,
    },
];

const routes = [...coreRoutes];
export default routes;
