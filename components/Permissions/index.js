'use client'
import * as React from "react"
import { useSession } from "next-auth/react"
import Context from '@/contexts/context'

export default function Permissions() {

    const { data: session } = useSession()
    const { user, setUser } = React.useContext(Context);

    React.useEffect(() => {
        const signUserIn = async () => {
            const userDetails = {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
            }
            try {
                const fetchedUser = await fetch("/api/user", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userDetails)
                });
                const json = await fetchedUser.json();
                setUser(json);
            }
            catch (error) {
                console.log(error.message, "could_not_create_user");
            }
        }
        session?.user && !user && signUserIn();
    }, [session, user, setUser])

    return (
        <>
        </>
    )
}