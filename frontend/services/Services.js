import axios from "axios";

const url = "http://localhost:8686"

export async function login(data) {
    try {
        return await axios.post(url + '/auth/login', data, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function me() {
    try {
        return await axios.get(url + '/auth/me', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        return await axios.post(url + '/auth/logout', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPatients() {
    try {
        return await axios.get(url + '/api/patients', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function getAllSecretaires() {
    try {
        return await axios.get(url + '/api/secretaires', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMedecins() {
    try {
        return await axios.get(url + '/api/medecins', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function deletePatient(id) {
    try {
        return await axios.delete(url + '/api/patients/' + id, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function deleteMedecins(id) {
    try {
        return await axios.delete(url + '/api/medecins/' + id, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function deletesecretaires(id) {
    try {
        return await axios.delete(url + '/api/secretaires/' + id, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(username, password, name, prenom, dateNaissance, role) {
    try {
        return await axios.post(url + '/api/' + role, {
            username,
            password,
            name,
            prenom,
            dateNaissance
        }, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(name, prenom, dateNaissance, role, id) {
    try {
        return await axios.put(url + '/api/' + role + "/" + id, {name, prenom, dateNaissance}, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(id, role) {
    try {
        return await axios.get(url + '/api/' + role + "/" + id, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export async function getAllRendezVous() {
    try {
        return await axios.get(url + '/api/rendezvous', {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}

export const deleteRendezVous = async (id) => {
    try {
        const response = await fetch(`${url}/api/rendezvous/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true, message: 'Rendez-vous supprimé avec succès' };
    } catch (error) {
        console.error('Error deleting rendez-vous:', error);
        throw error;
    }
};

export const createRendezVous = async (rendezVousData) => {
    try {
        const response = await fetch(`${url}/api/rendezvous`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rendezVousData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true, message: 'Rendez-vous créé avec succès' };
    } catch (error) {
        console.error('Error creating rendez-vous:', error);
        throw error;
    }
};

export const getRendezVousById = async (id) => {
    try {
        const response = await fetch(`${url}/api/rendezvous/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching rendez-vous by ID:', error);
        throw error;
    }
};
export const updateRendezVous = async (id, rendezVousData) => {
    try {
        const response = await fetch(`${url}/api/rendezvous/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rendezVousData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true, message: 'Rendez-vous mis à jour avec succès' };
    } catch (error) {
        console.error('Error updating rendez-vous:', error);
        throw error;
    }
};

export const getRendezVousByMedecin = async (medecinId) => {
    try {
        const response = await axios.get(`${url}/api/rendezvous/medecin?id=${medecinId}`, {withCredentials: true});
        return response;
    } catch (error) {
        console.error('Error fetching rendez-vous by medecin:', error);
        throw error;
    }
};

export const getRendezVousByPatient = async (patientId) => {
    try {
        const response = await axios.get(`${url}/api/rendezvous/patient?id=${patientId}`, {withCredentials: true});
        return response;
    } catch (error) {
        console.error('Error fetching rendez-vous by patient:', error);
        throw error;
    }
};