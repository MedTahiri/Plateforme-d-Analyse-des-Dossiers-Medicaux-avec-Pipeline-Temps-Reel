
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center max-w-md space-y-6">
                <div className="flex justify-center">
                    <div className="bg-red-100 p-4 rounded-full text-red-600">
                        <AlertCircle className="h-8 w-8" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-800">404 – Page Not Found</h1>
                <p className="text-gray-500 text-lg">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link href="/">
                    <Button className="rounded-2xl px-6 py-3 text-base shadow-md">Go Back Home</Button>
                </Link>
            </div>
        </div>
    )
}
