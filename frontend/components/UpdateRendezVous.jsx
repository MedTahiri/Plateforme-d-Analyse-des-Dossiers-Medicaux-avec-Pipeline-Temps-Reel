"use client"

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {getAllMedecins} from "@/services/Services";
import {PencilLine} from "lucide-react";

export default function UpdateRendezVous({id,refreshData}) {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const [medecin, setMedecin] = useState({});
    const [medecins, setMedecins] = useState([]);

    const fetchData = () => {
        getAllMedecins().then(data => setMedecins(data?.data || [])).catch(console.error);
    }

    useEffect(() => {
        fetchData()
    },[])

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline"><PencilLine className="h-4 w-4"/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Update Rendez-Vous</DialogTitle>

            </DialogHeader>
            <div className="grid gap-4 py-4">

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="medecin" className="text-right">
                        Medecin
                    </Label>
                    <select
                        id="medecin"
                        value={medecin}
                        onChange={(e) => setMedecin(e.target.value)}
                        className="col-span-3 border rounded px-2 py-1"
                    >
                        <option value="">Choisir un médecin</option>
                        {medecins.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.prenom +" "+m.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                        Date
                    </Label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <Button>Enregistrer Rendez Vous</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}