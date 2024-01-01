import { lazy } from 'react';

const BalanceAdd = lazy(() => import('../pages/BalanceAdd'));

const coreRoutes = [
    {
        path: '/parking/in-out',
        component: BalanceAdd,
    },
];

const routes = [...coreRoutes];
export default routes;
