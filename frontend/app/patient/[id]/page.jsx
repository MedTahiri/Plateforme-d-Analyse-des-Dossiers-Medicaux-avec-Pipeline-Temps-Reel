"use client";

import {use, useEffect, useState} from "react";
import {Header} from "@/components/header";
import {
    deleteDme,
    deleteRendezVous,
    getAllPatients, getAllseuilByPatient, getDmeByPatient,
    getRendezVousByPatient,
    getUser, me,
} from "@/services/Services";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Eye,
    ArrowLeft,
    Trash2,
    Calendar,
    FileText,
    User,
    Phone,
    Mail,
    MapPin,
    Activity,
    Clock,
    CheckCircle,
    XCircle,
    Stethoscope
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import AjoutDossierMedicalDialog from "@/components/AjoutDossierMedicalDialog";
import AjoutSeuilPRDialog from "@/components/AjoutSeuilPRDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertTriangle } from "lucide-react"
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {formatAlerteMessage} from "@/services/util";

export default function Patient({params}) {
    const {id} = use(params);
    const [patient, setPatient] = useState({});
    const [medecin, setMedecin] = useState(null);
    const [role, setRole] = useState(null)
    const [rendezVous, setRendezVous] = useState([]);
    const [dmes, setDmes] = useState([])
    const [Loading, setLoading] = useState(false)
    const [seuils, setSeuils] = useState([])
    const [error,setError] = useState()
    const [notifications, setNotifications] = useState([]);
    const router = useRouter();

    const fetchData = () => {
        getUser(id, "patients")
            .then((data) => setPatient(data?.data || []))
            .catch(console.error);
        getRendezVousByPatient(id)
            .then((data) => setRendezVous(data?.data || []))
            .catch(console.error);
        getDmeByPatient(id)
            .then((data) => setDmes(data?.data || []))
            .catch(console.error)
        getAllseuilByPatient(id)
            .then((data) => setSeuils(data?.data || []))
            .catch(console.error)
    };

    useEffect(() => {
        me()
            .then((data) => {
                setMedecin(data?.data?.user);
                setRole(data?.data?.role)
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        const patientStr = sessionStorage.getItem('loggedInUser'); // <-- ici sessionStorage
        if (!patientStr) {
            setError("Aucun patient connecté !");
            return;
        }

        const patient = JSON.parse(patientStr);
        if (patient?.role==="ROLE_PATIENT") {
            const patientId = patient?.user?.id || patient?.user?.id;

            if (!patientId) {
                setError("ID du patient non trouvé !");
                return;
            }

            let client = null;
            const socket = new SockJS('http://localhost:8686/ws');
            client = Stomp.over(socket);

            client.connect({}, (frame) => {
                console.log("✅ WebSocket connecté (AlerteButton)");

                client.subscribe(`/topic/alertes/patient/${patientId}`, (message) => {
                    const notification = message.body;
                    console.log("🔔 Alerte reçue (AlerteButton) : " + notification);
                    setNotifications(prev => [...prev, notification]);
                });
            }, (error) => {
                console.error("❌ WebSocket erreur :", error);
            });

            return () => {
                if (client && client.connected) {
                    console.log("🔌 Déconnexion WebSocket (AlerteButton)...");
                    client.disconnect(() => console.log("✅ Déconnecté"));
                }
            };
        }
    }, []);


    const deleterendezvous = (id) => {
        deleteRendezVous(id)
            .then((data) => fetchData())
            .catch(console.error);
    };

    const deletedmebyid = (id) => {
        deleteDme(id).then(() => fetchData()).catch(console.log)
    }

    const getStatusBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'terminé':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'annulé':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'en_attente':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Count stats
    const totalRendezVous = rendezVous.length;
    const rendezVousTermines = rendezVous.filter(rdv => rdv.status === 'terminé').length;
    const rendezVousEnAttente = rendezVous.filter(rdv => rdv.status === 'en_attente').length;

    const calculateAge = (birthDate) => {
        if (!birthDate) return 'N/A';
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    console.log(patient)

    console.log(dmes)


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Header/>
            <main className="p-6 space-y-8">
                {/* Header */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {role !== 'ROLE_PATIENT' &&
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.back()}
                                className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                aria-label="Retour"
                            >
                                <ArrowLeft className="h-4 w-4"/>
                            </Button>}
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Dossier Patient
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Informations et suivi médical
                            </p>
                        </div>
                    </div>
                    {/*<div className="flex items-center space-x-4">*/}
                    {/*    <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border">*/}
                    {/*        <Activity className="h-5 w-5 text-green-500"/>*/}
                    {/*        <span className="text-sm font-medium">Dossier actif</span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>




                {/* Patient Info Card */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-6">
                            <Avatar className="h-20 w-20 ring-4 ring-blue-100">
                                <AvatarFallback
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-2xl">
                                    {patient?.prenom?.[0]}{patient?.name?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {patient?.prenom} {patient?.name}
                                    </h2>
                                    <p className="text-gray-600">Patient #{patient?.id}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Calendar className="h-4 w-4"/>
                                        <span className="text-sm">
                      {patient?.dateNaissance ?
                          new Date(patient.dateNaissance).toLocaleDateString('fr-FR')
                          : 'N/A'
                      } ({calculateAge(patient?.dateNaissance)} ans)
                    </span>
                                    </div>
                                    {patient?.phone && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Phone className="h-4 w-4"/>
                                            <span className="text-sm">{patient.phone}</span>
                                        </div>
                                    )}
                                    {patient?.email && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Mail className="h-4 w-4"/>
                                            <span className="text-sm">{patient.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {notifications.length > 0 && (
                    <Alert variant="default" className="bg-yellow-100/80 border-yellow-300 text-yellow-900 mt-6">
                        <AlertTitle className="flex items-center space-x-2">
                            <Bell className="w-5 h-5 text-yellow-600" />
                            <span>Alertes reçues en temps réel</span>
                        </AlertTitle>
                        <AlertDescription>
                            <ScrollArea className="h-32 pr-2">
                                <ul className="space-y-2 mt-2">
                                    {notifications.map((notif, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start space-x-2 bg-white border rounded-md p-2 text-sm shadow-sm text-gray-800"
                                        >
                                            <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500" />
                                            <span>{formatAlerteMessage(notif)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </AlertDescription>
                    </Alert>
                )}


                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100">Total Rendez-vous</p>
                                    <p className="text-3xl font-bold">{totalRendezVous}</p>
                                </div>
                                <Calendar className="h-10 w-10 text-blue-200"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100">Terminés</p>
                                    <p className="text-3xl font-bold">{rendezVousTermines}</p>
                                </div>
                                <CheckCircle className="h-10 w-10 text-green-200"/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100">En Attente</p>
                                    <p className="text-3xl font-bold">{rendezVousEnAttente}</p>
                                </div>
                                <Clock className="h-10 w-10 text-yellow-200"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <Tabs defaultValue="rendez-vous" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 p-1 bg-white shadow-sm border-0 rounded-xl">
                            <TabsTrigger
                                value="rendez-vous"
                                className="flex items-center justify-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200 py-2"
                            >
                                <Calendar className="h-4 w-4"/>
                                <span>Rendez-vous</span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="dme"
                                className="flex items-center justify-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200 py-2"
                            >
                                <FileText className="h-4 w-4"/>
                                <span>Dossier Médical</span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="seuil"
                                className="flex items-center justify-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-200 py-2"
                            >
                                <FileText className="h-4 w-4"/>
                                <span>Seuil Personnalisé</span>
                            </TabsTrigger>

                        </TabsList>

                        <TabsContent value="rendez-vous" className="mt-6">
                            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="border-b border-gray-100 pb-6">
                                    <div
                                        className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                        <div className="space-y-1">
                                            <CardTitle
                                                className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                                <Calendar className="h-6 w-6 text-blue-500"/>
                                                <span>Rendez-vous</span>
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                Historique des rendez-vous médicaux
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-gray-100">
                                                <TableHead className="py-4 text-gray-700 font-semibold">Date &
                                                    Heure</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">Médecin</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">Statut</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {rendezVous.length > 0 ? (
                                                rendezVous.map((item) => (
                                                    <TableRow key={item?.id}
                                                              className="hover:bg-blue-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="py-4">
                                                            <div className="space-y-1">
                                                                <p className="font-medium text-gray-800">
                                                                    {new Date(item?.date).toLocaleDateString("fr-FR", {
                                                                        weekday: "long",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(item?.date).toLocaleTimeString("fr-FR", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="h-8 w-8 ring-2 ring-green-100">
                                                                    <AvatarFallback
                                                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm">
                                                                        {item?.medecin?.prenom?.[0]}{item?.medecin?.name?.[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        Dr. {item?.medecin?.prenom} {item?.medecin?.name}
                                                                    </p>
                                                                    <div
                                                                        className="flex items-center space-x-1 text-xs text-gray-500">
                                                                        <Stethoscope className="h-3 w-3"/>
                                                                        <span>Médecin</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                              <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item?.status)}`}>
                                {item?.status?.replace('_', ' ')}
                              </span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <Calendar className="h-8 w-8 text-gray-400"/>
                                                            <p>Aucun rendez-vous trouvé</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="dme" className="mt-6">
                            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="border-b border-gray-100 pb-6">
                                    <div className="space-y-1">
                                        <CardTitle
                                            className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                            <FileText className="h-6 w-6 text-purple-500"/>
                                            <span>Dossier Médical Électronique</span>
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            Informations médicales et historique du patient
                                        </CardDescription>
                                    </div>
                                    {role === 'ROLE_MEDECIN' &&
                                        <AjoutDossierMedicalDialog patient={patient} medecin={medecin}
                                                                   fetchData={fetchData()}/>}

                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-gray-100">
                                                <TableHead className="py-4 text-gray-700 font-semibold">Date & Heure de
                                                    creation</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">Médecin</TableHead>
                                                <TableHead className="py-4 text-gray-700 font-semibold">Url</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">Supprimer</TableHead>

                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {dmes.length > 0 ? (
                                                dmes.map((item) => (
                                                    <TableRow key={item?.id}
                                                              className="hover:bg-blue-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="py-4">
                                                            <div className="space-y-1">
                                                                <p className="font-medium text-gray-800">
                                                                    {new Date(item?.dateCreation).toLocaleDateString("fr-FR", {
                                                                        weekday: "long",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(item?.dateCreation).toLocaleTimeString("fr-FR", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="h-8 w-8 ring-2 ring-green-100">
                                                                    <AvatarFallback
                                                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm">
                                                                        {item?.medecins[0]?.prenom?.[0]}{item?.medecins[0]?.name?.[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        Dr. {item?.medecins[0]?.prenom} {item?.medecins[0]?.name}
                                                                    </p>
                                                                    <div
                                                                        className="flex items-center space-x-1 text-xs text-gray-500">
                                                                        <Stethoscope className="h-3 w-3"/>
                                                                        <span>Médecin</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <Link
                                                                href={`http://localhost:8686/api/dme/file/${item?.url}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item?.status)}`}>
    {item?.url}
  </span>
                                                            </Link>

                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <Button variant="outline"
                                                                    onClick={() => deletedmebyid(item?.id)}>Supprimer</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <Calendar className="h-8 w-8 text-gray-400"/>
                                                            <p>Aucun rendez-vous trouvé</p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="seuil" className="mt-6">
                            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                <CardHeader className="border-b border-gray-100 pb-6">
                                    <div className="space-y-1">
                                        <CardTitle
                                            className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                            <FileText className="h-6 w-6 text-purple-500"/>
                                            <span>Seuil personnalisé</span>
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            Seuil personnalisé
                                        </CardDescription>
                                    </div>
                                    {role === 'ROLE_MEDECIN' &&
                                        <AjoutSeuilPRDialog patient={patient} medecin={medecin} fetchData={fetchData}/>}
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b border-gray-100">
                                                <TableHead className="py-4 text-gray-700 font-semibold">Date & Heure de
                                                    definition</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">nom</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">unite</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">max Seuil</TableHead>
                                                <TableHead
                                                    className="py-4 text-gray-700 font-semibold">min Seuil</TableHead>

                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {seuils.length > 0 ? (
                                                seuils.map((item) => (
                                                    <TableRow key={item?.id}
                                                              className="hover:bg-blue-50/50 transition-colors border-b border-gray-50">
                                                        <TableCell className="py-4">
                                                            <div className="space-y-1">
                                                                <p className="font-medium text-gray-800">
                                                                    {new Date(item?.dateDefinition).toLocaleDateString("fr-FR", {
                                                                        weekday: "long",
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {new Date(item?.dateDefinition).toLocaleTimeString("fr-FR", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="h-8 w-8 ring-2 ring-green-100">
                                                                    <AvatarFallback
                                                                        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm">
                                                                        {item?.indicateur?.nom[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-medium text-gray-800">
                                                                        {item?.indicateur?.nom}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div>
                                                                <p className="font-medium text-gray-800">
                                                                    {item?.indicateur?.unite}
                                                                </p>
                                                            </div>

                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div>
                                                                <p className="font-medium text-gray-800">
                                                                    {item?.seuilMax}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            <div>
                                                                <p className="font-medium text-gray-800">
                                                                    {item?.seuiMin}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <Calendar className="h-8 w-8 text-gray-400"/>
                                                            <p>Aucun rendez-vous trouvé</p>
                                                        </div>
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
