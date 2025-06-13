"use client"

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React, { useState } from "react";
import { getKategoriPengeluaran, postKategoriPengeluaran } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconPlus } from "@tabler/icons-react";

export default function kategoriPengeluaran() {
    const [open, setOpen] = React.useState(false)
    const [id, setValue] = React.useState<number | null>(null);
    const [kategoriList, setKategoriList] = useState<any[]>([]);
    const [pengeluaranData, setPengeluaranData] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchData = async () => {
        const [kategoriRes] = await Promise.all([
            getKategoriPengeluaran({}),
        ]);
        setKategoriList(kategoriRes.data);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        nama_kategori: ""
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        try {
            const newFormData = {
                ...formData,
                user_id: 1,
            };
            const res = await postKategoriPengeluaran(newFormData)
            console.log('Berhasil simpan data ', res);
            const pengeluaran = await getKategoriPengeluaran({})
            setPengeluaranData(pengeluaran.data)
            setDialogOpen(false);
        } catch (err) {
            console.log('tes gagal');
            toastr.error('Gagal Menyimpan')
        }
    }
    
    return(
        <div className="flex flex-1 flex-col px-6">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Data Kategori Pengeluaran
                    </CardTitle>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                        <Button size="lg" className="mt-3 bg-green-400" onClick={() => setDialogOpen(true)}><IconPlus />Add Kategori Pengeluaran</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[825px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Add Kategori Pengeluaran</DialogTitle>
                                    <DialogDescription>
                                    Click save when you&apos;re
                                    done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="nama_kategori">Nama Kategori</Label>
                                        <Input id="nama_kategori" name="nama_kategori" onChange={e => setFormData({ ...formData, nama_kategori: e.target.value })} placeholder="Nama Kategori" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <DialogFooter>
                                        <DialogClose asChild>
                                        <Button className="bg-red-500 text-white">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" className="bg-green-400 text-white">Save changes</Button>
                                    </DialogFooter>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    {/* <DataTable data={pengeluaranData} onDelete={handleDelete} refetch={fetchData}/> */}
                </div>
            </div>
        </div>
    )
}