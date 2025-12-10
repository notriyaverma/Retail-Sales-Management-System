# 🛒 Retail Sales Management System
website link: https://retail-sales-frontend-wucl.onrender.com

## **Overview**

A **full-stack Retail Sales Management System** designed to efficiently manage sales data. It features advanced search capabilities, powerful multi-filters, custom sorting, and insightful analytics summaries, all built on a robust, production-grade architecture.

---

## **🌟 Key Features**

* **Advanced Data Management:** Supports complex combinations of search, filters, and sorting.
* **Analytics Summaries:** Quick, actionable insights into sales data.
* **Pagination:** Smooth browsing with 10 items per page, retaining all applied parameters.

---

## **🛠️ Tech Stack**

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | **React**, **TypeScript**, **Vite**, **TailwindCSS** |
| **Backend** | **FastAPI**, **SQLAlchemy**, **Uvicorn** |
| **Database** | **SQLite** |
| **Deployment** | **Render** (Backend), **Vercel** (Frontend) |

---

## **🔍 Implementation Details**

### **Search**

* **Target Fields:** Full-text search over **Customer Name** and **Phone Number**.
* **Mechanism:** Case-insensitive search implemented using **SQL `LIKE`** and **`LOWER()`** functions.
* **Integration:** Works seamlessly alongside all active filters, sorting, and pagination.

### **Filters**

* **Multi-Select Fields:**
    * Customer Region
    * Gender
    * Age Range
    * Product Category
    * Tags
    * Payment Method
    * Date Range
* **Logic:** Filters combine using **`AND`/`OR`** logic and **maintain state** across navigation.

### **Sorting**

* **Supported Fields:**
    * Date (**Newest first**)
    * Customer Name (**A–Z**)
    * Quantity
* **Integration:** Operates with active filters, search queries, and pagination.

### **Pagination**

* **Navigation:** Supports **Next / Previous** page navigation.
* **State Retention:** Retains applied search, filters, and sorting state.
* **Metadata:** Includes `total_pages`, `page`, and `page_size` in the response.

---

## **🚀 Setup & Installation**

### **1. Backend Setup (FastAPI)**

To run the backend API server:

```bash
# Navigate to the backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the Uvicorn server (with auto-reload for development)
uvicorn backend.src.main:app --reload
```

### **2.Fronted Setup (FastAPI)**

To run the frontend server:

```bash
cd frontend
npm install
npm run dev

