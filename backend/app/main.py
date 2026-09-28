from decimal import Decimal
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import User, Transaction, Debt
from .schemas import RefinanceSimulationRequest, RefinanceSimulationResponse

from fastapi.middleware.cors import CORSMiddleware

# Crear las tablas automáticamente en Supabase
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Boissac Wealth OS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "system": "Boissac Wealth OS"}

@app.get("/v1/fire-number")
def get_fire_number(annual_expenses: float = 169920000, current_net_worth: float = 22630569):
    # Regla del 4%
    fire_num = annual_expenses / 0.04
    progress = (current_net_worth / fire_num) * 100
    return {
        "annual_expenses": annual_expenses,
        "withdrawal_rate": 0.04,
        "fire_number": fire_num,
        "current_net_worth": current_net_worth,
        "progress_pct": round(progress, 2)
    }

@app.post("/v1/debts/simulate", response_model=RefinanceSimulationResponse)
def simulate_debt_refinance(req: RefinanceSimulationRequest, db: Session = Depends(get_db)):
    # Algoritmo de simulación
    current_payment = Decimal(2446000)
    new_payment = current_payment * (Decimal(1) - (req.new_rate_tea / Decimal(2)))
    monthly_savings = current_payment - new_payment
    total_savings = monthly_savings * 314
    
    return RefinanceSimulationResponse(
        current_payment=current_payment,
        new_payment=round(new_payment, 2),
        monthly_savings=round(monthly_savings, 2),
        total_savings=round(total_savings, 2)
    )