import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import label from '../constants/label';

function RequireOrg() {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    return user && [label.role.ADMIN, label.role.ORGANIZATION].includes(user.Role) ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireOrg;
