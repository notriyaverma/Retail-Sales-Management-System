from datetime import date
from typing import Sequence

from sqlalchemy.orm import Session
from sqlalchemy import select, func, and_, or_

from src.models.sale import Sale


class SalesQueryParams:
    def __init__(
        self,
        search: str | None = None,
        regions: list[str] | None = None,
        genders: list[str] | None = None,
        age_min: int | None = None,
        age_max: int | None = None,
        categories: list[str] | None = None,
        tags: list[str] | None = None,
        payments: list[str] | None = None,
        date_from: date | None = None,
        date_to: date | None = None,
        sort_by: str | None = None, # "date", "quantity", "name"
        sort_dir: str = "desc", # "asc" | "desc"
        page: int = 1,
        page_size: int = 10,
    ):
        self.search = search
        self.regions = regions or []
        self.genders = genders or []
        self.age_min = age_min
        self.age_max = age_max
        self.categories = categories or []
        self.tags = tags or []
        self.payments = payments or []
        self.date_from = date_from
        self.date_to = date_to
        self.sort_by = sort_by
        self.sort_dir = sort_dir
        self.page = max(page, 1)
        self.page_size = min(max(page_size, 1), 100)


def build_sales_query(params: SalesQueryParams):
    filters = []

    if params.search:
        s = f"%{params.search.lower()}%"
        filters.append(
            or_(
                func.lower(Sale.customer_name).like(s),
                Sale.phone_number.like(f"%{params.search}%"),
            )
        )

    if params.regions:
        filters.append(Sale.customer_region.in_(params.regions))

    if params.genders:
        filters.append(Sale.gender.in_(params.genders))

    if params.age_min is not None:
        filters.append(Sale.age >= params.age_min)

    if params.age_max is not None:
        filters.append(Sale.age <= params.age_max)

    if params.categories:
        filters.append(Sale.product_category.in_(params.categories))

    if params.tags:
        tag_filters = [Sale.tags.ilike(f"%{tag}%") for tag in params.tags]
        filters.append(or_(*tag_filters))

    if params.payments:
        filters.append(Sale.payment_method.in_(params.payments))

    if params.date_from is not None:
        filters.append(Sale.date >= params.date_from)

    if params.date_to is not None:
        filters.append(Sale.date <= params.date_to)

    stmt = select(Sale)
    if filters:
        stmt = stmt.where(and_(*filters))

    # Sorting
    if params.sort_by == "quantity":
        sort_column = Sale.quantity
    elif params.sort_by == "name":
        sort_column = Sale.customer_name
    else: # default: date
        sort_column = Sale.date

    if params.sort_dir == "asc":
        stmt = stmt.order_by(sort_column.asc())
    else:
        stmt = stmt.order_by(sort_column.desc())

    return stmt, filters


def get_sales(session: Session, params: SalesQueryParams):
    stmt, filters = build_sales_query(params)

    # ---- TOTALS BEFORE PAGINATION ----
    total_units_stmt = select(func.sum(Sale.quantity))
    total_amount_stmt = select(func.sum(Sale.final_amount))
    total_discount_stmt = select(func.sum(Sale.total_amount - Sale.final_amount))

    if filters:
        total_units_stmt = total_units_stmt.where(and_(*filters))
        total_amount_stmt = total_amount_stmt.where(and_(*filters))
        total_discount_stmt = total_discount_stmt.where(and_(*filters))

    total_units = session.execute(total_units_stmt).scalar() or 0
    total_amount = session.execute(total_amount_stmt).scalar() or 0
    total_discount = session.execute(total_discount_stmt).scalar() or 0

    # ---- TOTAL ROW COUNT ----
    count_stmt = select(func.count(Sale.id))
    if filters:
        count_stmt = count_stmt.where(and_(*filters))
    total = session.execute(count_stmt).scalar_one()

    # ---- PAGINATION ----
    page = params.page
    page_size = params.page_size
    offset = (page - 1) * page_size

    stmt = stmt.offset(offset).limit(page_size)
    rows = session.execute(stmt).scalars().all()

    total_pages = (total + page_size - 1) // page_size

    return {
        "data": rows,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": total_pages,

        # NEW STATS
        "total_units": total_units,
        "total_amount": total_amount,
        "total_discount": total_discount,
    }