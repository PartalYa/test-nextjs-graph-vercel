import BitcoinChart from "@/src/components/BitcoinChart";
import { Suspense } from "react";
import PageTransition from "@/src/components/PageTransition";

async function getBitcoinData() {
  "use server";
  const base = process.env.VERCEL_URL
    ? `https://test-nextjs-graph-vercel.vercel.app`
    : `http://localhost:${process.env.PORT ?? 3000}`;
  console.log("Fetching from:", base);
  const res = await fetch(`${base}/api/get-bitcoin`, { cache: "no-store" });
  console.log("Response status:", res.status);
  return res.json();
}

export default async function Home() {
  const chartData = await getBitcoinData();

  return (
    <PageTransition>
      <div className="w-full p-4 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <h2 className="text-md text-gray-500">
            Bitcoin Price Chart (Mock Data)
          </h2>
        </div>
        <div className="w-full border-t border-gray-300 my-4" />
        <div className="p-4 m-auto rounded-2xl bg-white shadow-md border border-gray-200 mt-8 max-w-3xl">
          <Suspense fallback={<div>Loading...</div>}>
            <BitcoinChart chartData={chartData} />
          </Suspense>
        </div>
      </div>
    </PageTransition>
  );
}
