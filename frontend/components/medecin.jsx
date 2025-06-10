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
    getAllSecretaires, getRendezVousByMedecin
} from "@/services/Services";
import UpdateUser from "@/components/UpdateUser";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import UpdateRendezVous from "@/components/UpdateRendezVous";

export default function Medecin() {

    const [patients, setPatients] = useState([]);
    const [rendezVous, setRendezVous] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = () => {
        getAllPatients().then(data => setPatients(data?.data || [])).catch(console.error);
        getRendezVousByMedecin().then(data=>setRendezVous(data?.data || [])).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredPatients = patients.filter((item) =>
        item?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="flex min-h-screen">
            <main className="flex-1 p-6 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Medecin Dashboard</h1>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Tabs defaultValue="patients" className="w-full md:col-span-3">
                        <TabsList>
                            <TabsTrigger value="rendez-vous">Gestion des Rendez-vous</TabsTrigger>
                        </TabsList>

                        <TabsContent key="rendez-vous" value="rendez-vous" className="mt-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Rendez-vous</CardTitle>
                                        <CardDescription>Gestion des Rendez-vous</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>Liste des Rendez-vous</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>date</TableHead>
                                                <TableHead>status</TableHead>
                                                <TableHead>patient</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rendezVous.map((item) => (
                                                <TableRow key={item?.id}>
                                                    <TableCell>{new Date(item?.date).toLocaleString('fr-FR', {
                                                        dateStyle: 'full',
                                                        timeStyle: 'short',
                                                    })}</TableCell>
                                                    <TableCell>{item?.status}</TableCell>
                                                    <TableCell>{item?.patient?.prenom + " " + item?.patient?.name}</TableCell>
                                                    <TableCell
                                                        className="text-right space-x-2 flex justify-end items-center">
                                                        <div className="flex flex-wrap gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="p-2"
                                                            >
                                                                <Link href={"/patient/" + item?.patient?.id}>
                                                                    <Eye className="h-4 w-4"/></Link>
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                aria-label="Annuler le rendez-vous"
                                                                className="p-2"
                                                            >
                                                                Annulé
                                                            </Button>

                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                aria-label="Marquer comme terminé"
                                                                className="p-2"
                                                            >
                                                                Terminé
                                                            </Button>
                                                        </div>

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