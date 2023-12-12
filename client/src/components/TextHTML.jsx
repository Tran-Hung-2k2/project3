import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextHTML({ children, ...field }) {
    return <ReactQuill {...field} value={children} readOnly={true} theme={'bubble'} />;
}

export default TextHTML;
