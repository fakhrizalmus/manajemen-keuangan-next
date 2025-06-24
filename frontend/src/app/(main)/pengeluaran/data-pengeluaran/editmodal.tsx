"use client"

import { useState } from "react"
import { getPengeluaran, kategoriPengeluaran, putPengeluaran } from "./actions"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/date-picker"
import * as React from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { formatToRupiah } from "@/app/utils/formatRupiah"
import { DataPengeluaran } from "./columns"

type EditModalProps = {
  id: number | null
  onClose: () => void
  onSuccess: () => void
}

export default function EditModal({ id, onClose, onSuccess }: EditModalProps) {
    const [form, setForm] = React.useState({
        jumlah: 0,
        keterangan: "",
        tanggal: "",
        kategori_pengeluaran_id: 0,
        user_id: 1, // asumsikan user_id tetap atau ambil dari context
    })
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (id !== null) {
            kategoriPengeluaran().then((res) => {
                setKategoriList(res.data);
            })
            getPengeluaran({ id }).then((res) => {
                const data: DataPengeluaran = res.data.rows[0]
                const tanggal = data.tanggal;
                const tanggalDate = tanggal ? new Date(tanggal) : undefined;

                setForm({
                    jumlah: data.jumlah,
                    keterangan: data.keterangan,
                    tanggal,
                    kategori_pengeluaran_id: data.KategoriPengeluaran?.id || 0,
                    user_id: 1, // atau sesuaikan
                })

                setSelectedDate(tanggalDate);
                setJumlah(formatToRupiah(data.jumlah.toString()));
            })
        }
    }, [id])

    const [open, setOpen] = React.useState(false)
    const [kategoriList, setKategoriList] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const angka = Number(e.target.value);
        setForm({ ...form, jumlah: angka });
        setJumlah(formatToRupiah(angka.toString()));
    };

    const [jumlah, setJumlah] = useState("");

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await putPengeluaran(form, id!)
            onSuccess()
            onClose()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={id !== null} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Edit Pengeluaran</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={(e) => {
                        e.preventDefault() 
                        handleSubmit()
                    }}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <Label>Tanggal <span className="text-red-500">*</span></Label>
                            <div className="w-full">
                            <DatePicker date={selectedDate} 
                            setDate={(date) => {
                                setSelectedDate(date);
                                setForm({ ...form, tanggal: date ? format(date, "yyyy-MM-dd") : "" });
                            }}/>
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label>Kategori <span className="text-red-500">*</span></Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                    >
                                    {form.kategori_pengeluaran_id
                                        ? kategoriList.find((item) => item.id === form.kategori_pengeluaran_id)?.nama_kategori
                                        : "Pilih kategori..."}
                                    <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                    <CommandInput placeholder="Cari kategori..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                                        <CommandGroup>
                                        {kategoriList.map((item) => (
                                            <CommandItem
                                            key={item.id}
                                            value={item.id.toString()}
                                            onSelect={() => {
                                                setForm({ ...form, kategori_pengeluaran_id: item.id });
                                                setOpen(false);
                                            }}
                                            >
                                            {item.nama_kategori}
                                            <Check
                                                className={cn(
                                                "ml-auto",
                                                id === item.id ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                    </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label>Keterangan</Label>
                        <Input
                        value={form.keterangan}
                        onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="jumlah">Jumlah <span className="text-red-500">*</span></Label>
                            <Input type="number" id="jumlah" name="jumlah" value={form.jumlah} onChange={handleChange} />
                        </div>
                        <div className="grid gap-3 flex-1">
                            <Label htmlFor="jumlah">Rupiah</Label>
                            <Input id="jumlah" name="jumlah" value={jumlah} readOnly />
                        </div>
                    </div>
                    <div className="mt-4">
                        <DialogFooter>
                            <DialogClose asChild>
                            <Button className="bg-red-500 text-white">Cancel</Button>
                            </DialogClose>
                            <Button className="bg-green-400 text-white" disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}