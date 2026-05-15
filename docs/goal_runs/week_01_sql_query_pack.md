# Week 1 SQL Query Pack

Goal: build SQL fluency for Data Engineering and BI internship interviews.

Use the Retail and SaaS portfolio datasets where possible. If a table name differs, adapt the query while keeping the same business question.

## Assumed Retail Schema (adapt as needed)

- `orders(order_id, customer_id, order_date, region, status)`
- `order_items(order_id, product_id, quantity, unit_price, discount, cost)`
- `customers(customer_id, created_at, region)`
- `products(product_id, product_name, category)`
- `returns(order_id, product_id, return_date)`

Revenue convention used below:

- `item_revenue = quantity * unit_price * (1 - COALESCE(discount,0))`

## Task 1: Core SQL

Write queries for:

1. Total revenue by month.
2. Total orders by month.
3. Average order value by month.
4. Top 10 products by revenue.
5. Top 10 customers by revenue.
6. Products with zero sales.
7. Customers with no orders.
8. Orders with missing customer IDs.
9. Orders with negative or zero quantity.
10. Revenue by region.
11. Gross margin by category.
12. Return rate by product.
13. Count of duplicate order IDs.
14. Daily revenue for the latest 30 days.
15. Orders joined to customer and product dimensions.

## Task 2: Analytics SQL

Write queries for:

1. Month-over-month revenue growth.
2. Running revenue total by month.
3. Rank products by monthly revenue.
4. Rank customers by lifetime value.
5. Customer first order date.
6. New customers by month.
7. Repeat customers by month.
8. Churned customers using a 90-day inactivity rule.
9. SaaS MRR by month.
10. SaaS churn rate by month.
11. Trial conversion rate.
12. Product adoption rate.
13. Support tickets by customer health segment.
14. Data quality issue count by type.
15. KPI export total compared with warehouse total.

## Explanation Requirement

For each answer, add 1-2 sentences:

- What the query measures.
- What can cause the result to be wrong.
- How you would validate it.

---

## Mini Deliverable (Solved Examples)

These are reference answers to copy/adapt to your actual table/column names.

### Core SQL 1) Total revenue by month

```sql
WITH line_revenue AS (
  SELECT
    o.order_id,
    date_trunc('month', o.order_date) AS month,
    (oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
)
SELECT
  month,
  SUM(revenue) AS total_revenue
FROM line_revenue
GROUP BY 1
ORDER BY 1;
```

Measures monthly gross sales from order lines. Wrong if join duplicates lines or grain mismatch; validate by reconciling to raw order_items totals for a known month.

### Core SQL 4) Top 10 products by revenue

```sql
SELECT
  p.product_id,
  p.product_name,
  SUM(oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
FROM order_items oi
JOIN products p ON p.product_id = oi.product_id
GROUP BY 1,2
ORDER BY revenue DESC
LIMIT 10;
```

Measures product contribution to sales. Wrong if returns/cancellations not excluded; validate by checking a few product_id drilldowns and status filters.

### Core SQL 6) Products with zero sales

```sql
SELECT
  p.product_id,
  p.product_name
FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.product_id
WHERE oi.product_id IS NULL
ORDER BY 1;
```

Finds products never referenced in sales lines. Wrong if sales live in another table or product_id remaps; validate with a sanity count and spot-check a few product_ids.

### Core SQL 13) Count of duplicate order IDs

```sql
SELECT
  COUNT(*) AS duplicate_order_id_count
FROM (
  SELECT order_id
  FROM orders
  GROUP BY 1
  HAVING COUNT(*) > 1
) d;
```

Measures data quality issue: duplicated primary key. Wrong if `orders` is intentionally versioned; validate by checking if duplicates differ by load timestamp/version.

### Core SQL 14) Daily revenue for the latest 30 days

```sql
WITH line_revenue AS (
  SELECT
    o.order_date::date AS day,
    (oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  WHERE o.order_date >= (CURRENT_DATE - INTERVAL '30 days')
)
SELECT
  day,
  SUM(revenue) AS daily_revenue
FROM line_revenue
GROUP BY 1
ORDER BY 1;
```

Measures last-30-days daily sales trend. Wrong if timezones or late-arriving data shifts dates; validate by comparing to source extracts and checking a stable “yesterday” total.

### Analytics SQL 1) Month-over-month revenue growth

```sql
WITH monthly AS (
  SELECT
    date_trunc('month', o.order_date) AS month,
    SUM(oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY 1
)
SELECT
  month,
  revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) AS mom_abs_change,
  CASE
    WHEN LAG(revenue) OVER (ORDER BY month) = 0 THEN NULL
    ELSE revenue / LAG(revenue) OVER (ORDER BY month) - 1
  END AS mom_pct_change
FROM monthly
ORDER BY 1;
```

Measures month-to-month sales change. Wrong if partial months included; validate by filtering to full months and checking the first/last month edges.

### Analytics SQL 2) Running revenue total by month

```sql
WITH monthly AS (
  SELECT
    date_trunc('month', o.order_date) AS month,
    SUM(oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY 1
)
SELECT
  month,
  revenue,
  SUM(revenue) OVER (ORDER BY month) AS running_revenue
FROM monthly
ORDER BY 1;
```

Measures cumulative sales to date. Wrong if months missing (gaps) or duplicates; validate by ensuring monthly has unique months and expected row count.

### Analytics SQL 3) Rank products by monthly revenue

```sql
WITH product_month AS (
  SELECT
    date_trunc('month', o.order_date) AS month,
    oi.product_id,
    SUM(oi.quantity * oi.unit_price * (1 - COALESCE(oi.discount, 0))) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY 1,2
)
SELECT
  month,
  product_id,
  revenue,
  DENSE_RANK() OVER (PARTITION BY month ORDER BY revenue DESC) AS revenue_rank
FROM product_month
ORDER BY month, revenue_rank, product_id;
```

Measures within-month product performance. Wrong if returns not netted out or revenue calc differs; validate by comparing top 3 for a month to an ad-hoc grouped query.

### Analytics SQL 8) Churned customers (90-day inactivity)

```sql
WITH last_order AS (
  SELECT
    customer_id,
    MAX(order_date)::date AS last_order_date
  FROM orders
  WHERE customer_id IS NOT NULL
  GROUP BY 1
)
SELECT
  customer_id,
  last_order_date
FROM last_order
WHERE last_order_date < (CURRENT_DATE - INTERVAL '90 days')
ORDER BY last_order_date;
```

Flags customers whose last purchase is older than 90 days. Wrong if seasonality or business churn definition differs; validate by sampling customers near the cutoff and confirming no newer orders.
