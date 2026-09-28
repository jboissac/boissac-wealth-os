"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ArrowUpRight, TrendingUp, AlertTriangle, ShieldCheck, DollarSign, Wallet } from "lucide-react";

export default function Dashboard() {
  const [fireData, setFireData] = useState<any>(null);

  useEffect(() => {
    // Consumir el endpoint de la API FastAPI
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/v1'}/fire-number`)
      .then((res) => res.json())
      .then((data) => setFireData(data))
      .catch((err) => console.log("Error al conectar con la API:", err));
  }, []);

  const assetAllocation = [
    { name: "Cryptos", value: 66, color: "#f59e0b" },
    { name: "Jubilación", value: 25.3, color: "#3b82f6" },
    { name: "Efectivo", value: 9.2, color: "#10b981" },
    { name: "Bonos", value: 6.8, color: "#8b5cf6" },
    { name: "Fondos", value: 4.8, color: "#ec4899" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">BOISSAC WEALTH OS</h1>
          <p className="text-sm text-slate-400">Sistema de Control Financiero Patrimonial</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300">
          Base: <span className="font-semibold text-emerald-400">PYG (Gs)</span>
        </div>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-sm font-medium">Ingresos Mes</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">14.160.000 Gs</div>
          <p className="text-xs text-emerald-400 mt-1">▲ 0% vs mes anterior</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-sm font-medium">Egresos Mes</span>
            <Wallet className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">14.160.000 Gs</div>
          <p className="text-xs text-slate-400 mt-1">Sobres bajo control</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-sm font-medium">Tasa de Ahorro</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">26,0%</div>
          <p className="text-xs text-emerald-400 mt-1">▲ 0,5 pp meta cumplida</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-sm font-medium">Patrimonio Neto</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">+22.630.569 Gs</div>
          <p className="text-xs text-emerald-400 mt-1">▲ 48,7% crecimiento anual</p>
        </div>
      </div>

      {/* METRICAS DE INDEPENDENCIA Y ALERTAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* WIDGET NUMERO FIRE (Consumido desde FastAPI) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> Número FIRE (Independencia)
          </h2>
          {fireData ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Meta Patrimonial FIRE:</p>
                <p className="text-xl font-bold text-white">
                  {Number(fireData.fire_number).toLocaleString("es-PY")} Gs
                </p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Progreso Actual:</span>
                  <span className="text-emerald-400 font-bold">{fireData.progress_pct}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(fireData.progress_pct, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-slate-500">Regla del 4% basada en gastos anuales proyectados.</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Cargando cálculo desde API...</p>
          )}
        </div>

        {/* GRAFICO DISTRIBUCION DE ACTIVOS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-1">
          <h2 className="text-lg font-semibold mb-2 text-slate-200">Distribución de Activos</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetAllocation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400 mt-2">
            {assetAllocation.map((item) => (
              <span key={item.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name} ({item.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* PANEL DE ALERTAS Y REGLAS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
            <AlertTriangle className="text-amber-400" /> Alertas del Sistema
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200">
              ⚠️ <strong>Concentración alta:</strong> Crypto al 66% del portafolio (Objetivo máximo: 15%).
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-200">
              🔴 <strong>Fuga de suscripción:</strong> Netflix (70.000 Gs) sin uso reciente.
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-200">
              ℹ️ <strong>Fondo de Emergencia:</strong> Cobertura actual de 3,40 meses (Meta: 3 meses).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}