import CategoryService from '../../services/categoryService';
import { CATEGORY_SET, CATEGORY_STATE_CLEAR, COMMON_MESSAGE_SET, COMMON_ERROR_SET, CATEGORIES_SET } from './actionTypes';
export const insertCategory = (category, navigate) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('Insert Category');
        const response = await service.insertCategory(category);
        if (response.status === 201) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Category inserted successfully',
            });
        }
        else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        console.log('ERROR' + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error,
        });
    }
    navigate('/categories/list');
};
export const getCategories = () => async (dispatch) => {
    const service = new CategoryService();
    try {
        console.log('Get Categories');
        const response = await service.getCategories();
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: CATEGORIES_SET,
                payload: response.data,
            });
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        
        }
    } catch (error) {
        console.log('error' + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error,
        });
    }
};
export const clearCategoryState = () =>  (dispatch) => {
    dispatch({
        type: CATEGORY_STATE_CLEAR,
    });
};
