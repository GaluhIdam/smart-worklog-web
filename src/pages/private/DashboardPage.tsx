export default function DashboardPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Total revenue</p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">$48,240</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Orders</p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">1,284</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Customers</p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">842</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">Active rentals</p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">186</p>
      </div>
    </div>
  );
}
