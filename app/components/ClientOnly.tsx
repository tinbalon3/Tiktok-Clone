'use client'
import React , {useEffect,useState} from 'react'
export default function ClientOnly({
    children,
}: {
    children: React.ReactNode
}) {
    const [isClinet, setIsClient] = useState(false)
useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>{isClinet ? <div>{children}</div> : null}</>
    )
}