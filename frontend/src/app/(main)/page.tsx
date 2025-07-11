"use client"

import { Badge } from "@/components/ui/badge";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react"
import { useState } from "react";
import moment from "moment";
import FilterTanggal from "@/components/filterTanggal";
import { Button } from "@/components/ui/button";
import { ChartPemasukan } from "@/components/dashboard/pemasukan";
import { ChartPengeluaran } from "@/components/dashboard/pengeluaran";
import { ChartPersentase } from "@/components/dashboard/persentase";
import { dashboard } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [countPemasukan, setCountPemasukanData] = useState<number>(0)
  const [countPengeluaran, setCountPengeluaranData] = useState<number>(0)
  const [selisih, setSelisih] = useState<number>(0)
  const [pemasukan, setPemasukan] = useState<any[]>([])
  const [pengeluaran, setPengeluaran] = useState<any[]>([])
  const [persentase, setPersentase] = useState<number>(0)
  const today = new Date();
  const awalBulan = new Date(today.getFullYear(), today.getMonth(), 1);
  const akhirBulan = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [startDate, setStartDate] = React.useState<Date | undefined>(awalBulan);
  const [endDate, setEndDate] = React.useState<Date | undefined>(akhirBulan);

  const fetchData = async () => {
    setLoading(true)
    const [dashboardData] = await Promise.all([
      dashboard({
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      })
    ]);
    setCountPemasukanData(dashboardData.countpemasukan)
    setCountPengeluaranData(dashboardData.countpengeluaran)
    setSelisih(dashboardData.selisih)
    setPemasukan(dashboardData.pemasukan)
    setPengeluaran(dashboardData.pengeluaran)
    setPersentase(dashboardData.persentase)
    setLoading(false)
  };

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="w-full px-6 mt-4">
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <FilterTanggal
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate} />
        <Button
          className="bg-green-400"
          onClick={() => fetchData()}>Cari</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4 w-full">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : (
          <>
          <Card className="w-full max-w-sm bg-green-600">
            <CardHeader>
              <CardDescription className="text-white">Total Pemasukan</CardDescription>
              <CardTitle className="text-2xl text-white font-semibold tabular-nums @[250px]/card:text-3xl">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(countPemasukan)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-full max-w-sm bg-red-700">
            <CardHeader>
              <CardDescription className="text-white">Total Pengeluaran</CardDescription>
              <CardTitle className="text-2xl text-white font-semibold tabular-nums @[250px]/card:text-3xl">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(countPengeluaran)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-full max-w-sm bg-blue-400">
            <CardHeader>
              <CardDescription className="text-white">Selisih</CardDescription>
              <CardTitle className="text-2xl text-white font-semibold tabular-nums @[250px]/card:text-3xl">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(selisih)}
              </CardTitle>
            </CardHeader>
          </Card>
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {loading ? (
          <>
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[300px] w-full md:col-span-2" />
          </>
        ) : (
          <>
            <ChartPemasukan data={pemasukan} start_date={startDate} end_date={endDate} />
            <ChartPengeluaran data={pengeluaran} start_date={startDate} end_date={endDate} />
            <ChartPersentase data={persentase} start_date={startDate} end_date={endDate} />
          </>
        )}
      </div>
    </div>
  );
}
