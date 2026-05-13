from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "Ahmed_Yasser_Portfolio_Proof_Sheet.pdf"
INK = colors.HexColor("#1f2933")
MUTED = colors.HexColor("#52616f")
BLUE = colors.HexColor("#0b63ce")
LINE = colors.HexColor("#c8d0da")
BAND = colors.HexColor("#eef4fb")


styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=21,
    textColor=INK,
    spaceAfter=4,
)

subtitle_style = ParagraphStyle(
    "Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=12,
    textColor=MUTED,
    spaceAfter=8,
)

section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=12,
    textColor=INK,
    spaceBefore=8,
    spaceAfter=5,
)

body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.7,
    leading=11,
    textColor=INK,
)

small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=8,
    leading=10,
    textColor=MUTED,
)

link_style = ParagraphStyle(
    "Link",
    parent=small_style,
    textColor=BLUE,
)


def p(text: str, style: ParagraphStyle = body_style) -> Paragraph:
    return Paragraph(text, style)


def project_table() -> Table:
    rows = [
        [p("<b>Project</b>"), p("<b>Problem</b>"), p("<b>Proof</b>")],
        [
            p("<b>Retail Data Pipeline</b>"),
            p("Messy retail exports need trusted KPIs."),
            p(
                "Python/SQL ETL, YAML contracts, full/incremental SQLite loads, rejected rows, KPI exports, "
                "health checks, Streamlit, Docker, CI, dbt-style models, optional Airflow DAG."
            ),
        ],
        [
            p("<b>SaaS Analytics Pipeline</b>"),
            p("SaaS teams need reliable MRR, churn, adoption, and health metrics."),
            p("DuckDB/Parquet layers, SQL marts, contracts, incremental loading, dashboard, Docker, CI."),
        ],
        [
            p("<b>Cloud Security Auditor</b>"),
            p("Cloud teams need safer posture checks without real account exposure."),
            p("AWS-style snapshots, YAML policy rules, severity scoring, remediation reports, dashboard."),
        ],
        [
            p("<b>Outlook Calendar Automation</b>"),
            p("Academic deadlines are spread across email and easy to miss."),
            p("Outlook scanning, Google Calendar API, SQLite dedupe, dry-run mode, JSON audit logs."),
        ],
    ]
    table = Table(rows, colWidths=[1.45 * inch, 1.55 * inch, 4.15 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BAND),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


story = [
    p("Ahmed Yasser Shalaby - Portfolio Proof Sheet", title_style),
    p(
        "Business Informatics student targeting Summer 2026 Data Engineering, Analytics Engineering, "
        "BI/Data, and Cloud/Security Automation internships.",
        subtitle_style,
    ),
    p(
        '<font color="#0b63ce">GitHub:</font> github.com/HaloXD1 &nbsp;&nbsp; '
        '<font color="#0b63ce">Portfolio:</font> haloxd1.github.io/ahmed-yasser-portfolio/ &nbsp;&nbsp; '
        '<font color="#0b63ce">Email:</font> Ahmedy999.ay@gmail.com',
        small_style,
    ),
    Spacer(1, 6),
    p("Strongest Proof", section_style),
    project_table(),
    p("Skills I Can Defend", section_style),
    p(
        "Python data cleaning and automation; SQL joins, CTEs, windows, marts, and KPI validation; "
        "data contracts and rejected-row reporting; incremental/idempotent loading; Streamlit dashboards; "
        "GitHub Actions, pytest, Ruff, Docker; IAM-style checks, policy-as-code, and risk scoring.",
    ),
    p("Best Links", section_style),
    p("Retail demo: https://ahmed-retail-kpi-dashboard.streamlit.app/", link_style),
    p("Retail repo: https://github.com/HaloXD1/data-pipeline-kpi-dashboard", link_style),
    p("SaaS demo: https://ahmed-saas-analytics-pipeline.streamlit.app/", link_style),
    p("SaaS repo: https://github.com/HaloXD1/saas-analytics-engineering-pipeline", link_style),
    p("Cloud demo: https://ahmed-cloud-security-auditor.streamlit.app/", link_style),
    p("Cloud repo: https://github.com/HaloXD1/cloud-security-posture-auditor", link_style),
    p("Profile: https://github.com/HaloXD1", link_style),
]

doc = SimpleDocTemplate(
    str(OUT),
    pagesize=A4,
    rightMargin=0.55 * inch,
    leftMargin=0.55 * inch,
    topMargin=0.55 * inch,
    bottomMargin=0.55 * inch,
    title="Ahmed Yasser Portfolio Proof Sheet",
    author="Ahmed Yasser Shalaby",
)
doc.build(story)
print(OUT)
