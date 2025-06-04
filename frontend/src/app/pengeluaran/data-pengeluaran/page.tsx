"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { DataTableDemo } from "./data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatToRupiah } from "@/app/utils/formatRupiah";
import { DatePicker } from "@/components/date-picker";

export default function Pengeluaran() {
    const [jumlah, setJumlah] = useState("");

    const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatToRupiah(e.target.value)
        setJumlah(formatted);
    };
    return (
        <div className="px-6 mt-4 w-full">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                Data Pengeluaran
            </CardTitle>
            <Dialog>
                <form>
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
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" placeholder="Nama" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" placeholder="username" />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid gap-3 flex-1">
                                <Label htmlFor="jumlah">Jumlah</Label>
                                <Input id="jumlah" name="jumlah" onChange={handleJumlahChange} />
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
            <DataTableDemo/>
        </div>
    )
}