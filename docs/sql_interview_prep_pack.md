# SQL And Interview Prep Pack

Use this for 30-45 minutes/day. Say answers out loud after writing queries.

## Retail Schema

Core tables:

- `customers(customer_id, customer_name, segment, country, city, signup_date)`
- `products(product_id, product_name, category, unit_cost, unit_price)`
- `orders(order_id, order_date, order_month, customer_id, product_id, quantity, discount, unit_price, revenue, cost, gross_profit, margin, status)`
- `returns(return_id, order_id, return_date, reason, refunded_amount)`

## SQL Drills

### Core Queries

1. Total revenue by month.
2. Total orders by month.
3. Average order value by month.
4. Top 10 products by revenue.
5. Top 10 customers by revenue.
6. Products with zero sales.
7. Customers with no orders.
8. Orders with missing customer IDs.
9. Orders with zero or negative quantity.
10. Revenue by customer country.
11. Gross margin by product category.
12. Return rate by product category.
13. Duplicate order IDs.
14. Daily revenue for latest 30 days.
15. Orders joined to customer and product dimensions.

### Analytics Queries

16. Month-over-month revenue growth.
17. Running revenue total by month.
18. Rank products by monthly revenue.
19. Rank customers by lifetime value.
20. First order date per customer.
21. New customers by month.
22. Repeat customers by month.
23. Customers inactive for 90 days.
24. Revenue contribution percentage by category.
25. Average discount by category.
26. Refund amount by reason.
27. Return rate by customer segment.
28. Product category with highest margin.
29. Orders per customer percentile/rank.
30. KPI export total vs warehouse total.

### SaaS/Analytics Engineering Questions

31. MRR by month.
32. Churned customers by month.
33. Trial conversion rate.
34. Active users by feature.
35. Customer health score inputs.
36. Support tickets by priority.
37. Paid invoice revenue by segment.
38. Customers with product usage but no paid invoice.
39. Plans ranked by active subscriptions.
40. Monthly ARPA.

## Answer Patterns

### 1. Revenue By Month

```sql
SELECT
    order_month,
    ROUND(SUM(revenue), 2) AS revenue
FROM orders
GROUP BY order_month
ORDER BY order_month;
```

Measures monthly sales. It can be wrong if returned/cancelled orders should be excluded or if `order_month` is malformed.

### 4. Top Products By Revenue

```sql
SELECT
    p.product_id,
    p.product_name,
    p.category,
    ROUND(SUM(o.revenue), 2) AS revenue
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY p.product_id, p.product_name, p.category
ORDER BY revenue DESC
LIMIT 10;
```

Validates joins and aggregation grain. Check that each product ID is unique in `products`.

### 6. Products With Zero Sales

```sql
SELECT
    p.product_id,
    p.product_name,
    p.category
FROM products p
LEFT JOIN orders o ON p.product_id = o.product_id
WHERE o.order_id IS NULL;
```

Shows ability to use anti-joins. Wrong if inactive products should be filtered out first.

### 11. Gross Margin By Category

```sql
SELECT
    p.category,
    ROUND(SUM(o.gross_profit), 2) AS gross_profit,
    ROUND(SUM(o.gross_profit) / NULLIF(SUM(o.revenue), 0), 4) AS gross_margin
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY p.category
ORDER BY gross_margin DESC;
```

Use weighted margin, not average row margin. Validate against total revenue and profit.

### 12. Return Rate By Category

```sql
SELECT
    p.category,
    COUNT(DISTINCT o.order_id) AS orders,
    COUNT(DISTINCT r.return_id) AS returns,
    ROUND(COUNT(DISTINCT r.return_id) * 1.0 / NULLIF(COUNT(DISTINCT o.order_id), 0), 4) AS return_rate
FROM orders o
JOIN products p ON o.product_id = p.product_id
LEFT JOIN returns r ON o.order_id = r.order_id
GROUP BY p.category
ORDER BY return_rate DESC;
```

Tests join type judgment. Use `LEFT JOIN` so categories with zero returns stay visible.

### 16. Month-Over-Month Growth

```sql
WITH monthly AS (
    SELECT
        order_month,
        SUM(revenue) AS revenue
    FROM orders
    GROUP BY order_month
)
SELECT
    order_month,
    ROUND(revenue, 2) AS revenue,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY order_month))
        / NULLIF(LAG(revenue) OVER (ORDER BY order_month), 0),
        4
    ) AS monthly_growth
FROM monthly
ORDER BY order_month;
```

Shows CTEs and window functions. First month has no previous month, so growth is null.

### 17. Running Revenue

```sql
WITH monthly AS (
    SELECT order_month, SUM(revenue) AS revenue
    FROM orders
    GROUP BY order_month
)
SELECT
    order_month,
    ROUND(revenue, 2) AS revenue,
    ROUND(SUM(revenue) OVER (ORDER BY order_month), 2) AS running_revenue
FROM monthly
ORDER BY order_month;
```

Useful for cumulative reporting. Validate final running total equals total revenue.

### 18. Product Rank By Monthly Revenue

```sql
WITH product_month AS (
    SELECT
        o.order_month,
        p.product_name,
        SUM(o.revenue) AS revenue
    FROM orders o
    JOIN products p ON o.product_id = p.product_id
    GROUP BY o.order_month, p.product_name
)
SELECT
    order_month,
    product_name,
    ROUND(revenue, 2) AS revenue,
    RANK() OVER (PARTITION BY order_month ORDER BY revenue DESC) AS revenue_rank
FROM product_month
ORDER BY order_month, revenue_rank;
```

Use partitioned ranking. Ask whether ties should skip ranks or use dense ranks.

### 20. First Order Date

```sql
SELECT
    c.customer_id,
    c.customer_name,
    MIN(o.order_date) AS first_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name;
```

Keeps customers with no orders. Useful for cohort work.

### 21. New Customers By Month

```sql
WITH first_orders AS (
    SELECT
        customer_id,
        MIN(order_date) AS first_order_date
    FROM orders
    GROUP BY customer_id
)
SELECT
    SUBSTR(first_order_date, 1, 7) AS first_order_month,
    COUNT(*) AS new_customers
FROM first_orders
GROUP BY first_order_month
ORDER BY first_order_month;
```

Defines new customer by first purchase, not signup. Say this assumption clearly.

### 23. Customers Inactive For 90 Days

```sql
WITH last_orders AS (
    SELECT
        customer_id,
        MAX(order_date) AS last_order_date
    FROM orders
    GROUP BY customer_id
),
max_date AS (
    SELECT MAX(order_date) AS latest_order_date FROM orders
)
SELECT
    c.customer_id,
    c.customer_name,
    l.last_order_date
FROM customers c
LEFT JOIN last_orders l ON c.customer_id = l.customer_id
CROSS JOIN max_date m
WHERE l.last_order_date IS NULL
   OR DATE(l.last_order_date) < DATE(m.latest_order_date, '-90 day');
```

Uses latest dataset date instead of today, which is better for synthetic datasets.

### 24. Revenue Share By Category

```sql
WITH category_revenue AS (
    SELECT
        p.category,
        SUM(o.revenue) AS revenue
    FROM orders o
    JOIN products p ON o.product_id = p.product_id
    GROUP BY p.category
)
SELECT
    category,
    ROUND(revenue, 2) AS revenue,
    ROUND(revenue / NULLIF(SUM(revenue) OVER (), 0), 4) AS revenue_share
FROM category_revenue
ORDER BY revenue DESC;
```

Tests window totals. Validate shares sum close to 1.

### 26. Refund Amount By Reason

```sql
SELECT
    reason,
    COUNT(*) AS returns,
    ROUND(SUM(refunded_amount), 2) AS refunded_amount
FROM returns
GROUP BY reason
ORDER BY refunded_amount DESC;
```

Simple aggregation. Ask whether partial refunds should be handled differently.

### 27. Return Rate By Segment

```sql
SELECT
    c.segment,
    COUNT(DISTINCT o.order_id) AS orders,
    COUNT(DISTINCT r.return_id) AS returns,
    ROUND(COUNT(DISTINCT r.return_id) * 1.0 / NULLIF(COUNT(DISTINCT o.order_id), 0), 4) AS return_rate
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN returns r ON o.order_id = r.order_id
GROUP BY c.segment
ORDER BY return_rate DESC;
```

Tests multi-table joins. Validate no duplicate return rows inflate counts.

### 30. KPI Total Vs Warehouse Total

```sql
SELECT
    'orders_revenue' AS check_name,
    ROUND((SELECT SUM(revenue) FROM orders), 2) AS warehouse_total,
    ROUND((SELECT total_revenue FROM kpi_executive_overview), 2) AS kpi_total,
    ROUND(
        (SELECT SUM(revenue) FROM orders)
        - (SELECT total_revenue FROM kpi_executive_overview),
        2
    ) AS difference;
```

Shows data reliability thinking. A difference means the dashboard layer is no longer trusted.

## Verbal Interview Drills

Answer each in 60 seconds:

1. Explain `JOIN` vs `LEFT JOIN`.
2. Explain CTE vs subquery.
3. Explain window function vs `GROUP BY`.
4. Explain why duplicates are dangerous in KPI queries.
5. Explain idempotent incremental loading.
6. Explain how to validate a data pipeline.
7. Explain why a dashboard can show wrong numbers.
8. Explain SQLite vs DuckDB.
9. Explain batch vs streaming.
10. Explain what you would do if a scheduled pipeline failed.

## Practice Score

- 0: cannot start without help.
- 1: can write rough query with mistakes.
- 2: correct query after checking schema.
- 3: correct query and clear verbal explanation.

Target before interviews: 25 drills at score 3.
