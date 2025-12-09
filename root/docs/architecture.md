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
