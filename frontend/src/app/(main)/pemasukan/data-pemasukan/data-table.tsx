"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { getColumns, DataPemasukan } from "./columns"
import EditModal from "./editmodal"
import { getPemasukan } from "./actions"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

type Props = {
  pageSize: number | 10
  pageIndex: number | 0
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setPageIndex: React.Dispatch<React.SetStateAction<number>>
  selectedKategoriId: number | null;
  setSelectedKategoriId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function DataTable({ data, count, onDelete, refetch, pageSize,
  pageIndex, setPageSize, setPageIndex, kategoriList, selectedKategoriId, setSelectedKategoriId }: {
    data: DataPemasukan[],
    count: number,
    onDelete: (id: number) => void,
    refetch: () => void,
    kategoriList: any[]
  } & Props) {
  const [selectedIdToDelete, setSelectedIdToDelete] = React.useState<number | null>(null)
  const [selectedIdToEdit, setSelectedIdToEdit] = React.useState<number | null>(null)
  const columns = React.useMemo(() => getColumns(setSelectedIdToDelete, setSelectedIdToEdit), [])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedData, setSelectedData] = React.useState<DataPemasukan>()

  React.useEffect(() => {
    if (selectedIdToDelete !== null) {
      getPemasukan({ id: selectedIdToDelete ?? undefined }).then((res) => {
        setSelectedData(res.data[0])
      })
    }
  }, [selectedIdToDelete])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 10
      }
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater
      setPageIndex(next.pageIndex)
      setPageSize(next.pageSize)
    },
    manualPagination: true,
    pageCount: Math.ceil(count / (pageSize || 10)),
    getRowId: (row) => row.id.toString(),
  })

  const [open, setOpen] = React.useState(false)

  return (
    <div className="w-full">
      {selectedIdToDelete !== null && (
        <AlertDialog open={true} onOpenChange={() => setSelectedIdToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah kamu yakin menghapus {selectedData?.KategoriPemasukan.nama_kategori}?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menghapus data pemasukan secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white"
                onClick={() => {
                  onDelete(selectedIdToDelete)
                  setSelectedIdToDelete(null)
                }}
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {selectedIdToEdit !== null && (
        <EditModal
          id={selectedIdToEdit}
          onClose={() => setSelectedIdToEdit(null)}
          onSuccess={() => {
            setSelectedIdToEdit(null)
            refetch()
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <Label htmlFor="kategori">Kategori</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="min-w-[180px] justify-between"
            >
              {selectedKategoriId !== null
                ? kategoriList.find((item) => item.id === selectedKategoriId)?.nama_kategori
                : "Semua kategori"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Cari kategori..." className="h-9" />
              <CommandList>
                <CommandEmpty>No kategori found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    key="all"
                    value=""
                    onSelect={() => {
                      setSelectedKategoriId(null)
                      setOpen(false)
                    }}
                  >
                    Semua Kategori
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedKategoriId === null ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                  {kategoriList.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id.toString()}
                      onSelect={(currentValue) => {
                        const selectedId = parseInt(currentValue)
                        setSelectedKategoriId(selectedId === selectedKategoriId ? null : selectedId)
                        setOpen(false)
                      }}
                    >
                      {item.nama_kategori}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedKategoriId === item.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Total row: {count}
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
