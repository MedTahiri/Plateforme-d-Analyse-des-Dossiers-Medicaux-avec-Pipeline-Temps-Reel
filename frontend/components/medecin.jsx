"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchIcon, Trash2, Eye, Calendar, Users, Activity, Clock, CheckCircle, XCircle, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import NewUser from "@/components/NewUser";
import {
  deleteMedecins,
  deletePatient,
  deleteRendezVous,
  deletesecretaires,
  getAllMedecins,
  getAllPatients,
  getAllRendezVous,
  getAllSecretaires,
  getRendezVousByMedecin,
  annulerRendezVous,
  terminerRendezVous,
} from "@/services/Services";
import UpdateUser from "@/components/UpdateUser";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import UpdateRendezVous from "@/components/UpdateRendezVous";
import { me } from "@/services/Services";


export default function Medecin() {
  const [patients, setPatients] = useState([]);
  const [rendezVous, setRendezVous] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMedecin, setCurrentMedecin] = useState(null);
  const [loadingActions, setLoadingActions] = useState({});

  const fetchData = async () => {
    try {
      // Get current user info
      const userResponse = await me();
      if (userResponse?.data?.user) {
        setCurrentMedecin(userResponse.data.user);
        // Get rendez-vous for this medecin
        const rendezVousResponse = await getRendezVousByMedecin(
            userResponse.data.user.id
        );
        setRendezVous(rendezVousResponse?.data || []);
      }
      // Get patients
      const patientsResponse = await getAllPatients();
      setPatients(patientsResponse?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAnnulerRendezVous = async (rendezVousId) => {
    setLoadingActions(prev => ({ ...prev, [`annuler_${rendezVousId}`]: true }));
    try {
      const result = await annulerRendezVous(rendezVousId);
      if (result.success) {
        // Update the local state to reflect the change
        setRendezVous(prevRendezVous =>
            prevRendezVous.map(rdv =>
                rdv.id === rendezVousId
                    ? { ...rdv, status: 'annulé' }
                    : rdv
            )
        );
        alert("Rendez-vous annulé avec succès");
      }
    } catch (error) {
      console.error("Error cancelling rendez-vous:", error);
      alert("Erreur: Impossible d'annuler le rendez-vous");
    } finally {
      setLoadingActions(prev => ({ ...prev, [`annuler_${rendezVousId}`]: false }));
    }
  };

  const handleTerminerRendezVous = async (rendezVousId) => {
    setLoadingActions(prev => ({ ...prev, [`terminer_${rendezVousId}`]: true }));
    try {
      const result = await terminerRendezVous(rendezVousId);
      if (result.success) {
        // Update the local state to reflect the change
        setRendezVous(prevRendezVous =>
            prevRendezVous.map(rdv =>
                rdv.id === rendezVousId
                    ? { ...rdv, status: 'terminé' }
                    : rdv
            )
        );
        alert("Rendez-vous terminé avec succès");
      }
    } catch (error) {
      console.error("Error completing rendez-vous:", error);
      alert("Erreur lors de la finalisation du rendez-vous");
    } finally {
      setLoadingActions(prev => ({ ...prev, [`terminer_${rendezVousId}`]: false }));
    }
  };

  const filteredPatients = patients.filter(
      (item) =>
          item?.prenom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard Médecin
              </h1>
              <p className="text-gray-600 text-lg">
                Gestion des rendez-vous et suivi des patients
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border">
                <Activity className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Système actif</span>
              </div>
              {currentMedecin && (
                  <div className="flex items-center space-x-3 px-4 py-2 bg-white rounded-lg shadow-sm border">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm">
                        {currentMedecin?.prenom?.[0]}{currentMedecin?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Dr. {currentMedecin?.prenom} {currentMedecin?.name}
                      </p>
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Rendez-vous</p>
                    <p className="text-3xl font-bold">{totalRendezVous}</p>
                  </div>
                  <Calendar className="h-10 w-10 text-blue-200" />
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
                  <CheckCircle className="h-10 w-10 text-green-200" />
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
                  <Clock className="h-10 w-10 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="rendez-vous" className="w-full">
              <TabsList className="grid w-full grid-cols-1 p-1 bg-white shadow-sm border-0 rounded-xl">
                <TabsTrigger
                    value="rendez-vous"
                    className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Gestion des Rendez-vous</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rendez-vous" className="mt-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="space-y-1">
                        <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                          <Calendar className="h-6 w-6 text-blue-500" />
                          <span>Rendez-vous</span>
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Gérer vos rendez-vous patients
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-gray-100">
                          <TableHead className="py-4 text-gray-700 font-semibold">Patient</TableHead>
                          <TableHead className="py-4 text-gray-700 font-semibold">Date & Heure</TableHead>
                          <TableHead className="py-4 text-gray-700 font-semibold">Statut</TableHead>
                          <TableHead className="text-right py-4 text-gray-700 font-semibold">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rendezVous.length > 0 ? (
                            rendezVous.map((item) => (
                                <TableRow key={item?.id} className="hover:bg-blue-50/50 transition-colors border-b border-gray-50">
                                  <TableCell className="py-4">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                                          {item?.patient?.prenom?.[0]}{item?.patient?.name?.[0]}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-semibold text-gray-800">
                                          {item?.patient?.prenom} {item?.patient?.name}
                                        </p>
                                        <p className="text-sm text-gray-500">Patient #{item?.patient?.id}</p>
                                      </div>
                                    </div>
                                  </TableCell>
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
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(item?.status)}`}>
                                      {item?.status?.replace('_', ' ')}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right py-4">
                                    <div className="flex justify-end items-center space-x-2">
                                      <Button
                                          variant="outline"
                                          size="sm"
                                          className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                                          asChild
                                      >
                                        <Link href={"/patient/" + item?.patient?.id}>
                                          <Eye className="h-4 w-4" />
                                        </Link>
                                      </Button>

                                      {/* Cancel Button - Only show if not already cancelled or completed */}
                                      {item?.status !== 'annulé' && item?.status !== 'terminé' && (
                                          <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleAnnulerRendezVous(item.id)}
                                              disabled={loadingActions[`annuler_${item.id}`]}
                                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                              aria-label="Annuler le rendez-vous"
                                          >
                                            {loadingActions[`annuler_${item.id}`] ? (
                                                <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
                                            ) : (
                                                <XCircle className="h-4 w-4" />
                                            )}
                                          </Button>
                                      )}

                                      {/* Complete Button - Only show if not already cancelled or completed */}
                                      {item?.status !== 'annulé' && item?.status !== 'terminé' && (
                                          <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleTerminerRendezVous(item.id)}
                                              disabled={loadingActions[`terminer_${item.id}`]}
                                              className="hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-colors"
                                              aria-label="Marquer comme terminé"
                                          >
                                            {loadingActions[`terminer_${item.id}`] ? (
                                                <div className="animate-spin h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                                            ) : (
                                                <CheckCircle className="h-4 w-4" />
                                            )}
                                          </Button>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                <div className="flex flex-col items-center space-y-2">
                                  <Calendar className="h-8 w-8 text-gray-400" />
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