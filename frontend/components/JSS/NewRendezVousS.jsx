"use client"

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {getAllMedecins, getAllPatients, createRendezVous} from "@/services/Services";

export default function NewRendezVous({refreshData}) {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const [medecin, setMedecin] = useState("");
    const [patient, setPatient] = useState("");
    const [medecins, setMedecins] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        getAllMedecins().then(data => setMedecins(data?.data || [])).catch(console.error);
        getAllPatients().then(data => setPatients(data?.data || [])).catch(console.error);
    }

    useEffect(() => {
        fetchData()
    },[])

    const handleSubmit = async () => {
        if (!date || !medecin || !patient) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);
        try {
            const rendezVousData = {
                date: new Date(date).toISOString(),
                medecin: {
                    id: parseInt(medecin)
                },
                patient: {
                    id: parseInt(patient)
                },
                status: "PLANIFIE" // Default status, adjust as needed
            };

            await createRendezVous(rendezVousData);

            // Reset form
            setDate("");
            setMedecin("");
            setPatient("");
            setOpen(false);

            // Refresh data
            if (refreshData) {
                refreshData();
            }

            alert("Rendez-vous créé avec succès!");

        } catch (error) {
            console.error('Error creating rendez-vous:', error);
            alert("Erreur lors de la création du rendez-vous");
        } finally {
            setLoading(false);
        }
    };

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outline">Nouveaux Rendez-Vous</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Nouveaux Rendez-Vous</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="patient" className="text-right">
                        Patient
                    </Label>
                    <select
                        id="patient"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                        className="col-span-3 border rounded px-2 py-1"
                        disabled={loading}
                    >
                        <option value="">Choisir un patient</option>
                        {patients.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.prenom + " " + p.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="medecin" className="text-right">
                        Médecin
                    </Label>
                    <select
                        id="medecin"
                        value={medecin}
                        onChange={(e) => setMedecin(e.target.value)}
                        className="col-span-3 border rounded px-2 py-1"
                        disabled={loading}
                    >
                        <option value="">Choisir un médecin</option>
                        {medecins.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.prenom + " " + m.name}
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
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="col-span-3"
                        disabled={loading}
                    />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Enregistrement..." : "Enregistrer Rendez-Vous"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}