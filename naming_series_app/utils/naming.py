# import frappe

# DEFAULT_SERIES = {
#     "Sales Invoice": "SINV-"  # default series if none exists
# }

# @frappe.whitelist()
# def get_series(company, doctype):
#     """
#     Fetch naming series for a given company and doctype.
#     If none found, return a default series.
#     """
#     if not company or not doctype:
#         return []

#     if not frappe.db.exists("Company", company):
#         return []

#     company_doc = frappe.get_doc("Company", company)

#     # Use your custom table
#     if not hasattr(company_doc, "custom_naming_series_mapping"):
#         return [DEFAULT_SERIES.get(doctype, "")]

#     series_list = []

#     for row in company_doc.custom_naming_series_mapping:
#         if getattr(row, "document_type", "").strip().lower() == doctype.strip().lower():
#             if getattr(row, "naming_series", ""):
#                 series_list.append(row.naming_series.strip())

#     # If nothing found, use default
#     if not series_list:
#         default_series = DEFAULT_SERIES.get(doctype, "")
#         if default_series:
#             series_list = [default_series]

#     # Remove duplicates + sort
#     return sorted(set(series_list))


import frappe

DEFAULT_SERIES = {
	"Sales Invoice": "SINV-",
	"Sales Order": "SO-",
	"Quotation": "QUO-",
}


@frappe.whitelist()
def get_series(company, doctype):
	if not company or not doctype:
		return []

	if not frappe.db.exists("Company", company):
		return []

	series_set = set()

	# ✅ 1. Get from Company Mapping
	company_doc = frappe.get_doc("Company", company)

	if hasattr(company_doc, "custom_naming_series_mapping"):
		for row in company_doc.custom_naming_series_mapping:
			if (row.document_type or "").strip().lower() == doctype.strip().lower():
				if row.naming_series:
					series_set.add(row.naming_series.strip())

	# ✅ 2. Get from existing Draft documents (FIXED: f-string)
	draft_series = frappe.db.sql(
		f"""
        SELECT DISTINCT naming_series
        FROM `tab{doctype}`
        WHERE company = %s
        AND docstatus = 0
        AND naming_series IS NOT NULL
        """,
		(company,),
		as_dict=1,
	)

	for d in draft_series:
		if d.naming_series:
			series_set.add(d.naming_series.strip())

	# ✅ 3. Fallback default
	if not series_set:
		default = DEFAULT_SERIES.get(doctype)
		if default:
			series_set.add(default)

	return sorted(series_set)
