"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {SearchIcon, Trash2, Eye} from "lucide-react";
import {useEffect, useState} from "react";
import NewUser from "@/components/NewUser";
import {
    deleteMedecins,
    deletePatient, deleteRendezVous, deletesecretaires,
    getAllMedecins,
    getAllPatients, getAllRendezVous,
    getAllSecretaires
} from "@/services/Services";
import UpdateUser from "@/components/UpdateUser";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import UpdateRendezVous from "@/components/UpdateRendezVous";
import NewRendezVous from "@/components/NewRendezVous";

export default function Secretaires() {

    const [patients, setPatients] = useState([]);
    const [rendezVous, setRendezVous] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = () => {
        getAllPatients().then(data => {setPatients(data?.data || [])}).catch(console.error);
        getAllRendezVous().then(data=>setRendezVous(data?.data || [])).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = (role, id) => {
        if (role === "patients") {
            deletePatient(id)
                .then(() => fetchData())
                .catch(console.error);
        }
    }

    const filteredPatients = patients.filter((item) =>
        item?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleterendezvous = (id) => {
        deleteRendezVous(id).then(data => fetchData()).catch(console.error);
    }

    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-6 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Secretaires Dashboard</h1>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Tabs defaultValue="patients" className="w-full md:col-span-3">
                        <TabsList>
                            <TabsTrigger value="patients">Gestion des Patients</TabsTrigger>
                            <TabsTrigger value="rendez-vous">Gestion des Rendez-vous</TabsTrigger>
                        </TabsList>

                        <TabsContent key="patients" value="patients" className="mt-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">

                                    <div>
                                        <CardTitle>Patients</CardTitle>
                                        <CardDescription>Gestion des Patients</CardDescription>
                                    </div>
                                    <div
                                        className="flex items-center w-full max-w-sm space-x-2 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2">
                                        <SearchIcon className="h-4 w-4"/>
                                        <Input type="search" placeholder="Recherche" value={searchQuery}
                                               onChange={(e) => setSearchQuery(e.target.value)}
                                               className="w-full border-0 h-8 font-semibold"/>
                                    </div>
                                    <NewUser role={"patients"} refreshData={fetchData()}/>


                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>Liste de Patients</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead></TableHead>
                                                <TableHead>Prénom</TableHead>
                                                <TableHead>Nom</TableHead>
                                                <TableHead>Date Naissance</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredPatients.map((item) => (
                                                <TableRow key={item?.id}>
                                                    <TableCell>
                                                        <Avatar>
                                                            <AvatarFallback>{item?.prenom[0] + item?.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{item?.prenom}</TableCell>
                                                    <TableCell>{item?.name}</TableCell>
                                                    <TableCell>{item?.dateNaissance}</TableCell>
                                                    <TableCell
                                                        className="text-right space-x-2 flex justify-end items-center">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="p-2"
                                                        >
                                                            <Link href={"/patient/" + item?.id}>
                                                                <Eye className="h-4 w-4"/></Link>
                                                        </Button>


                                                        <UpdateUser role={"patients"} refreshData={fetchData}
                                                                    id={item.id}/>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => deleteUser("patients", item?.id)}
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
                        <TabsContent key="rendez-vous" value="rendez-vous" className="mt-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Rendez-vous</CardTitle>
                                        <CardDescription>Gestion des Rendez-vous</CardDescription>
                                    </div>
                                    <NewRendezVous refreshData={fetchData}/>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>Liste des Rendez-vous</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Patient</TableHead>
                                                <TableHead>Médecin</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rendezVous.map((item) => (
                                                <TableRow key={item?.id}>
                                                    <TableCell>{new Date(item?.date).toLocaleString()}</TableCell>
                                                    <TableCell>{item?.patient?.prenom + " " + item?.patient?.name}</TableCell>
                                                    <TableCell>{item?.medecin?.prenom + " " + item?.medecin?.name}</TableCell>
                                                    <TableCell>{item?.status}</TableCell>
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
    )
}