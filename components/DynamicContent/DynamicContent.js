'use client'
import styles from '@/styles/Editor.module.css'
import RichTextEditor from '@/components/Editor'
import * as React from 'react'
import Context from '@/contexts/context'
import StartEditButton from '@/components/Editor/StartEditButton'

export default function DynamicContent({ pageName, tab = 'main', isHomePage = false, handleSroll }) {

    const { user, pages, permissions } = React.useContext(Context);
    const pageId = [...pages].filter(page => page.name === pageName)[0]?._id
    const [content, setContent] = React.useState('')
    const [originalContent, setOriginalContent] = React.useState('');
    const [lastEdit, setLastEdit] = React.useState()
    const [editedBy, setEditedBy] = React.useState('')
    const [updated, setUpdated] = React.useState(false)
    const [isEditingActive, setIsEditingActive] = React.useState(false)
    const marqueeRef = React.useRef()
    marqueeRef?.current?.start()

    React.useEffect(() => {
        const getPageContent = async () => {
            try {
                const fetchedContent = await fetch("/api/content", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pageId, pageName, tab })
                });
                const json = await fetchedContent.json();
                setContent(json.content);
                setOriginalContent(json.content); // Store original content for comparison
                setLastEdit(new Date(json.lastEdit));
                setEditedBy(json.editor);

            }
            catch (error) {
                console.log(error.message, "could_not_create_content");
            }
        }
        pageId && pageName && getPageContent();
    }, [pageId, pageName, tab])

    const handleSave = async () => {
        if (content !== originalContent) {
            try {
                const updatedContent = await fetch(`/api/content/${pageId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content, tab, user })
                });
                const json = await updatedContent.json();
                setLastEdit(new Date(json.lastEdit))
                setEditedBy(json.editor)
                setUpdated(true)
            }
            catch (error) {
                console.log(error.message, "could_not_update_content");
            }
        }
        setIsEditingActive(false)
    }

    const fixString = (str) => {
        const newStr = str
            .replaceAll(`class="ql-align-center"`, `style="text-align: center;"`)
            .replaceAll(`class="ql-align-right"`, `style="text-align: right;"`)
            .replaceAll(`class="ql-size-small"`, `style="font-size: small;"`)
            .replaceAll(`class="ql-size-large"`, `style="font-size: x-large;"`)
            .replaceAll(`class="ql-size-huge"`, `style="font-size: xx-large;"`)
            .replaceAll(`&lt;img src="`, `<img src="`)
            .replaceAll(`"/&gt;`, `"/>`)
        return fixLinksInString(newStr)
    }

    const fixLinksInString = (str) => {
        const newStr = str
            .replaceAll(`www`, `https://www`)
            .replaceAll(`https://https://`, `https://`)
        return newStr
    }

    const msgStr = (str) => {
        const newStr = fixLinksInString(str).replaceAll(`<p>`, `<p>•<p/>`).replace(`•`, ``)
        return newStr
    }

    const dateFormat = (date) => {

        const day = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        const month = (date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        const year = date.getFullYear()
        const fullDate = (`${day}/${month}/${year}`)

        const hour = date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        const minute = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
        const time = (`${hour}:${minute}`)

        const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
        const weekDay = weekDays[date.getDay()]

        return (
            <>
                <b>{fullDate}</b> בשעה {time} (יום {weekDay})
            </>
        )
    }

    return (
        <>
            {isEditingActive ?
                <RichTextEditor
                    content={content}
                    setContent={setContent}
                />
                :
                <>
                    {!isHomePage ?
                        <div
                            className={styles.preview}
                            dangerouslySetInnerHTML={{ __html: fixString(content) }}
                        >
                        </div>
                        :
                        <div style={{ width: '80%' }}>
                            <marquee
                                direction="right"
                                scrollamount="10"
                                ref={marqueeRef}
                                vspace="10"
                            >
                                <span
                                    className={styles.updates}
                                    style={{ display: 'flex', width: 'fit-content', direction: 'rtl' }}
                                    onMouseEnter={() => marqueeRef.current.stop()}
                                    onMouseLeave={() => marqueeRef.current.start()}
                                    dangerouslySetInnerHTML={{
                                        __html: msgStr(content)
                                    }}
                                >
                                </span>
                            </marquee>
                        </div>
                    }
                    {editedBy && lastEdit && user?.permissions === 'admin' &&
                        <div style={{ direction: 'rtl', textAlign: 'right', color: 'darkgray', marginTop: '4rem', maxWidth: '95%' }}>
                            <strong>{editedBy}</strong> ערכ/ה את תוכן הדף ב - {dateFormat(updated ? new Date() : lastEdit)}
                        </div>
                    }
                </>
            }

            {
                // viewStartEditButton && 
                (permissions === 'admin' || permissions === pageId) &&
                <StartEditButton
                    isEditingActive={isEditingActive}
                    setIsEditingActive={setIsEditingActive}
                    handleSave={handleSave}
                    handleSroll={handleSroll}
                />
            }

        </>
    )
}