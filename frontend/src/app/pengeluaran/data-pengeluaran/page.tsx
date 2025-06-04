"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react"
import { DataTable } from "./data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatToRupiah } from "@/app/utils/formatRupiah";
import { DatePicker } from "@/components/date-picker";
import { kategoriPengeluaran, postPengeluaran } from "./actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function Pengeluaran() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [kategoriList, setKategoriList] = useState<any[]>([]);
    React.useEffect(() => {
        const fetchKategori = async () => {
            const data = await kategoriPengeluaran();
            setKategoriList(data.data);
        };
        fetchKategori();
    }, []);
    console.log(kategoriList);
    
    
    const [jumlah, setJumlah] = useState("");

    const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatToRupiah(e.target.value)
        setJumlah(formatted);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, jumlah: Number(e.target.value) })
        handleJumlahChange(e)
    }

    const [formData, setFormData] = useState({
        jumlah: 0,
        keterangan: "",
        tanggal: "",
        kategori_pengeluaran_id: 0,
        user_id: 0,
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
        const res = await postPengeluaran(formData)
        console.log("Berhasil disimpan:", res)
        } catch (err) {
        alert("Gagal menyimpan")
        }
    }
    return (
        <div className="flex flex-1 flex-col px-6">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Data Pengeluaran
                    </CardTitle>
                    <Dialog>
                        <form onSubmit={handleSubmit}>
                            <DialogTrigger asChild>
                            <Button size="lg" className="mt-3 bg-green-400"><IconPlus />Add Pengeluaran</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[825px]">
                            <DialogHeader>
                                <DialogTitle>Add Pengeluaran</DialogTitle>
                                <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Kategori</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] justify-between"
                                            >
                                            {value
                                                ? kategoriList.find((item) => item.id === value)?.nama_kategori
                                                : "Select kategori"}
                                            <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                            <CommandInput placeholder="Search kategori" className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No kategori found.</CommandEmpty>
                                                <CommandGroup>
                                                {kategoriList.map((item) => (
                                                    <CommandItem
                                                    key={item.id}
                                                    value={item.id}
                                                    onSelect={(currentValue) => {
                                                        setFormData((prev) => ({
                                                        ...prev,
                                                        kategori_pengeluaran_id: parseInt(currentValue),
                                                        }));
                                                        setValue(currentValue  === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                    >
                                                    {item.nama_kategori}
                                                    <Check
                                                        className={cn(
                                                        "ml-auto",
                                                        value === item.id ? "opacity-100" : "opacity-0"
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
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input id="username-1" name="username" placeholder="username" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="grid gap-3 flex-1">
                                        <Label htmlFor="jumlah">Jumlah</Label>
                                        <Input type="number" id="jumlah" name="jumlah" onChange={handleChange} />
                                    </div>
                                    <div className="grid gap-3 flex-1">
                                        <Label htmlFor="jumlah">Rupiah</Label>
                                        <Input id="jumlah" name="jumlah" value={jumlah} readOnly />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tanggal">Tanggal</Label>
                                    <DatePicker/>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button className="bg-red-500 text-white">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-green-400 text-white">Save changes</Button>
                            </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>
                    <DataTable/>
                </div>
            </div>
        </div>
    )
}