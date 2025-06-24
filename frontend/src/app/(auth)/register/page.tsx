import { RegisterForm } from "./register-form"
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center justify-center gap-3">
                    <Image 
                        src="/logo.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        priority /> 
                        <span className="text-lg font-semibold text-gray-800 dark:text-white">
                        Manajemen Keuangan
                        </span>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}