import {useEffect, useState} from "react";
import {getUser, updateUser} from "@/services/Services";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PencilLine} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function UpdateUser({role, id, refreshData}) {
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