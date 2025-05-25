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
} from "@/services/AdminServices";
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
import {PencilLine, Trash2} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


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
        //const updateState = (setter, data) => setter(data.filter(item => item.id !== id));

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

    return (
        <div className="flex min-h-screen">
            {/* Main Content */}
            <main className="flex-1 p-6 space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <NewUser role={"secretaires"} refreshData={fetchData}/>
                        <NewUser role={"medecins"} refreshData={fetchData}/>

                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Patients</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{patients.length}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Medecins</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{medecins.length}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Secretaires</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">{secretaires.length}</CardContent>
                    </Card>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Tabs defaultValue="patients" className="w-full md:col-span-3">
                        <TabsList>
                            <TabsTrigger value="patients">Patients</TabsTrigger>
                            <TabsTrigger value="medecins">Medecins</TabsTrigger>
                            <TabsTrigger value="secretaires">Secretaires</TabsTrigger>
                        </TabsList>

                        {["patients", "medecins", "secretaires"].map((role) => (
                            <TabsContent key={role} value={role} className="mt-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle>{role}</CardTitle>
                                            <CardDescription> Gérer les comptes des {role}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableCaption>Liste de {role}</TableCaption>
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
                                                {(role === "patients" ? patients : role === "medecins" ? medecins : secretaires).map((item) => (
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
                                                            <UpdateUser role={role} refreshData={fetchData}
                                                                        id={item.id}/>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => deleteUser(role, item?.id)}
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

                        ))}
                    </Tabs>
                </section>
            </main>
        </div>
    )
}


function NewUser({role, refreshData}) {

    const [name, setname] = useState("")
    const [prenom, setprenom] = useState("")
    const [dateNaissance, setdateNaissance] = useState("")

    const [open, setOpen] = useState(false);


    const saveUser = () => {
        createUser(name, prenom, dateNaissance, role).then(() => {
            setname("");
            setprenom("");
            setdateNaissance("");
            setOpen(false);
            refreshData();
        }).catch(console.error);
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Nouveaux {role}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Nouveaux {role}</DialogTitle>

            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nom" className="text-right">
                        Nom
                    </Label>
                    <Input
                        id="nom"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="prenom" className="text-right">
                        Prenom
                    </Label>
                    <Input
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setprenom(e.target.value)}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateNaissance" className="text-right">
                        Date Naissance
                    </Label>
                    <Input
                        id="dateNaissance"
                        type="date"
                        value={dateNaissance}
                        onChange={(e) => setdateNaissance(e.target.value)}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={saveUser}>Enregistrer {role}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

function UpdateUser({role, id, refreshData}) {
    const [name, setname] = useState("")
    const [prenom, setprenom] = useState("")
    const [dateNaissance, setdateNaissance] = useState("")

    const [open, setOpen] = useState(false);

    useEffect(() => {
        getUser(id, role).then((data) => {
            setname(data.data.name);
            setprenom(data.data.prenom);
            setdateNaissance(data.data.dateNaissance);
        })
    }, []);

    const update = () => {
        updateUser(name, prenom, dateNaissance, role, id).then(() => {
            setname("");
            setprenom("");
            setdateNaissance("");
            setOpen(false);
            refreshData();
        }).catch(console.error);
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="p-2" aria-label={`Edit ${role}`}>
                <PencilLine className="h-4 w-4"/>
            </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Mise à jour {role}</DialogTitle>

            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nom" className="text-right">
                        Nom
                    </Label>
                    <Input
                        id="nom"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="prenom" className="text-right">
                        Prenom
                    </Label>
                    <Input
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setprenom(e.target.value)}
                        className="col-span-3"
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateNaissance" className="text-right">
                        Date Naissance
                    </Label>
                    <Input
                        id="dateNaissance"
                        type="date"
                        value={dateNaissance}
                        onChange={(e) => setdateNaissance(e.target.value)}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={update}>Mise à jour {role}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

}