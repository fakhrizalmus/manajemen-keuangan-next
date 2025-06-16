"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

type Props = {
    startDate: Date | undefined
    endDate: Date | undefined
    setStartDate: (date: Date | undefined) => void
    setEndDate: (date: Date | undefined) => void
}

export default function FilterTanggal({
    startDate,
    endDate,
    setStartDate,
    setEndDate
}: Props) {
    // Ambil tanggal hari ini
    const today = new Date()

    // Awal bulan (misalnya 1 Juni 2025 jika hari ini di bulan Juni)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Akhir bulan
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    // Untuk Tanggal Awal
    const [openStart, setOpenStart] = React.useState(false)
    // const [startDate, setStartDate] = React.useState<Date | undefined>(new Date(firstDayOfMonth))
    const [startMonth, setStartMonth] = React.useState<Date | undefined>(startDate)
    const [startValue, setStartValue] = React.useState(formatDate(startDate))

    // Untuk Tanggal Akhir
    const [openEnd, setOpenEnd] = React.useState(false)
    // const [endDate, setEndDate] = React.useState<Date | undefined>(new Date(lastDayOfMonth))
    const [endMonth, setEndMonth] = React.useState<Date | undefined>(endDate)
    const [endValue, setEndValue] = React.useState(formatDate(endDate))

    return (
        <div className="flex flex-row gap-4">
            {/* Tanggal Awal */}
            <div className="flex flex-col gap-3">
                <Label htmlFor="start-date" className="px-1">Tanggal Awal</Label>
                <div className="relative flex gap-2">
                    <Input
                        id="start-date"
                        value={startValue}
                        placeholder="June 01, 2025"
                        className="bg-background pr-10"
                        onChange={(e) => {
                            const d = new Date(e.target.value)
                            setStartValue(e.target.value)
                            if (isValidDate(d)) {
                                setStartDate(d)
                                setStartMonth(d)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setOpenStart(true)
                            }
                        }}
                    />
                    <Popover open={openStart} onOpenChange={setOpenStart}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                <CalendarIcon className="size-3.5" />
                                <span className="sr-only">Select date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                            <Calendar
                                mode="single"
                                selected={startDate}
                                captionLayout="dropdown"
                                month={startMonth}
                                onMonthChange={setStartMonth}
                                onSelect={(date) => {
                                    setStartDate(date)
                                    setStartValue(formatDate(date))
                                    setOpenStart(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Tanggal Akhir */}
            <div className="flex flex-col gap-3">
                <Label htmlFor="end-date" className="px-1">Tanggal Akhir</Label>
                <div className="relative flex gap-2">
                    <Input
                        id="end-date"
                        value={endValue}
                        placeholder="June 30, 2025"
                        className="bg-background pr-10"
                        onChange={(e) => {
                            const d = new Date(e.target.value)
                            setEndValue(e.target.value)
                            if (isValidDate(d)) {
                                setEndDate(d)
                                setEndMonth(d)
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault()
                                setOpenEnd(true)
                            }
                        }}
                    />
                    <Popover open={openEnd} onOpenChange={setOpenEnd}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                                <CalendarIcon className="size-3.5" />
                                <span className="sr-only">Select date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                            <Calendar
                                mode="single"
                                selected={endDate}
                                captionLayout="dropdown"
                                month={endMonth}
                                onMonthChange={setEndMonth}
                                onSelect={(date) => {
                                    setEndDate(date)
                                    setEndValue(formatDate(date))
                                    setOpenEnd(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
