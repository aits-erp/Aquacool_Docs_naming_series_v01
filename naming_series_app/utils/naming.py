import frappe

DEFAULT_SERIES = {
    "Sales Invoice": "SINV-"  # default series if none exists
}

@frappe.whitelist()
def get_series(company, doctype):
    """
    Fetch naming series for a given company and doctype.
    If none found, return a default series.
    """
    if not company or not doctype:
        return []

    if not frappe.db.exists("Company", company):
        return []

    company_doc = frappe.get_doc("Company", company)

    # Use your custom table
    if not hasattr(company_doc, "custom_naming_series_mapping"):
        return [DEFAULT_SERIES.get(doctype, "")]

    series_list = []

    for row in company_doc.custom_naming_series_mapping:
        if getattr(row, "document_type", "").strip().lower() == doctype.strip().lower():
            if getattr(row, "naming_series", ""):
                series_list.append(row.naming_series.strip())

    # If nothing found, use default
    if not series_list:
        default_series = DEFAULT_SERIES.get(doctype, "")
        if default_series:
            series_list = [default_series]

    # Remove duplicates + sort
    return sorted(set(series_list))