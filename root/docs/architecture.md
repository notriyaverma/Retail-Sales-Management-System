## **🏗️ System Architecture & Data Flow**

This system employs a **standard layered architecture** for the backend and a component-driven structure for the frontend, ensuring **scalability and maintainability**.

### **Backend Architecture (FastAPI)**

The backend is structured around the **Model-Service-Controller (MSC)** pattern (or Controller/Route - Service - Model pattern) for clear separation of concerns.

* **Framework:** **FastAPI** (ensures high performance and automatic validation).
* **Database:** **SQLite** managed by **SQLAlchemy ORM** for efficient and object-oriented data interaction.
* **Core Logic:** The `sales_service` is the central component, responsible for handling all complex data retrieval tasks:
    * **Search**
    * **Filtering** (Multi-select logic)
    * **Sorting**
    * **Pagination**
    * **Summary Metrics** generation.
* **Response Structure:** Every successful sales request returns a standardized JSON object:

```json
{
  "data": [
    // ... array of sales records
  ],
  "total": 12345,        // Total items matching search/filter criteria
  "total_pages": 124,    // Total pages based on page_size
  "stats": {
    "total_units": 98765,
    "total_amount": 1234567.89,
    "total_discount": 54321.00
  }
}
```


### **Frontend Architecture**

* **Core Stack:** **React** with **Vite** (for fast bundling/tooling).
* **State Management:** Primarily utilizes **Local component state** for managing user interactions (filters, sorting, search).
* **Key Custom Hooks:**
    * `useSales`: The central hook for managing **data fetching**, constructing **query parameters**, and integrating filter/sorting logic with the API.
* **Primary Components:** The UI is composed of highly reusable and focused components:
    * `Filters`
    * `SearchBar`
    * `SortDropdown`
    * `StatsCards` (Displays key metrics)
    * `SalesTable` (Displays the main data)
    * `Pagination`
    * `Sidebar` (Layout container)

---

### **🔄 Data Flow Summary**

The system employs a client-side driven data flow:

1.  **User Action:** User interacts with the UI (changes filter/search/sort).
2.  **Query Construction:** The **`useSales` hook** detects the change and constructs the appropriate **query parameters** (e.g., `?gender=MALE&sort=date`).
3.  **API Request:** The hook calls the central API endpoint: **`/sales`**.
4.  **API Response:** The backend returns structured data: `data`, `total`, `total_pages`, and **`stats` (metrics)**.
5.  **UI Update:** The `SalesTable` and `StatsCards` components automatically update to reflect the new data.
6.  **Persistence:** The state is managed locally and **persists through navigation**.

---

## **📂 Detailed Folder Structure & Module Responsibilities**

The project adheres to a clean, domain-separated folder structure to separate concerns effectively.

### **Project Structure Overview**

## **🗂️ Project Directory Structure**

* **root/**
    * **backend/**
        * **src/**
            * `main.py`
            * **controllers/**
            * **services/**
            * **utils/**
            * **routes/**
            * **models/**
    * **frontend/**
        * **src/**
            * `App.tsx`
            * **components/**
            * **pages/**
            * **services/**
            * **hooks/**
            * **styles/**
            * **utils/**
    * **docs/**
        * `architecture.md`
    * `README.md` (Main Project README)


### **Module Responsibilities**

| Module | Layer | Responsibility |
| :--- | :--- | :--- |
| `controllers` | Backend | Maps incoming **request** data to the correct **service** method. |
| `services` | Backend | Implements core **business logic** (search, filter, sort, aggregation). |
| `routes` | Backend | Defines the **API endpoints** and handles HTTP methods. |
| `models` | Backend | Defines the **database schema** using SQLAlchemy ORM. |
| `utils` | Backend/Frontend | Houses common helpers, like **DB connection** setup (backend) or formatting (frontend). |
| `hooks` | Frontend | Custom React hooks that handle **data fetching** and state transformation (`useSales`). |
| `components` | Frontend | Reusable **UI blocks** (e.g., tables, forms, buttons). |
