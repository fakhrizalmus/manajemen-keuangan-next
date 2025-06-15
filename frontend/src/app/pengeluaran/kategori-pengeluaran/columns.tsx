import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

export type KategoriPengeluaran = {
    id: number
    nama_kategori: string
    user_id: number
}

export function getColumns(
    setSelectedIdToDelete: (id: number) => void,
    setSelectedIdToEdit: (id: number) => void
): ColumnDef<KategoriPengeluaran>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: "No",
            cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
        },
        {
            accessorFn: (row) => row.nama_kategori,
            id: "nama_kategori",

            header: "Nama Kategori",
            cell: ({ row }) => <div className="capitalize">{row.getValue("nama_kategori")}</div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id.toString())}>
                Copy payment ID
              </DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white"
                                onClick={() => setSelectedIdToDelete(payment.id)}>
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem className="bg-green-500 hover:bg-green-600 focus:bg-green-600 text-white mt-2"
                                onClick={() => setSelectedIdToEdit(payment.id)}>Edit</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}