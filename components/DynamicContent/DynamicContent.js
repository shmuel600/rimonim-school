'use client'
import RichTextEditor from '@/components/Editor'
import * as React from 'react'
import Context from '@/contexts/context'
import StartEditButton from '@/components/Editor/StartEditButton'

export default function DynamicContent({ pageName, pageType, viewStartEditButton = true }) {
    const { pages } = React.useContext(Context);
    const pageId = [...pages].filter(page => page.name === pageName)[0]?._id
    const [content, setContent] = React.useState('')
    const [isEdittingActive, setIsEdittingActive] = React.useState(false)

    React.useEffect(() => {
        const getPageContent = async () => {
            try {
                const fetchedContent = await fetch("/api/content", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pageId, pageName })
                });
                const json = await fetchedContent.json();
                setContent(json.content);
            }
            catch (error) {
                console.log(error.message, "could_not_create_content");
            }
        }
        console.log(pageId, pageName);
        pageId && pageName && getPageContent();
    }, [pageId, pageName])

    const handleSave = async () => {
        try {
            await fetch(`/api/content/${pageId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });
        }
        catch (error) {
            console.log(error.message, "could_not_update_content");
        }
        setIsEdittingActive(false)
    }

    return (
        <>
            <RichTextEditor
                isActive={isEdittingActive}
                handleSave={handleSave}
                content={content}
                setContent={setContent}
            />
            {!isEdittingActive && viewStartEditButton && <StartEditButton setIsActive={setIsEdittingActive} />}
        </>
    )
}