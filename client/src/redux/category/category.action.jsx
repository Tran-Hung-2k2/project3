import type from './category.type';
import service from '../../services/category.service';

const action = {
    setCategoryID: (id) => ({
        type: type.SET_CATEGORY_ID,
        payload: id,
    }),

    getCategory: () => async (dispatch) => {
        const response = await service.getCategory();
        dispatch({
            type: type.GET_CATEGORIES,
            payload: response.data,
        });
    },

    addCategory: (data, callback) => async (dispatch) => {
        const response = await service.addCategory(data);
        dispatch({
            type: type.ADD_CATEGORY,
            payload: response.data,
        });
        if (callback) callback();
    },

    updateCategory: (data, id) => async (dispatch) => {
        const response = await service.updateCategory(data, id);
        dispatch({
            type: type.UPDATE_CATEGORY,
            payload: response.data,
        });
    },

    deleteCategory: (id) => async (dispatch) => {
        await service.deleteCategory(id);
        dispatch({
            type: type.DELETE_CATEGORY,
            payload: id,
        });
    },
};

export default action;
