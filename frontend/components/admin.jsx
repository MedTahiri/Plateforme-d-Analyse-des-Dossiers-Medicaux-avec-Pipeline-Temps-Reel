import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useEffect, useState} from "react";
import {
    createUser, updateUser,
    deleteMedecins,
    deletePatient,
    deletesecretaires,
    getAllMedecins,
    getAllPatients,
    getAllSecretaires, getUser
} from "@/services/Services";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import {useRouter} from "next/navigation";
import {PencilLine, Trash2, Users, UserCheck, Stethoscope, Shield, Activity, Plus, Phone, Mail, Eye} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import NewUser from "@/components/NewUser";
import UpdateUser from "@/components/UpdateUser";


export default function AdminDashboard() {

    const [patients, setPatients] = useState([])
    const [medecins, setMedecins] = useState([])
    const [secretaires, setSecretaires] = useState([])

    const router = useRouter()

    const fetchData = () => {
        getAllPatients().then(data => setPatients(data?.data || [])).catch(console.error);
        getAllMedecins().then(data => setMedecins(data?.data || [])).catch(console.error);
        getAllSecretaires().then(data => setSecretaires(data?.data || [])).catch(console.error);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteUser = (role, id) => {
        if (role === "patients") {
            deletePatient(id)
                .then(() => fetchData())
                .catch(console.error);
        } else if (role === "medecins") {
            deleteMedecins(id)
                .then(() => fetchData())
                .catch(console.error);
        } else if (role === "secretaires") {
            deletesecretaires(id)
                .then(() => fetchData())
                .catch(console.error);
        }
    }

    const getRoleIcon = (role) => {
        switch (role) {
            case 'patients':
                return <Users className="h-6 w-6 text-blue-500" />;
            case 'medecins':
                return <Stethoscope className="h-6 w-6 text-green-500" />;
            case 'secretaires':
                return <UserCheck className="h-6 w-6 text-purple-500" />;
            default:
                return <Users className="h-6 w-6 text-gray-500" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'patients':
                return 'from-blue-500 to-blue-600';
            case 'medecins':
                return 'from-green-500 to-green-600';
            case 'secretaires':
                return 'from-purple-500 to-purple-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <main className="p-6 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Dashboard Administration
                        </h1>
                        <p className="text-gray-600 text-lg">Gestion complète du système médical</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border">
                            <Activity className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium">Système actif</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <NewUser role={"secretaires"} refreshData={fetchData}>
                                <Button className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Nouveau Secrétaire</span>
                                </Button>
                            </NewUser>
                            <NewUser role={"medecins"} refreshData={fetchData}>
                                <Button className="bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center space-x-2">
                                    <Plus className="h-4 w-4" />
                                    <span>Nouveau Médecin</span>
                                </Button>
                            </NewUser>
                        </div>
                    </div>
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
                                    <p className="text-green-100">Total Médecins</p>
                                    <p className="text-3xl font-bold">{medecins.length}</p>
                                </div>
                                <Stethoscope className="h-10 w-10 text-green-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100">Total Secrétaires</p>
                                    <p className="text-3xl font-bold">{secretaires.length}</p>
                                </div>
                                <UserCheck className="h-10 w-10 text-purple-200" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    <Tabs defaultValue="patients" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 p-1 bg-white shadow-sm border-0 rounded-xl">
                            <TabsTrigger
                                value="patients"
                                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                            >
                                <Users className="h-4 w-4" />
                                <span>Patients</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="medecins"
                                className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                            >
                                <Stethoscope className="h-4 w-4" />
                                <span>Médecins</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="secretaires"
                                className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                            >
                                <UserCheck className="h-4 w-4" />
                                <span>Secrétaires</span>
                            </TabsTrigger>
                        </TabsList>

                        {["patients", "medecins", "secretaires"].map((role) => (
                            <TabsContent key={role} value={role} className="mt-6">
                                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                                    <CardHeader className="border-b border-gray-100 pb-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                            <div className="space-y-1">
                                                <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                                                    {getRoleIcon(role)}
                                                    <span className="capitalize">{role}</span>
                                                </CardTitle>
                                                <CardDescription className="text-gray-600">
                                                    Gérer les comptes des {role}
                                                </CardDescription>
                                            </div>
                                            {role !== "patients" && (
                                                <NewUser role={role} refreshData={fetchData}>
                                                    <Button className={`bg-gradient-to-r ${getRoleColor(role)} hover:opacity-90 text-white shadow-lg flex items-center space-x-2`}>
                                                        <Plus className="h-4 w-4" />
                                                        <span>Nouveau {role.slice(0, -1)}</span>
                                                    </Button>
                                                </NewUser>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-b border-gray-100">
                                                    <TableHead className="py-4 text-gray-700 font-semibold">Profil</TableHead>
                                                    <TableHead className="py-4 text-gray-700 font-semibold">Contact</TableHead>
                                                    <TableHead className="py-4 text-gray-700 font-semibold">Date Naissance</TableHead>
                                                    <TableHead className="text-right py-4 text-gray-700 font-semibold">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {((role === "patients" ? patients : role === "medecins" ? medecins : secretaires).length > 0) ? (
                                                    (role === "patients" ? patients : role === "medecins" ? medecins : secretaires).map((item) => (
                                                        <TableRow key={item?.id} className={`hover:${role === 'patients' ? 'bg-blue-50/50' : role === 'medecins' ? 'bg-green-50/50' : 'bg-purple-50/50'} transition-colors border-b border-gray-50`}>
                                                            <TableCell className="py-4">
                                                                <div className="flex items-center space-x-3">
                                                                    <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                                                                        <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(role)} text-white font-semibold`}>
                                                                            {item?.prenom[0] + item?.name[0]}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="font-semibold text-gray-800">{item?.prenom} {item?.name}</p>
                                                                        <p className="text-sm text-gray-500 capitalize">{role.slice(0, -1)} #{item?.id}</p>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <div className="space-y-1">
                                                                    {item?.phone && (
                                                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                                            <Phone className="h-3 w-3" />
                                                                            <span>{item?.phone}</span>
                                                                        </div>
                                                                    )}
                                                                    {item?.email && (
                                                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                                            <Mail className="h-3 w-3" />
                                                                            <span>{item?.email}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-4">
                                                                <span className="text-gray-700">{new Date(item?.dateNaissance).toLocaleDateString('fr-FR')}</span>
                                                            </TableCell>
                                                            <TableCell className="text-right py-4">
                                                                <div className="flex justify-end items-center space-x-2">
                                                                    {role === "patients" && (
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                                                            asChild
                                                                        >
                                                                            <a href={"/patient/" + item?.id}>
                                                                                <Eye className="h-4 w-4" />
                                                                            </a>
                                                                        </Button>
                                                                    )}
                                                                    <UpdateUser role={role} refreshData={fetchData} id={item.id} />
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => deleteUser(role, item?.id)}
                                                                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                                                        aria-label="Delete user"
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
                                                            Aucun {role.slice(0, -1)} trouvé
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </main>
        </div>
    )
}