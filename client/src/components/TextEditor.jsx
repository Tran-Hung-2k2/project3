import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (field) => {
    const handleChange = (content, delta, source, editor) => {
        field.onChange &&
            field.onChange({
                target: {
                    id: field.id,
                    value: content,
                },
            });
    };

    const editorStyle = {
        fontSize: '20px', // Đặt kích thước font mặc định ở đây
    };

    return (
        <ReactQuill
            {...field}
            onChange={handleChange}
            style={editorStyle}
            modules={{
                toolbar: [
                    ['bold', 'italic', 'underline'], // định dạng văn bản
                    ['blockquote', 'code-block'], // định dạng đoạn và mã nguồn
                    [{ list: 'ordered' }, { list: 'bullet' }], // danh sách có thứ tự và không thứ tự
                    [{ script: 'sub' }, { script: 'super' }], // chữ dưới và chữ trên
                    [{ indent: '-1' }, { indent: '+1' }], // thụt lề
                    [{ size: ['small', false, 'large', 'huge'] }], // kích thước văn bản
                    [{ header: '1' }, { header: '2' },{ header: '3' }], // tiêu đề
                    [{ color: [] }, { background: [] }], // màu chữ và nền
                    [{ font: [] }], // kiểu chữ
                    ['link', 'image', 'video'], // liên kết, hình ảnh, video
                    ['clean'], // xóa định dạng
                ],
                // toolbar: [
                //     ['bold', 'italic', 'underline', 'strike'], // định dạng văn bản
                //     ['blockquote', 'code-block'], // định dạng đoạn và mã nguồn
                //     [{ list: 'ordered' }, { list: 'bullet' }], // danh sách có thứ tự và không thứ tự
                //     [{ script: 'sub' }, { script: 'super' }], // chữ dưới và chữ trên
                //     [{ indent: '-1' }, { indent: '+1' }], // thụt lề
                //     [{ direction: 'rtl' }], // hướng văn bản
                //     [{ size: ['small', false, 'large', 'huge'] }], // kích thước văn bản
                //     [{ header: [1, 2, 3, 4, 5, 6, false] }], // tiêu đề
                //     [{ color: [] }, { background: [] }], // màu chữ và nền
                //     [{ font: [] }], // kiểu chữ
                //     ['link', 'image', 'video'], // liên kết, hình ảnh, video
                //     ['clean'], // xóa định dạng
                // ],
            }}
            formats={[
                'bold',
                'italic',
                'underline',
                'strike', // định dạng văn bản
                'blockquote',
                'code-block', // định dạng đoạn và mã nguồn
                'list',
                'bullet', // danh sách có thứ tự và không thứ tự
                'script',
                'script', // chữ dưới và chữ trên
                'indent',
                'indent', // thụt lề
                'direction', // hướng văn bản
                'size', // kích thước văn bản
                'header', // tiêu đề
                'color',
                'background', // màu chữ và nền
                'font', // kiểu chữ
                'link',
                'image',
                'video', // liên kết, hình ảnh, video
                'clean', // xóa định dạng
            ]}
        />
    );
};

export default TextEditor;
