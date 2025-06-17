"use client"

import Admin from "@/components/admin";
import {Header} from "@/components/header";
import Secretaires from "@/components/secretaires";
import Medecin from "@/components/medecin";
import {useEffect, useState} from "react";
import {me} from "@/services/Services";
import {Skeleton} from "@/components/ui/skeleton";
import Cookies from "js-cookie"
import {useRouter} from "next/navigation";

export default function Home() {
    const [role, setRole] = useState()
    const [user,setUser] = useState()
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        me()
            .then(data => {
                setRole(data?.data?.role)
                setUser(data?.data?.user)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])
    console.log(user)

    useEffect(() => {
        if (!loading && !role) {
            router.push("/login")
        }
        if (role==="ROLE_PATIENT"){
            router.push("/patient/"+user?.id)
        }
    }, [loading, role, router])

    if (loading) {
        return (
            <div className="p-4">
                <Skeleton className="h-6 w-1/3 mb-4"/>
                <Skeleton className="h-16 w-full"/>
            </div>
        )
    }

    return (
        <>
            <Header/>
            {role === "ROLE_ADMIN" && <Admin/>}
            {role === "ROLE_SECRETAIRE_MEDICAL" && <Secretaires/>}
            {role === "ROLE_MEDECIN" && <Medecin/>}
        </>
    );
}
