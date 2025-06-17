"use client"

import { Badge } from "@/components/ui/badge";
import {IconTrendingDown, IconTrendingUp} from "@tabler/icons-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as React from "react"
import { useState } from "react";
import moment from "moment";
import FilterTanggal from "@/components/filterTanggal";
import { Button } from "@/components/ui/button";
import { dashboard } from "./actions";
import { ChartPemasukan } from "@/components/dashboard/pemasukan";
import { ChartPengeluaran } from "@/components/dashboard/pengeluaran";
import { ChartPersentase } from "@/components/dashboard/persentase";

export default function Home() {
  const [countPemasukan, setCountPemasukanData] = useState<number>(0)
  const [countPengeluaran, setCountPengeluaranData] = useState<number>(0)
  const [pemasukan, setPemasukan] = useState<any[]>([])
  const [pengeluaran, setPengeluaran] = useState<any[]>([])
  const today = new Date();
  const awalBulan = new Date(today.getFullYear(), today.getMonth(), 1);
  const akhirBulan = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [startDate, setStartDate] = React.useState<Date | undefined>(awalBulan);
  const [endDate, setEndDate] = React.useState<Date | undefined>(akhirBulan);

  const fetchData = async () => {
    const [dashboardData] = await Promise.all([
        dashboard({
            start_date: moment(startDate).format("YYYY-MM-DD"),
            end_date: moment(endDate).format("YYYY-MM-DD"),
        })
    ]);
    setCountPemasukanData(dashboardData.countpemasukan)
    setCountPengeluaranData(dashboardData.countpengeluaran)
    setPemasukan(dashboardData.pemasukan)
    setPengeluaran(dashboardData.pengeluaran)
    console.log(dashboardData.pemasukan);
    console.log(dashboardData.pengeluaran);
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
        <Card className="w-full max-w-sm bg-green-600">
          <CardHeader>
            <CardDescription className="text-white">Total Pemasukan</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(countPemasukan)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-sm bg-red-700">
          <CardHeader>
            <CardDescription className="text-white">Total Pengeluaran</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(countPengeluaran)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <ChartPemasukan data={pemasukan}/>
        <ChartPengeluaran data={pengeluaran}/>
        <ChartPersentase/>
      </div>
    </div>
  );
}
