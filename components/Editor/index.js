'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from '@/styles/Editor.module.css'
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ isActive, handleSave, content, setContent }) => {

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
        <>
            {isActive ?
                <div
                    className={styles.quill}
                >
                    <button onClick={handleSave}>
                        Save
                    </button>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={content}
                        onChange={setContent}
                        style={{ height: '100%', width: '100%' }}
                    // className='.ql-align-right, .ql-direction-rtl'
                    />
                </div>
                :
                <div
                    className={styles.preview}
                    dangerouslySetInnerHTML={{
                        __html: content

                            .replaceAll(`class="ql-align-center"`, `style="text-align: center;"`)
                            .replaceAll(`class="ql-align-right"`, `style="text-align: right;"`)
                            // .replaceAll(`class="ql-align-left"`, `style="text-align: left;"`)

                            .replaceAll(`class="ql-size-small"`, `style="font-size: small;"`)
                            .replaceAll(`class="ql-size-large"`, `style="font-size: x-large;"`)
                            .replaceAll(`class="ql-size-huge"`, `style="font-size: xx-large;"`)

                    }}
                >
                </div>
            }
        </>
    );
};

export default RichTextEditor;
