export function formatToRupiah(input: string): string {
    const rawValue = input.replace(/[^0-9]/g, "")
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(Number(rawValue));
}