"use client"

import {use, useEffect, useState} from "react";
import {Header} from "@/components/header";
import {deleteRendezVous, getAllPatients, getAllRendezVous, getUser} from "@/services/Services";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Eye, ArrowLeft, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import NewUser from "@/components/NewUser";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import UpdateUser from "@/components/UpdateUser";
import NewRendezVous from "@/components/NewRendezVous";
import UpdateRendezVous from "@/components/UpdateRendezVous";
import {useRouter} from "next/navigation";

export default function Patient({params}) {
    const {id} = use(params);
    const [patient, setPatient] = useState({});
    const [rendezVous, setRendezVous] = useState([]);

    const router = useRouter();

    const fetchData = () => {
        getUser(id, "patients").then(data => setPatient(data?.data || [])).catch(console.error);
        getAllRendezVous("patient", id).then(data => setRendezVous(data?.data || [])).catch(console.error);
    }

    useEffect(() => {
        fetchData();
    }, [id])

    const deleterendezvous = (id) => {
        deleteRendezVous(id).then(data => fetchData()).catch(console.error);
    }

    return (<>
        <Header/>
        <div className="flex min-h-screen">
            <main className="flex-1 p-6 space-y-6">
                <header className="flex items-center">
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={router.back}
                        aria-label=""
                        className="p-2"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-semibold">{patient?.prenom + " " + patient?.name}</h1>
                        <p>Date Naissance : {patient?.dateNaissance}</p>
                    </div>

                </header>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Tabs defaultValue="rendez-vous" className="w-full md:col-span-3">
                        <TabsList>
                            <TabsTrigger value="rendez-vous">Rendez-vous</TabsTrigger>
                            <TabsTrigger value="dme">Dossier Medicale Electronique</TabsTrigger>
                        </TabsList>

                        <TabsContent key="rendez-vous" value="rendez-vous" className="mt-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">

                                    <div>
                                        <CardTitle>Rendez-vous</CardTitle>
                                        <CardDescription>Gestion des Rendez-vous</CardDescription>
                                    </div>

                                    {/*<NewUser role={"patients"} refreshData={fetchData()}/>*/}
                                    <NewRendezVous refreshData={fetchData()}/>

                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>Liste des Rendez-vous</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>date</TableHead>
                                                <TableHead>status</TableHead>
                                                <TableHead>medecin</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rendezVous.map((item) => (
                                                <TableRow key={item?.id}>
                                                    {/*<TableCell>{item?.date}</TableCell>*/}
                                                    <TableCell>{new Date(item?.date).toLocaleString('fr-FR', {
                                                        dateStyle: 'full',
                                                        timeStyle: 'short',
                                                    })}</TableCell>
                                                    <TableCell>{item?.status}</TableCell>
                                                    <TableCell>{item?.medecin?.prenom + " " + item?.medecin?.name}</TableCell>
                                                    <TableCell
                                                        className="text-right space-x-2 flex justify-end items-center">
                                                        <UpdateRendezVous refreshData={fetchData}
                                                                          id={item.id}/>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => deleterendezvous(item?.id)}
                                                            aria-label="Delete user"
                                                            className="p-2"
                                                        >
                                                            <Trash2 className="h-4 w-4"/>
                                                        </Button>
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>
            </main>
        </div>
    </>)
}