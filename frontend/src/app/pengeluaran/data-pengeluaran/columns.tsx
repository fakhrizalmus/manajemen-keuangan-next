"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type Payment = {
  id: number
  jumlah: number
  keterangan: string
  tanggal: string
  KategoriPengeluaran: {
    id: number
    nama_kategori: string
  }
}

export function getColumns(
    setSelectedIdToDelete: (id: number) => void,
    setSelectedIdToEdit: (id: number) => void
): ColumnDef<Payment>[] {
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
      accessorFn: (row) => row.KategoriPengeluaran.nama_kategori,
      id: "nama_kategori",
      
      header: "Nama Kategori",
      cell: ({ row }) => <div className="capitalize">{row.original.KategoriPengeluaran.nama_kategori}</div>,
    },
    {
      accessorKey: "tanggal",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("tanggal")}</div>,
    },
    {
      accessorKey: "jumlah",
      header: () => <div className="text-right">Jumlah</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("jumlah"))
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "keterangan",
      header: "Keterangan",
      cell: ({ row }) => <div className="capitalize">{row.getValue("keterangan")}</div>,
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
              <DropdownMenuItem onClick={() => setSelectedIdToDelete(payment.id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedIdToEdit(payment.id)}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]}