import axios from "axios";

const url = "http://localhost:8686"

export async function getAllPatients() {
    try {
        return await axios.get(url + '/api/patients');
    } catch (error) {
        console.error(error);
    }
}

export async function getAllSecretaires() {
    try {
        return await axios.get(url + '/api/secretaires');
    } catch (error) {
        console.error(error);
    }
}

export async function getAllMedecins() {
    try {
        return await axios.get(url + '/api/medecins');
    } catch (error) {
        console.error(error);
    }
}

export async function deletePatient(id) {
    try {
        return await axios.delete(url + '/api/patients/' + id);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteMedecins(id) {
    try {
        return await axios.delete(url + '/api/medecins/' + id);
    } catch (error) {
        console.error(error);
    }
}

export async function deletesecretaires(id) {
    try {
        return await axios.delete(url + '/api/secretaires/' + id);
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(name, prenom, dateNaissance, role) {
    try {
        return await axios.post(url + '/api/' + role, {name, prenom, dateNaissance});
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(name, prenom, dateNaissance, role, id) {
    try {
        return await axios.put(url + '/api/' + role + "/" + id, {name, prenom, dateNaissance});
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(id,role) {
    try {
        return await axios.get(url + '/api/' + role + "/" + id);
    } catch (error) {
        console.error(error);
    }
}