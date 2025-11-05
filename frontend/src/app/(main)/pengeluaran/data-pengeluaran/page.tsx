"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { IconPlus } from "@tabler/icons-react";
import * as React from "react"
import { DataTable } from "./data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatToRupiah } from "@/app/utils/formatRupiah";
import { DatePicker } from "@/components/date-picker";
import { getPengeluaran, kategoriPengeluaran, postPengeluaran, deletePengeluaran } from "./actions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import FilterTanggal from "@/components/filterTanggal";
import moment from "moment"

export default function Pengeluaran() {
  const [open, setOpen] = React.useState(false)
  const [id, setValue] = React.useState<number | null>(null);
  const [kategoriList, setKategoriList] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [pengeluaranData, setPengeluaranData] = useState<any[]>([]);
  const [countPengeluaranData, setCountPengeluaranData] = useState<number>(0)
  const [dialogOpen, setDialogOpen] = useState(false);
  const today = new Date();
  const awalBulan = new Date(today.getFullYear(), today.getMonth(), 1);
  const akhirBulan = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [startDate, setStartDate] = React.useState<Date | undefined>(awalBulan);
  const [endDate, setEndDate] = React.useState<Date | undefined>(akhirBulan);
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [selectedKategoriId, setSelectedKategoriId] = useState<number | null>(null);

  const fetchData = async () => {
    const [kategoriRes, pengeluaranRes] = await Promise.all([
      kategoriPengeluaran(),
      getPengeluaran({
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        row: pageSize,
        page: pageIndex * pageSize,
        kategori_pengeluaran_id: selectedKategoriId ?? undefined,
      }),
    ]);
    setKategoriList(kategoriRes.data);
    setPengeluaranData(pengeluaranRes.data.rows);
    setCountPengeluaranData(pengeluaranRes.data.count)
  };

  React.useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, selectedKategoriId]);

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
    kategori_pengeluaran_id: 0
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const newFormData = {
        ...formData,
        tanggal: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        kategori_pengeluaran_id: id ?? 0
      };

      if (formData.jumlah <= 0 || newFormData.kategori_pengeluaran_id == 0 || newFormData.tanggal == "") {
        toastr.error('Isi semua field dengan benar')
        return;
      }

      const res = await postPengeluaran(newFormData)
      console.log('Berhasil simpan data ', res);
      const pengeluaran = await getPengeluaran({
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        row: pageSize,
        page: pageIndex * pageSize
      })
      setPengeluaranData(pengeluaran.data.rows);
      setCountPengeluaranData(pengeluaran.data.count)
      setDialogOpen(false);
      setFormData({
        jumlah: 0,
        keterangan: "",
        tanggal: "",
        kategori_pengeluaran_id: 0
      });
      setJumlah("");
      setValue(null);
    } catch (err) {
      console.log('tes gagal');
      toastr.error('Gagal Menyimpan')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePengeluaran(id)
      const pengeluaran = await getPengeluaran({
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        row: pageSize,
        page: pageIndex * pageSize
      })
      setPengeluaranData(pengeluaran.data.rows);
      setCountPengeluaranData(pengeluaran.data.count)
    } catch (error) {
      console.error("Gagal menghapus data:", error)
    }
  }
  return (
    <div className="flex flex-1 flex-col px-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Data Pengeluaran
          </CardTitle>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <div className="flex items-end gap-4">
              <FilterTanggal
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate} />
              <Button
                className="bg-green-400"
                onClick={() => fetchData()}>Cari</Button>
            </div>
            <DialogTrigger asChild>
              <Button className="mt-3 bg-green-400 w-fit" onClick={() => setDialogOpen(true)}>
                <IconPlus />Add Pengeluaran
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add Pengeluaran</DialogTitle>
                  <DialogDescription>
                    Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Tanggal */}
                    <div className="grid gap-3">
                      <Label htmlFor="tanggal">Tanggal <span className="text-red-500">*</span></Label>
                      <div className="w-full">
                        <DatePicker date={selectedDate} setDate={setSelectedDate} />
                      </div>
                    </div>

                    {/* Kategori */}
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Kategori <span className="text-red-500">*</span></Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {id
                              ? kategoriList.find((item) => item.id === id)?.nama_kategori
                              : "Pilih kategori..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari kategori..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No kategori found.</CommandEmpty>
                              <CommandGroup>
                                {kategoriList.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.id.toString()}
                                    onSelect={(currentValue) => {
                                      const selectedId = parseInt(currentValue)
                                      setValue(selectedId === id ? null : selectedId)
                                      setOpen(false)
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
                  {/* Keterangan */}
                  <div className="grid gap-3">
                    <Label htmlFor="keterangan">Keterangan</Label>
                    <Input id="keterangan" name="keterangan" onChange={e => setFormData({ ...formData, keterangan: e.target.value })} placeholder="keterangan" />
                  </div>
                  {/* Jumlah */}
                  <div className="flex gap-4">
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="jumlah">Jumlah <span className="text-red-500">*</span></Label>
                      <Input type="number" id="jumlah" name="jumlah" onChange={handleChange} />
                    </div>
                    <div className="grid gap-3 flex-1">
                      <Label htmlFor="jumlah">Rupiah</Label>
                      <Input id="jumlah" name="jumlah" value={jumlah} readOnly />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button className="bg-red-500 text-white">Batal</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-green-400 text-white">Simpan</Button>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <DataTable
            data={pengeluaranData}
            count={countPengeluaranData}
            onDelete={handleDelete}
            refetch={fetchData}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
            kategoriList={kategoriList}
            selectedKategoriId={selectedKategoriId}
            setSelectedKategoriId={setSelectedKategoriId} />
        </div>
      </div>
    </div>
  )
}