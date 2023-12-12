import type from './category.type';

const initialState = {
    categories: [],
    Category_ID: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CATEGORY_ID:
            return {
                ...state,
                Category_ID: action.payload,
            };

        case type.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case type.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case type.UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category.Category_ID != action.payload.Category_ID ? category : action.payload,
                ),
            };

        case type.DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter((category) => category.Category_ID !== action.payload),
            };

        default:
            return state;
    }
};

export default reducer;
