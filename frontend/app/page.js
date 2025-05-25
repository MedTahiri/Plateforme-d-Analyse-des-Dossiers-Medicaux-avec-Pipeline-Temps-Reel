"use client"

import Admin from "@/components/admin";
import {Header} from "@/components/header";
import Secretaires from "@/components/secretaires";
import Medecin from "@/components/medecin";

export default function Home() {
    return (
        <>
            <Header/>
            <Admin/>
            <Secretaires/>
            <Medecin/>
        </>
    );
}
