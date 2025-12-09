from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.services.sales_service import get_sales, SalesQueryParams
from src.schemas.sale import SaleResponse
from src.db import get_db

from src.services.sales_service import (
    SalesQueryParams,
    get_sales
)

router = APIRouter()


@router.get("/sales")
def fetch_sales(
    search: str | None = None,
    customer_region: list[str] | None = Query(None),
    gender: list[str] | None = Query(None),
    product_category: list[str] | None = Query(None),
    tags: list[str] | None = Query(None),
    payment_method: list[str] | None = Query(None),
    date_from: str | None = None,
    date_to: str | None = None,
    age_min: int | None = None,
    age_max: int | None = None,
    sort_by: str | None = None,
    sort_dir: str = "desc",
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
):
    """Main GET /sales route."""
    
    params = SalesQueryParams(
        search=search,
        regions=customer_region,
        genders=gender,
        categories=product_category,
        tags=tags,
        payments=payment_method,
        age_min=age_min,
        age_max=age_max,
        date_from=date_from,
        date_to=date_to,
        sort_by=sort_by,
        sort_dir=sort_dir,
        page=page,
        page_size=page_size,
    )

    return get_sales(db, params)
