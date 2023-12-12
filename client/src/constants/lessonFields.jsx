export const addFieldsReading = [
    {
        label: 'Tiêu đề',
        id: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Tiêu đề',
    },
    {
        label: 'Thứ tự',
        id: 'Index',
        type: 'number',
        required: true,
        placeholder: 'Thứ tự trong bài giảng 1, 2,...',
    },
    {
        label: 'Thời lượng (phút)',
        id: 'Duration',
        type: 'number',
        required: true,
        placeholder: 'Thời lượng dành cho khóa học',
    },
    {
        label: 'Nội dung',
        id: 'Content',
        type: 'editor',
        required: true,
        placeholder: 'Nội dung tiết học',
    },
];

export const addFieldsVideo = [
    {
        label: 'Tiêu đề',
        id: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Tiêu đề',
    },
    {
        label: 'Thứ tự',
        id: 'Index',
        type: 'number',
        required: true,
        placeholder: 'Thứ tự trong bài giảng 1, 2,...',
    },
    {
        label: 'Nội dung',
        id: 'Content',
        type: 'file',
        accept: 'video/mp4',
        required: true,
        placeholder: 'tiết học',
    },
];

export const updateFieldsReading = [
    {
        label: 'Bài giảng',
        id: 'Lecture_ID',
        type: 'select',
        options: [],
        required: true,
        placeholder: 'Bài giảng',
    },
    {
        label: 'Tiêu đề',
        id: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Tiêu đề',
    },
    {
        label: 'Thứ tự',
        id: 'Index',
        type: 'number',
        required: true,
        placeholder: 'Thứ tự trong bài giảng 1, 2,...',
    },
    {
        label: 'Thời lượng (phút)',
        id: 'Duration',
        type: 'number',
        required: true,
        placeholder: 'Thời lượng dành cho khóa học',
    },
    {
        label: 'Nội dung',
        id: 'Content',
        type: 'editor',
        required: true,
        placeholder: 'Nội dung tiết học',
    },
];

export const updateFieldsVideo = [
    {
        label: 'Bài giảng',
        id: 'Lecture_ID',
        type: 'select',
        options: [],
        required: true,
        placeholder: 'Bài giảng',
    },
    {
        label: 'Tiêu đề',
        id: 'Title',
        type: 'text',
        required: true,
        placeholder: 'Tiêu đề',
    },
    {
        label: 'Thứ tự',
        id: 'Index',
        type: 'number',
        required: true,
        placeholder: 'Thứ tự trong bài giảng 1, 2,...',
    },
    {
        label: 'Nội dung (Nếu không cần cập nhật vui lòng để trống)',
        id: 'Content',
        type: 'file',
        accept: 'video/mp4',
        required: true,
        placeholder: 'tiết học',
    },
];

