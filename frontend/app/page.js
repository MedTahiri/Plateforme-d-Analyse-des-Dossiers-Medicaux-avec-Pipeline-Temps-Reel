"use client"

import Admin from "@/components/admin";
import {Header} from "@/components/header";
import Secretaires from "@/components/secretaires";

export default function Home() {
    return (
        <>
            <Header/>
            <Admin/>
            <Secretaires/>
        </>
    );
}
