import uuid
from sqlalchemy import Column, String, Numeric, Boolean, DateTime, ForeignKey, Text, Date, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(String(20), default="member")
    currency_base = Column(String(3), default="PYG")
    timezone = Column(String(50), default="America/Asuncion")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Account(Base):
    __tablename__ = "accounts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    name = Column(String(150), nullable=False)
    type = Column(String(20), nullable=False) # cash, savings, investment, crypto
    currency = Column(String(3), default="PYG")
    balance = Column(Numeric(18, 2), default=0)

class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = Column(String(100), nullable=False)
    kind = Column(String(10), nullable=False) # income, expense
    necessity = Column(String(10)) # essential, non_essential, temporal

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    amount = Column(Numeric(18, 2), nullable=False)
    currency = Column(String(3), default="PYG")
    direction = Column(String(6), nullable=False) # in, out
    description = Column(Text)
    occurred_at = Column(DateTime(timezone=True), nullable=False)

class Debt(Base):
    __tablename__ = "debts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    creditor = Column(String(150), nullable=False)
    original_amount = Column(Numeric(18, 2), nullable=False)
    current_balance = Column(Numeric(18, 2), nullable=False)
    interest_rate_tea = Column(Numeric(6, 4))
    monthly_payment = Column(Numeric(18, 2), nullable=False)
    currency = Column(String(3), default="PYG")