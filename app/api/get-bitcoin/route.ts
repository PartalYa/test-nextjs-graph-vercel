import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import ChartDataType from "@/src/types/ChartDataType";

export async function GET() {
  const cryptoData: ChartDataType[] = [];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  for (const date of dates) {
    cryptoData.push({
      date,
      price: parseFloat(
        faker.finance.amount({ min: 20000, max: 60000, dec: 0 })
      ),
    });
  }

  return NextResponse.json(cryptoData);
}
