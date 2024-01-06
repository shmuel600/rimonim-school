'use client'
import styles from '@/styles/Editor.module.css'
import RichTextEditor from '@/components/Editor'
import * as React from 'react'
import Context from '@/contexts/context'
import StartEditButton from '@/components/Editor/StartEditButton'

export default function DynamicContent({ pageName, pageType, tab = 'main', viewStartEditButton = true, isHomePage = false }) {
    const { pages, permissions } = React.useContext(Context);
    const marqueeRef = React.useRef()
    const pageId = [...pages].filter(page => page.name === pageName)[0]?._id
    const [content, setContent] = React.useState('')
    const [isEditingActive, setIsEditingActive] = React.useState(false)

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
            }
            catch (error) {
                console.log(error.message, "could_not_create_content");
            }
        }
        pageId && pageName && getPageContent();
    }, [pageId, pageName, tab])

    const handleSave = async () => {
        try {
            await fetch(`/api/content/${pageId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, tab })
            });
        }
        catch (error) {
            console.log(error.message, "could_not_update_content");
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

    return (
        <>
            {isEditingActive ?
                <RichTextEditor
                    content={content}
                    setContent={setContent}
                />
                :
                (
                    !isHomePage ?
                        <div
                            className={styles.preview}
                            dangerouslySetInnerHTML={{ __html: fixString(content) }}
                        >
                        </div>
                        :
                        <marquee
                            direction="right"
                            scrollamount="10"
                            ref={marqueeRef}
                            style={{ maxWidth: '80%' }}
                        >
                            <span
                                className={styles.updates}
                                style={{ display: 'flex', maxWidth: 'fit-content', direction: 'rtl' }}
                                onMouseEnter={() => marqueeRef.current.stop()}
                                onMouseLeave={() => marqueeRef.current.start()}
                                dangerouslySetInnerHTML={{
                                    __html: msgStr(content)
                                }}
                            >
                            </span>
                        </marquee>
                )
            }

            {
                viewStartEditButton && (permissions === 'admin' || permissions === pageId) &&
                <StartEditButton
                    isEditingActive={isEditingActive}
                    setIsEditingActive={setIsEditingActive}
                    handleSave={handleSave}
                />
            }

        </>
    )
}