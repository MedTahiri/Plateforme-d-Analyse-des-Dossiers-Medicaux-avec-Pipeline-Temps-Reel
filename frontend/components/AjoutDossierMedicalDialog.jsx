"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ajouteDme, me } from "@/services/Services";
import { Skeleton } from "@/components/ui/skeleton";

export default function AjoutDossierMedicalDialog({ patient }) {
    const [file, setFile] = useState(null);
    const [medecin, setMedecin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        me()
            .then((data) => {
                setMedecin(data?.data?.user);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files?.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || !patient || !medecin) return;

        setSubmitting(true);
        try {
            await ajouteDme(file, patient, medecin);
            setOpen(false); // Close dialog on success
            setFile(null); // Reset file input
        } catch (err) {
            console.error("Erreur lors de l'ajout du DME", err);
            alert("Erreur lors de l'ajout du dossier");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-16 w-full" />
            </div>
        );
    }

    if (!medecin) {
        return (
            <div className="p-4 text-red-500">
                Vous n'êtes pas connecté. Veuillez vous connecter pour continuer.
            </div>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Ajout Dossier Médical Électronique</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un dossier médical</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Patient :</p>
                        <p className="text-base font-semibold">
                            {patient?.name} {patient?.prenom}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">Médecin :</p>
                        <p className="text-base font-semibold">
                            {medecin?.name} {medecin?.prenom}
                        </p>
                    </div>

                    <div>
                        <Label htmlFor="pdf-upload">Fichier PDF</Label>
                        <Input
                            id="pdf-upload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={submitting || !file}>
                        {submitting ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
