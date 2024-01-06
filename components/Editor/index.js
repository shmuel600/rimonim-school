'use client';
import ReactQuill from 'react-quill';
import styles from '@/styles/Editor.module.css'
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ content, setContent }) => {

    const modules = {
        toolbar: [
            // [{ 'font': [] }],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'video'],
            [{ 'color': [] }],
            [
                // { 'align': [false] },
                // { 'align': 'justify' },
                { 'align': 'center' },
                { 'align': 'right' },
            ],
            // [{ 'direction': 'rtl' }],
        ],
    };

    const formats = [
        // 'font',
        'header',
        'size',
        'bold', 'italic', 'underline', 'strike',
        'link', 'image', 'video',
        'color',
        'align',
        // 'direction'
    ];

    return (
        <div
            className={styles.quill}
        >
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
};

export default RichTextEditor;
