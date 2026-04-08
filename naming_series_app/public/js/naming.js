console.log("🔥 Universal Naming Series JS Loaded");

// Define default series for common doctypes
const DEFAULT_SERIES = {
	"Sales Invoice": "SINV-",
	"Purchase Order": "PO-",
	"Delivery Note": "DN-",
	"Purchase Invoice": "PINV-",
	"Sales Order": "SO-",
	"Stock Entry": "STE-",
	Quotation: "QUO-", // Added Quotation
};

// List of doctypes to apply this script to
const DOCTYPES = [
	"Sales Invoice",
	"Purchase Order",
	"Delivery Note",
	"Purchase Invoice",
	"Sales Order",
	"Stock Entry",
	"Quotation", // Added Quotation
];

DOCTYPES.forEach((dt) => {
	frappe.ui.form.on(dt, {
		refresh: function (frm) {
			apply_series_with_delay(frm);
		},
		company: function (frm) {
			console.log(`${dt} Company Changed:`, frm.doc.company);

			// Clear old value immediately
			frm.set_value("naming_series", "");
			apply_series_with_delay(frm);
		},
	});
});

function apply_series_with_delay(frm) {
	// Run multiple times to override ERP default
	setTimeout(() => apply_series(frm), 300);
	setTimeout(() => apply_series(frm), 800);
	setTimeout(() => apply_series(frm), 1500);
}

function apply_series(frm) {
	if (!frm.doc.company || !frm.fields_dict.naming_series) return;

	frappe.call({
		method: "naming_series_app.utils.naming.get_series",
		args: {
			company: frm.doc.company,
			doctype: frm.doc.doctype,
		},
		callback: function (r) {
			let series = r.message || [];
			console.log(`${frm.doc.doctype} Fetched Series:`, series);

			if (series.length > 0) {
				// Set the options in dropdown
				frm.fields_dict.naming_series.df.options = series.join("\n");
				frm.refresh_field("naming_series");

				// Always set a valid value
				if (!series.includes(frm.doc.naming_series)) {
					frm.set_value("naming_series", series[0]);
				}
			} else {
				// Fallback if nothing returned
				const default_series =
					DEFAULT_SERIES[frm.doc.doctype] ||
					frm.doc.doctype.substr(0, 4).toUpperCase() + "-";
				frm.fields_dict.naming_series.df.options = default_series;
				frm.refresh_field("naming_series");
				frm.set_value("naming_series", default_series);
			}
		},
	});
}
