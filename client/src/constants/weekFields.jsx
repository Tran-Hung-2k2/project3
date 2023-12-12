const fields = [
    {
        label: 'Tiêu đề',
        id: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Tiêu đề',
    },
    {
        label: 'Thư tự',
        id: 'Index',
        type: 'number',
        required: true,
        placeholder: 'Thứ tự trong khóa học 1, 2,...',
    },
    {
        label: 'Mô tả',
        id: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Mô tả tuần học',
    },
    {
        label: 'Mục tiêu',
        id: 'Target',
        type: 'editor',
        required: true,
        placeholder: 'Mục tiêu',
    },
];

export default fields;
