import {useState} from "react";
import {createUser} from "@/services/Services";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function NewUser({role, refreshData}) {

    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const [name, setname] = useState("")
    const [prenom, setprenom] = useState("")
    const [dateNaissance, setdateNaissance] = useState("")

    const [open, setOpen] = useState(false);


    const saveUser = () => {
        createUser(username,password,name, prenom, dateNaissance, role).then(() => {
            setusername("")
            setpassword("")
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
                    <Label htmlFor="username" className="text-right">
                        username
                    </Label>
                    <Input
                        id="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="col-span-3"
                    />
                    <Label htmlFor="password" className="text-right">
                        password
                    </Label>
                    <Input
                        id="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="col-span-3"
                    />
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