import { lazy } from 'react';

const UserProfile = lazy(() => import('../pages/UserProfile'));
const UserManager = lazy(() => import('../pages/UserManager'));
const ManagerAdd = lazy(() => import('../pages/ManagerAdd'));
const UserParkingManager = lazy(() => import('../pages/UserParkingManager'));
const ParkingManagerAdd = lazy(() => import('../pages/ParkingManagerAdd'));
const BalanceAdd = lazy(() => import('../pages/BalanceAdd'));


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
        path: '/user/add',
        component: ManagerAdd,
    },
    {
        path: '/user/parking_manager',
        component: UserParkingManager,
    },
    {
        path: '/parking_manager/add',
        component: ParkingManagerAdd,
    },
    {
        path: '/balance/add',
        component: BalanceAdd,
    },
];

const routes = [...coreRoutes];
export default routes;
