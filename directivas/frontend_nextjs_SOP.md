# SOP: Creación y Configuración del Frontend Next.js 14

## Objetivo
Implementar la aplicación web frontend en la carpeta `frontend/` utilizando **Next.js 14** (App Router), **Tailwind CSS**, **Lucide Icons** y **Recharts**, conectada al backend FastAPI de Boissac Wealth OS.

---

## Componentes y Vistas Requeridas

1. **Dashboard Principal (`/` o vista general)**:
   - Resumen de métricas financieras clave (Patrimonio Neto, Ingresos vs Egresos del mes, Tasa de Ahorro, Número FIRE estimado).
   - Gráfico de evolución de patrimonio o flujo de caja reciente (Recharts).
   - Accesos directos a módulos principales.

2. **Módulo de Egresos (`/egresos`)**:
   - Resumen mensual de gastos totales y desglose por categorías (Vivienda, Alimentación, Transporte, Salud, Entretenimiento, etc.).
   - Clasificación de necesidad (Esencial, No Esencial, Temporal).
   - Gráficos interactivos de distribución por categoría (Donut/Pie Chart y Bar Chart con Recharts).
   - Formulario para simular/agregar nuevo egreso y tabla de transacciones recientes.

3. **Calculadora FIRE (`/fire`)**:
   - Integración directa con el endpoint del backend `GET /v1/fire-number`.
   - Controles interactivos para simular variables:
     - Gastos anuales previstos.
     - Patrimonio neto actual.
     - Tasa segura de retiro (ej. 3%, 3.5%, 4%).
     - Tasa de retorno de inversión anual estimada y ahorro anual proyectado.
   - Cálculo del **Número FIRE**, brecha patrimonial restante y años estimados para alcanzar la libertad financiera.
   - Gráfico de proyección temporal del patrimonio vs meta FIRE (Area/Line Chart interactivo con Recharts).

4. **Navegación y Layout Global**:
   - Barra lateral (Sidebar) o navegación superior moderna y responsiva con Tailwind CSS.
   - Estado de conexión con el backend (`http://127.0.0.1:8000`).

---

## Entradas y Dependencias
- **Backend API**: `http://127.0.0.1:8000` (FastAPI).
- **Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS, PostCSS, Autoprefixer, Recharts, Lucide-React.
- **Entorno de ejecución**: Node.js v24.x LTS en Windows.

---

## Restricciones y Trampas Conocidas (Aprendizaje Continuo)
1. **Windows PowerShell ExecutionPolicy**:
   - `npm.ps1` y `npx.ps1` son bloqueados por la política de seguridad por defecto de Windows.
   - **Solución**: Invocar siempre `npm.cmd` y `npx.cmd` en lugar de `npm`/`npx`.
2. **Recharts en Next.js App Router (SSR)**:
   - Recharts utiliza el DOM (`window`, `SVGElement`) y falla en el servidor si se ejecuta durante Server-Side Rendering.
   - **Solución**: Marcar siempre los componentes que usen Recharts con la directiva `"use client";` al inicio del archivo y asegurar carga dinámica o montaje tras hidratación (`isMounted`).
3. **Versiones de React y Recharts**:
   - Next.js 14 usa React 18 de forma predeterminada, compatible de forma nativa con Recharts 2.x.
4. **CORS / Conexión Frontend -> Backend**:
   - Si el backend recibe peticiones desde `http://localhost:3000`, verificar que FastAPI tenga configurado `CORSMiddleware` para permitir peticiones desde el cliente web.
5. **Variables de Entorno**:
   - Usar `NEXT_PUBLIC_API_URL` con valor por defecto `http://127.0.0.1:8000`.
