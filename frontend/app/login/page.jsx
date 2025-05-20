"use client"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login() {

    const [role, setRole] = useState("patient")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const login = (e) => {
      e.preventDefault()
        console.log({
          email,
          password,
          role
      })
        router.push("/")
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Se connecter</CardTitle>
                            <CardDescription>
                                Entrez votre email ci-dessous pour vous connecter à votre compte
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={login}>
                                <div className="flex flex-col gap-6">
                                    <Tabs defaultValue="patient" onValueChange={setRole} className="w-full grid gap-2">
                                        <TabsList className="grid w-full grid-cols-4">
                                            <TabsTrigger value="admin">Admin</TabsTrigger>
                                            <TabsTrigger value="patient">Patient</TabsTrigger>
                                            <TabsTrigger value="medecin">Medecin</TabsTrigger>
                                            <TabsTrigger value="secretaire">Secretaire</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            placeholder="m@example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Se connecter
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
