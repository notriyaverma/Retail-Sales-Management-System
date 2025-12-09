import sys
import traceback
from pathlib import Path
import pandas as pd
from datetime import datetime
from sqlalchemy.orm import Session
from src.db import Base, engine, SessionLocal
from src.models.sale import Sale

# resolve CSV relative to backend/src (works regardless of cwd)
BASE_DIR = Path(__file__).resolve().parents[2]  # backend/src -> parents[2] = backend
CSV_PATH = BASE_DIR / "data" / "sales.csv"

def parse_date(val: str | None):
    if not val or pd.isna(val):
        return None
    try:
        return datetime.strptime(val, "%Y-%m-%d").date()
    except ValueError:
        return None

def load_csv():
    if not CSV_PATH.exists():
        print(f"ERROR: CSV not found at {CSV_PATH}", file=sys.stderr)
        return

    print(f"Loading CSV from {CSV_PATH}")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    try:
        df = pd.read_csv(CSV_PATH)
    except Exception:
        print("ERROR: Failed to read CSV", file=sys.stderr)
        traceback.print_exc()
        return

    session: Session = SessionLocal()
    try:
        records = []
        total = 0
        for _, row in df.iterrows():
            sale = Sale(
                transaction_id=str(row.get("Transaction ID", "")),
                date=parse_date(row.get("Date")),
                customer_id=row.get("Customer ID"),
                customer_name=row.get("Customer Name"),
                phone_number=str(row.get("Phone Number", "")),
                gender=row.get("Gender"),
                age=int(row["Age"]) if not pd.isna(row.get("Age")) else None,
                customer_region=row.get("Customer Region"),
                customer_type=row.get("Customer Type"),
                product_id=row.get("Product ID"),
                product_name=row.get("Product Name"),
                brand=row.get("Brand"),
                product_category=row.get("Product Category"),
                tags=row.get("Tags"),
                quantity=int(row["Quantity"]) if not pd.isna(row.get("Quantity")) else None,
                price_per_unit=float(row["Price per Unit"]) if not pd.isna(row.get("Price per Unit")) else None,
                discount_percentage=float(row["Discount Percentage"]) if not pd.isna(row.get("Discount Percentage")) else None,
                total_amount=float(row["Total Amount"]) if not pd.isna(row.get("Total Amount")) else None,
                final_amount=float(row["Final Amount"]) if not pd.isna(row.get("Final Amount")) else None,
                payment_method=row.get("Payment Method"),
                order_status=row.get("Order Status"),
                delivery_type=row.get("Delivery Type"),
                store_id=row.get("Store ID"),
                store_location=row.get("Store Location"),
                salesperson_id=row.get("Salesperson ID"),
                employee_name=row.get("Employee Name"),
            )
            records.append(sale)
            if len(records) >= 5000:
                session.add_all(records)
                session.commit()
                total += len(records)
                records.clear()

        if records:
            session.add_all(records)
            session.commit()
            total += len(records)

        print(f"Inserted {total} records into DB")
    except Exception:
        print("ERROR: Exception while writing to DB", file=sys.stderr)
        traceback.print_exc()
    finally:
        session.close()

if __name__ == "__main__":
    load_csv()