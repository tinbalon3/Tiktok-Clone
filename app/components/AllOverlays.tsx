'use client'
import React  from 'react'
import { useGeneralStore } from '../store/general'
import ClientOnly from './ClientOnly';
import AuthOverlay from './AuthOverlay';
import EditProfileOverlay from './profile/EditProfileOverlay';
export default function AllOverlays() {
    const { isLoginOpen, isEditProfileOpen } = useGeneralStore();
   
    return (
        <>
       <ClientOnly>
        {isLoginOpen ? <AuthOverlay /> : null}
        {isEditProfileOpen ? <EditProfileOverlay /> : null}
       </ClientOnly>
        </>
    )
}