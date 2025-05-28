"use client"

import {useEffect, useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {Skeleton} from "@/components/ui/skeleton"
import {me} from "@/services/Services";

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        me()
            .then(data => {
                setUser(data?.data.user)
                setRole(data?.data.role)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[])
    if (loading) {
        return (
            <div className="p-4">
                <Skeleton className="h-6 w-1/3 mb-4"/>
                <Skeleton className="h-16 w-full"/>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="p-4 text-red-500">
                You are not logged in. Please login to view your profile.
            </div>
        )
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Card>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="/avatar.png" alt="User avatar"/>
                        <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold">{user?.name + " " + user?.prenom}</h2>
                        <p className="text-sm text-muted-foreground">
                            Role: {role}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
