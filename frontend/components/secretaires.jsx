"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Trash2,
    Eye,
    Plus,
    Users,
    Calendar,
    Activity,
    UserCheck,
    Clock,
    Edit,
    Phone,
    Mail
} from "lucide-react";
import { useEffect, useState } from "react";
import NewUser from "@/components/NewUser";
import {
    deletePatient,
    getAllPatients,
    getAllRendezVous,
    deleteRendezVous
} from "@/services/Services";
import UpdateUser from "@/components/UpdateUser";
import Link from "next/link";
import UpdateRendezVous from "@/components/UpdateRendezVous";
import NewRendezVous from "@/components/NewRendezVous";

export default function Secretaires() {
    const [patients, setPatients] = useState([]);
    const [rendezVous, setRendezVous] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("patients");

    const fetchData = () => {
        getAllPatients().then(data => { setPatients(data?.data || []) }).catch(console.error);
        getAllRendezVous().then(data => setRendezVous(data?.data || [])).catch(console.error);
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
    };

    const deleterendezvous = (id) => {
        deleteRendezVous(id).then(data => fetchData()).catch(console.error);
    };

    const filteredPatients = patients.filter((item) =>
        item?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmé':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'en attente':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'annulé':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <main className="p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Dashboard Secrétaires
                        </h1>
                        <p className="text-gray-600 text-lg">Gestion des patients et rendez-vous</p>
                    </div>
                    {/*<div className="flex items-center space-x-4">*/}
                    {/*    <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border">*/}
                    {/*        <Activity className="h-5 w-5 text-green-500" />*/}
                    {/*        <span className="text-sm font-medium">Système actif</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">Total Patients</p>
                                    <p className="text-3xl font-bold">{patients.length}</p>
                                </div>
                                <Users className="h-10 w-10 text-blue-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">Rendez-vous</p>
                                    <p className="text-3xl font-bold">{rendezVous.length}</p>
                                </div>
                                <Calendar className="h-10 w-10 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">Confirmés</p>
                                    <p className="text-3xl font-bold">
                                        {rendezVous.filter(rv => rv.status === 'terminé').length}
                                    </p>
                                </div>
                                <UserCheck className="h-10 w-10 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <Tabs defaultValue="patients" onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-white shadow-sm border-0 rounded-xl">
                            <TabsTrigger
                                value="patients"
                                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                            >
                                <Users className="h-4 w-4" />
                                <span>Gestion des Patients</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="rendez-vous"
                                className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                            >
                                <Calendar className="h-4 w-4" />
                                <span>Gestion des Rendez-vous</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="patients" className="mt-6">
                            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="border-b border-gray-100 pb-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                        <div className="space-y-1">
                                            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                                <Users className="h-6 w-6 text-blue-500" />
                                                <span>Patients</span>
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Gérez vos patients et leurs informations
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="search"
                                                    placeholder="Rechercher un patient..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="pl-10 w-64 bg-white shadow-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                                                />
                                            </div>
                                            <NewUser role={"patients"} refreshData={fetchData}>
                                                <Button className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center space-x-2">
                                                    <Plus className="h-4 w-4" />
                                                    <span>Nouveau Patient</span>
                                                </Button>
                                            </NewUser>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-gray-100">
                                                <TableHead className="py-4 text-gray-700 font-semibold">Patient</TableHead>
                                                {/*<TableHead className="py-4 text-gray-700 font-semibold">Contact</TableHead>*/}
                                                <TableHead className="py-4 text-gray-700 font-semibold">Date Naissance</TableHead>
                                                <TableHead className="text-right py-4 text-gray-700 font-semibold">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredPatients.length > 0 ? (
                                                filteredPatients.map((item) => (
                                                    <TableRow key={item?.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                                                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                                                                        {item?.prenom[0] + item?.name[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-semibold text-gray-800">{item?.prenom} {item?.name}</p>
                                                                    <p className="text-sm text-gray-500">Patient #{item?.id}</p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        {/*<TableCell className="py-4">*/}
                                                        {/*    <div className="space-y-1">*/}
                                                        {/*        <div className="flex items-center space-x-2 text-sm text-gray-600">*/}
                                                        {/*            <Phone className="h-3 w-3" />*/}
                                                        {/*            <span>{item?.phone}</span>*/}
                                                        {/*        </div>*/}
                                                        {/*        <div className="flex items-center space-x-2 text-sm text-gray-600">*/}
                                                        {/*            <Mail className="h-3 w-3" />*/}
                                                        {/*            <span>{item?.email}</span>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*</TableCell>*/}
                                                        <TableCell className="py-4">
                                                            <span className="text-gray-700">{new Date(item?.dateNaissance).toLocaleDateString('fr-FR')}</span>
                                                        </TableCell>
                                                        <TableCell className="text-right py-4">
                                                            <div className="flex justify-end items-center space-x-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                                                    asChild
                                                                >
                                                                    <Link href={"/patient/" + item?.id}>
                                                                        <Eye className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <UpdateUser role={"patients"} refreshData={fetchData} id={item.id} />
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => deleteUser("patients", item?.id)}
                                                                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                                        Aucun patient trouvé
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="rendez-vous" className="mt-6">
                            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="border-b border-gray-100 pb-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                        <div className="space-y-1">
                                            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                                <Calendar className="h-6 w-6 text-green-500" />
                                                <span>Rendez-vous</span>
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Planifiez et gérez les rendez-vous
                                            </CardDescription>
                                        </div>
                                        <NewRendezVous refreshData={fetchData}>
                                            <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center space-x-2">
                                                <Plus className="h-4 w-4" />
                                                <span>Nouveau Rendez-vous</span>
                                            </Button>
                                        </NewRendezVous>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-gray-100">
                                                <TableHead className="py-4 text-gray-700 font-semibold">Date & Heure</TableHead>
                                                <TableHead className="py-4 text-gray-700 font-semibold">Patient</TableHead>
                                                <TableHead className="py-4 text-gray-700 font-semibold">Médecin</TableHead>
                                                <TableHead className="py-4 text-gray-700 font-semibold">Status</TableHead>
                                                <TableHead className="text-right py-4 text-gray-700 font-semibold">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rendezVous.length > 0 ? (
                                                rendezVous.map((item) => (
                                                    <TableRow key={item?.id} className="hover:bg-green-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="py-4">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center space-x-2">
                                                                    <Calendar className="h-4 w-4 text-gray-500" />
                                                                    <span className="font-semibold text-gray-800">{formatDate(item?.date)}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Clock className="h-4 w-4 text-gray-500" />
                                                                    <span className="text-sm text-gray-600">{formatTime(item?.date)}</span>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">
                                                                        {item?.patient?.prenom[0] + item?.patient?.name[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="font-medium text-gray-800">
                                  {item?.patient?.prenom} {item?.patient?.name}
                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <span className="text-gray-700">{item?.medecin?.prenom} {item?.medecin?.name}</span>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <Badge className={`${getStatusColor(item?.status)} border font-medium`}>
                                                                {item?.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right py-4">
                                                            <div className="flex justify-end items-center space-x-2">
                                                                <UpdateRendezVous refreshData={fetchData} id={item.id} />
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => deleterendezvous(item?.id)}
                                                                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                                        Aucun rendez-vous trouvé
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}