from datetime import date
from typing import Optional
from pydantic import BaseModel

class SaleBase(BaseModel):
    transaction_id: Optional[str] = None
    date: Optional[date] = None
    customer_id: Optional[str] = None
    customer_name: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[str] = None
    age: Optional[int] = None
    customer_region: Optional[str] = None
    customer_type: Optional[str] = None
    product_id: Optional[str] = None
    product_name: Optional[str] = None
    brand: Optional[str] = None
    product_category: Optional[str] = None
    tags: Optional[str] = None
    quantity: Optional[int] = None
    price_per_unit: Optional[float] = None
    discount_percentage: Optional[float] = None
    total_amount: Optional[float] = None
    final_amount: Optional[float] = None
    payment_method: Optional[str] = None
    order_status: Optional[str] = None
    delivery_type: Optional[str] = None
    store_id: Optional[str] = None
    store_location: Optional[str] = None
    salesperson_id: Optional[str] = None
    employee_name: Optional[str] = None

    class Config:
        orm_mode = True


class SaleResponse(BaseModel):
    data: list[SaleBase]
    total: int
    page: int
    page_size: int
    total_pages: int
