from sqlalchemy import Column, Integer, String, Float, Date
from src.db import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    transaction_id = Column(String, index=True)
    date = Column(Date, index=True)

    customer_id = Column(String, index=True)
    customer_name = Column(String, index=True)
    phone_number = Column(String, index=True)
    gender = Column(String, index=True)
    age = Column(Integer, index=True)
    customer_region = Column(String, index=True)
    customer_type = Column(String)

    product_id = Column(String, index=True)
    product_name = Column(String)
    brand = Column(String)
    product_category = Column(String, index=True)
    tags = Column(String)

    quantity = Column(Integer)
    price_per_unit = Column(Float)
    discount_percentage = Column(Float)
    total_amount = Column(Float)
    final_amount = Column(Float)

    payment_method = Column(String, index=True)
    order_status = Column(String)
    delivery_type = Column(String)
    store_id = Column(String)
    store_location = Column(String)
    salesperson_id = Column(String)
    employee_name = Column(String)
