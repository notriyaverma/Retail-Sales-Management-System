from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.services.sales_service import SalesQueryParams, get_sales
from src.utils.db import get_db

router = APIRouter()

@router.get("/sales")
def fetch_sales(
    search: str | None = None,
    customer_region: list[str] | None = None,
    gender: list[str] | None = None,
    product_category: list[str] | None = None,
    payment_method: list[str] | None = None,
    tags: list[str] | None = None,
    age_min: int | None = None,
    age_max: int | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
    sort_by: str = "date",
    sort_dir: str = "desc",
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
):
    params = SalesQueryParams(
        search=search,
        regions=customer_region,
        genders=gender,
        categories=product_category,
        payments=payment_method,
        tags=tags,
        age_min=age_min,
        age_max=age_max,
        date_from=date_from,
        date_to=date_to,
        sort_by=sort_by,
        sort_dir=sort_dir,
        page=page,
        page_size=page_size,
    )

    result = get_sales(db, params)

    # CONVERT SQLAlchemy objects to dict
    result["data"] = [
        row.to_dict() for row in result["data"]
    ]

    return result
