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

export async function getAllRendezVous(by, id) {
    if (by) {
        try {
            return await axios.get(url + '/api/rendezvous/' + by + "?id=" + id, {withCredentials: true});
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            return await axios.get(url + '/api/rendezvous', {withCredentials: true});
        } catch (error) {
            console.error(error);
        }
    }
}

export async function deleteRendezVous(id) {
    try {
        return await axios.delete(url + '/api/rendezvous/' + id, {withCredentials: true});
    } catch (error) {
        console.error(error);
    }
}