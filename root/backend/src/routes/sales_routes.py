from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from src.db import SessionLocal
from src.schemas.sale import SaleBase, SaleResponse
from src.services.sales_service import SalesQueryParams, get_sales

router = APIRouter(prefix="/sales", tags=["Sales"])

def db():
    s = SessionLocal()
    try:
        yield s
    finally:
        s.close()

@router.get("/", response_model=SaleResponse)
def fetch_sales(
    search: Optional[str] = None,
    customer_region: List[str] = Query(default=[]),
    gender: List[str] = Query(default=[]),
    age_min: Optional[int] = None,
    age_max: Optional[int] = None,
    product_category: List[str] = Query(default=[]),
    tags: List[str] = Query(default=[]),
    payment_method: List[str] = Query(default=[]),
    date_from: Optional[date] = None,
    date_to: Optional[date] = None,
    sort_by: Optional[str] = "date",
    sort_dir: Optional[str] = "desc",
    page: int = 1,
    page_size: int = 10,
    session: Session = Depends(db)
):

    params = SalesQueryParams(
        search=search,
        regions=customer_region,
        genders=gender,
        age_min=age_min,
        age_max=age_max,
        categories=product_category,
        tags=tags,
        payments=payment_method,
        date_from=date_from,
        date_to=date_to,
        sort_by=sort_by,
        sort_dir=sort_dir,
        page=page,
        page_size=page_size
    )

    rows, total = get_sales(session, params)
    total_pages = (total + page_size - 1) // page_size

    return SaleResponse(
        data=[SaleBase.from_orm(r) for r in rows],
        total=total,
        total_pages=total_pages,
        page=page,
        page_size=page_size
    )
