from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class RefinanceSimulationRequest(BaseModel):
    debt_id: str
    new_rate_tea: Decimal
    extra_payment: Optional[Decimal] = Decimal(0)

class RefinanceSimulationResponse(BaseModel):
    current_payment: Decimal
    new_payment: Decimal
    monthly_savings: Decimal
    total_savings: Decimal