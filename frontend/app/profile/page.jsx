"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { me } from "@/services/Services"
import { StethoscopeIcon, UserCircle2Icon, ClipboardListIcon } from "lucide-react"

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        me()
            .then(data => {
                setUser(data?.data.user)
                setRole(data?.data.role)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-8 w-1/4 mx-auto" />
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="p-4 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-flex items-center gap-2">
                    <UserCircle2Icon className="w-5 h-5" />
                    <span>You are not logged in. Please login to view your profile.</span>
                </div>
            </div>
        )
    }

    const isMedicalStaff = role.toLowerCase() !== "patient"

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-blue-100">
                            <AvatarImage src="/medical-avatar.png" alt="User avatar" />
                            <AvatarFallback className="bg-blue-50 text-blue-600 text-3xl">
                                {(user?.name?.[0] + user?.prenom?.[0]) ?? "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-2">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user?.name} {user?.prenom}
                                </h2>
                                <Badge
                                    variant={isMedicalStaff ? "default" : "outline"}
                                    className={isMedicalStaff ? "bg-blue-600" : ""}
                                >
                                    <div className="flex items-center gap-1">
                                        {isMedicalStaff && <StethoscopeIcon className="w-3 h-3" />}
                                        {role}
                                    </div>
                                </Badge>
                            </div>

                            {isMedicalStaff && (
                                <div className="mt-3 flex items-center gap-1 text-sm text-blue-600">
                                    <ClipboardListIcon className="w-4 h-4" />
                                    <span>{role} at Hospital System</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h3 className="font-semibold text-gray-700 mb-3">
                            {isMedicalStaff ? "Professional Information" : "Patient Information"}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium">{user?.name} {user?.prenom}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="font-medium">{role}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}