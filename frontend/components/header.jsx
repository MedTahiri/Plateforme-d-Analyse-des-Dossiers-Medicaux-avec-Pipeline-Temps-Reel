import {User} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {logout} from "@/services/Services";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export function Header() {

    const router = useRouter()

    const Logout = () => {
      logout().then(res=> {
              if (res.status=200){
                  router.push("/login")
                  Cookies.delete("JSESSIONID")
              }
          }
      )
    }

    return (
        <header
            className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <h1 className="text-base font-medium">Plateforme d'Analyse des Dossiers Medicaux avec Pipeline Temps
                    Reel</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger><User/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel><Button className="w-full"
                                                   variant="outline"><Link href={"/profile"}>Profile</Link></Button></DropdownMenuLabel>
                        <DropdownMenuLabel><Button onClick={()=>Logout()} className="w-full" variant="outline">Log
                            out</Button></DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    )
}
