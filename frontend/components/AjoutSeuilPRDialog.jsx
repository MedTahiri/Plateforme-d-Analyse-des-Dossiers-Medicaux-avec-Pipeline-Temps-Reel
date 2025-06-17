"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addSeuilPR } from "@/services/Services"

export default function AjoutSeuilPRDialog({ patient }) {
    const [form, setForm] = useState({
        nom: "",
        unite: "",
        seuilMin: "",
        seuilMax: "",
    })
    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                ...form,
                patientId: patient?.id,
            }
            //await addSeuilPR(payload)
            setOpen(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Ajouter Seuil Personnalisé</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter Seuil personnalisé</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label>Nom</Label>
                        <Input name="nom" value={form.nom} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Unité</Label>
                        <Input name="unite" value={form.unite} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Seuil Min</Label>
                            <Input type="number" name="seuilMin" value={form.seuilMin} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Seuil Max</Label>
                            <Input type="number" name="seuilMax" value={form.seuilMax} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit}>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
