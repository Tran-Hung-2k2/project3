const make_obj_data = (is_error = false, message = 'Thành công', ...data) => {
    if (typeof is_error !== 'boolean') {
        throw new Error('Tham số is_error phải là kiểu boolean');
    }

    if (typeof message !== 'string') {
        throw new Error('Tham số message phải là kiểu chuỗi');
    }

    return {
        is_error,
        message,
        details: {
            body: [{ message }],
        },
        ...data,
    };
};

export default make_obj_data;