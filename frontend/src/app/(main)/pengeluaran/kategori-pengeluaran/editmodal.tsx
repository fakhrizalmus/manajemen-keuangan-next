"use client"

import { useState } from "react"
import { getKategoriPengeluaran, putKategoriPengeluaran } from "./actions"
import { KategoriPengeluaran } from "./columns"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"
import "toastr/build/toastr.min.css";
import toastr from "toastr";

type EditModalProps = {
    id: number | null
    onClose: () => void
    onSuccess: () => void
}

export default function EditModal({ id, onClose, onSuccess }: EditModalProps) {
    const [form, setForm] = React.useState({
        nama_kategori: ""
    })
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (id !== null) {
            getKategoriPengeluaran({ id }).then((res) => {
                const data: KategoriPengeluaran = res.data[0]
                setForm({
                    nama_kategori: data.nama_kategori
                })
            })
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (form.nama_kategori == "") {
                toastr.error('Nama kategori tidak boleh kosong');
                return
            }
            setLoading(true)
            await putKategoriPengeluaran(form, id!)
            onSuccess()
            onClose()
        } catch (err) {
            console.error(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={id !== null} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Edit Kategori Pengeluaran</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-3">
                        <Label>Nama Kategori <span className="text-red-500">*</span></Label>
                        <Input
                            value={form.nama_kategori}
                            onChange={(e) => setForm({ ...form, nama_kategori: e.target.value })}
                        />
                    </div>
                    <div className="mt-4">
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="bg-red-500 text-white">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-green-400 text-white" disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}