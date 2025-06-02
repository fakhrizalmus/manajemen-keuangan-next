import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { DataTableDemo } from "./data-table";

export default function Pengeluaran() {
    return (
        <div className="px-6 mt-4 w-full">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                Data Pengeluaran
            </CardTitle>
            <Button size="lg" className="mt-3 bg-green-400" asChild>
                <Link href={"/AddPengeluaran"}><IconPlus />Add Pengeluaran</Link>
            </Button>
            <DataTableDemo/>
        </div>
    )
}