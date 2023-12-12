import label from './label';

const transformObjectToArray = (obj) => {
    const res = Object.entries(obj).map(([key, value]) => ({
        [value]: value,
    }));
    return res;
};

export const addFields = [
    {
        label: 'Tên khóa học',
        id: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Tên khóa học',
    },
    {
        label: 'Ảnh khóa học',
        id: 'Image',
        type: 'file',
        accept: 'image/*',
        required: true,
        placeholder: 'Ảnh khóa học',
    },
    {
        label: 'Cấp độ khóa học',
        id: 'Level',
        type: 'select',
        options: transformObjectToArray(label.course_level),
        required: true,
        placeholder: 'Cấp độ khóa học',
    },
    {
        label: 'Loại khóa học',
        id: 'Category_ID',
        type: 'select',
        options: [],
        required: true,
        placeholder: 'Loại khóa học',
    },
    {
        label: 'Yêu cầu xét duyệt',
        id: 'Need_Approval',
        type: 'checkbox',
        required: false,
        placeholder: 'Yêu cầu xét duyệt khi đăng ký khóa học',
    },
    {
        label: 'Mô tả khóa học',
        id: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Mô tả khóa học',
    },
];

export const updateFields = [
    {
        label: 'Tên khóa học',
        id: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Tên khóa học',
    },
    {
        label: 'Ảnh khóa học (Để trống nếu không cần cập nhật)',
        id: 'Image',
        type: 'file',
        accept: 'image/*',
        required: true,
        placeholder: 'Ảnh khóa học',
    },
    {
        label: 'Cấp độ khóa học',
        id: 'Level',
        type: 'select',
        options: transformObjectToArray(label.course_level),
        required: true,
        placeholder: 'Cấp độ khóa học',
    },
    {
        label: 'Loại khóa học',
        id: 'Category_ID',
        type: 'select',
        options: [],
        required: true,
        placeholder: 'Loại khóa học',
    },
    {
        label: 'Yêu cầu xét duyệt',
        id: 'Need_Approval',
        type: 'checkbox',
        required: false,
        placeholder: 'Yêu cầu xét duyệt khi đăng ký khóa học',
    },
    {
        label: 'Mô tả khóa học',
        id: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Mô tả khóa học',
    },
];