from datetime import date as DateType
from pydantic import BaseModel

class SaleBase(BaseModel):
    transaction_id: str | None = None
    date: DateType | None = None
    customer_id: str | None = None
    customer_name: str | None = None
    phone_number: str | None = None
    gender: str | None = None
    age: int | None = None
    customer_region: str | None = None
    customer_type: str | None = None
    product_id: str | None = None
    product_name: str | None = None
    brand: str | None = None
    product_category: str | None = None
    tags: str | None = None
    quantity: int | None = None
    price_per_unit: float | None = None
    discount_percentage: float | None = None
    total_amount: float | None = None
    final_amount: float | None = None
    payment_method: str | None = None
    order_status: str | None = None
    delivery_type: str | None = None
    store_id: str | None = None
    store_location: str | None = None
    salesperson_id: str | None = None
    employee_name: str | None = None

    model_config = {
        "from_attributes": True
    }


class SaleResponse(BaseModel):
    data: list[SaleBase]
    total: int
    page: int
    page_size: int
    total_pages: int
