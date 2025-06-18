"use client"

import { useState } from "react"
import { getKategoriPengeluaran, putKategoriPengeluaran } from "./actions"
import { KategoriPengeluaran } from "./columns"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as React from "react"

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

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await putKategoriPengeluaran(form, id!)
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
                    <DialogTitle>Edit Kategori Pengeluaran</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div>
                        <Label>Nama Kategori</Label>
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
                            <Button className="bg-green-400 text-white" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}