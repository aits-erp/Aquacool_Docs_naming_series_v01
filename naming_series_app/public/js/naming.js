// console.log("🔥 Universal Naming Series JS Loaded");

// const DEFAULT_SERIES = {
// 	"Sales Invoice": "SINV-",
// 	"Purchase Order": "PO-",
// 	"Delivery Note": "DN-",
// 	"Purchase Invoice": "PINV-",
// 	"Sales Order": "SO-",
// 	"Stock Entry": "STE-",
// 	Quotation: "QUO-",
// };

// const DOCTYPES = [
// 	"Sales Invoice",
// 	"Purchase Order",
// 	"Delivery Note",
// 	"Purchase Invoice",
// 	"Sales Order",
// 	"Stock Entry",
// 	"Quotation",
// ];

// DOCTYPES.forEach((dt) => {
// 	frappe.ui.form.on(dt, {
// 		onload: function (frm) {
// 			apply_series(frm);
// 		},

// 		refresh: function (frm) {
// 			apply_series(frm);
// 		},

// 		company: function (frm) {
// 			console.log(`${dt} Company Changed:`, frm.doc.company);

// 			if (frm.doc.docstatus === 0) {
// 				frm.set_value("naming_series", "");
// 				apply_series(frm);
// 			}
// 		},
// 	});
// });

// function apply_series(frm) {
// 	if (!frm.doc.company || !frm.fields_dict.naming_series) return;

// 	// ❌ Skip submitted
// 	if (frm.doc.docstatus === 1) return;

// 	frappe.call({
// 		method: "naming_series_app.utils.naming.get_series",
// 		args: {
// 			company: frm.doc.company,
// 			doctype: frm.doc.doctype,
// 		},
// 		callback: function (r) {
// 			let series = r.message || [];
// 			console.log(`${frm.doc.doctype} Fetched Series:`, series);

// 			// ✅ Fallback
// 			if (!series.length) {
// 				const default_series =
// 					DEFAULT_SERIES[frm.doc.doctype] ||
// 					frm.doc.doctype.substr(0, 4).toUpperCase() + "-";

// 				series = [default_series];
// 			}

// 			// ✅ Set dropdown options
// 			frm.fields_dict.naming_series.df.options = series.join("\n");
// 			frm.refresh_field("naming_series");

// 			let current_series = frm.doc.naming_series;

// 			// ✅ CASE 1: Draft already has value → KEEP IT
// 			if (current_series && series.includes(current_series)) {
// 				return;
// 			}

// 			// ✅ CASE 2: Draft has value but not in list → ADD IT
// 			if (current_series && !series.includes(current_series)) {
// 				series.unshift(current_series);

// 				frm.fields_dict.naming_series.df.options = series.join("\n");
// 				frm.refresh_field("naming_series");
// 				return;
// 			}

// 			// ✅ CASE 3: New doc → set first series
// 			if (!current_series) {
// 				frm.set_value("naming_series", series[0]);
// 			}
// 		},
// 	});
// }

// console.log("🔥 Universal Naming Series JS Loaded");

// const DEFAULT_SERIES = {
// 	"Sales Invoice": "SINV-",
// 	"Purchase Order": "PO-",
// 	"Delivery Note": "DN-",
// 	"Purchase Invoice": "PINV-",
// 	"Sales Order": "SO-",
// 	"Stock Entry": "STE-",
// 	Quotation: "QUO-",
// 	"Payment Entry": "PE-",
// 	"Journal Entry": "JV-",
// 	"Credit Note": "CN-",
// };

// const DOCTYPES = [
// 	"Sales Invoice",
// 	"Purchase Order",
// 	"Delivery Note",
// 	"Purchase Invoice",
// 	"Sales Order",
// 	"Stock Entry",
// 	"Quotation",
// 	"Payment Entry",
// 	"Journal Entry",
// 	"Credit Note",
// ];

// DOCTYPES.forEach((dt) => {
// 	frappe.ui.form.on(dt, {
// 		onload: function (frm) {
// 			apply_series(frm);
// 		},

// 		refresh: function (frm) {
// 			apply_series(frm);
// 		},

// 		company: function (frm) {
// 			console.log(`${dt} Company Changed:`, frm.doc.company);

// 			if (frm.doc.docstatus === 0) {
// 				frm.set_value("naming_series", "");
// 				apply_series(frm);
// 			}
// 		},
// 	});
// });

// function apply_series(frm) {
// 	if (!frm.doc.company || !frm.fields_dict.naming_series) return;

// 	// ❌ Skip submitted
// 	if (frm.doc.docstatus === 1) return;

// 	frappe.call({
// 		method: "naming_series_app.utils.naming.get_series",
// 		args: {
// 			company: frm.doc.company,
// 			doctype: frm.doc.doctype,
// 		},
// 		callback: function (r) {
// 			let series = r.message || [];
// 			console.log(`${frm.doc.doctype} Fetched Series:`, series);

// 			// ✅ Fallback
// 			if (!series.length) {
// 				const default_series =
// 					DEFAULT_SERIES[frm.doc.doctype] ||
// 					frm.doc.doctype.substr(0, 4).toUpperCase() + "-";

// 				series = [default_series];
// 			}

// 			// ✅ Set dropdown options
// 			frm.fields_dict.naming_series.df.options = series.join("\n");
// 			frm.refresh_field("naming_series");

// 			let current_series = frm.doc.naming_series;

// 			// ✅ CASE 1: Draft already has value → KEEP IT
// 			if (current_series && series.includes(current_series)) {
// 				return;
// 			}

// 			// ✅ CASE 2: Draft has value but not in list → ADD IT
// 			if (current_series && !series.includes(current_series)) {
// 				series.unshift(current_series);

// 				frm.fields_dict.naming_series.df.options = series.join("\n");
// 				frm.refresh_field("naming_series");
// 				return;
// 			}

// 			// ✅ CASE 3: New doc → set first series
// 			if (!current_series) {
// 				frm.set_value("naming_series", series[0]);
// 			}
// 		},
// 	});
// }

console.log("🔥 Universal Naming Series JS Loaded");

const DEFAULT_SERIES = {
	"Sales Invoice": "SINV-",
	"Purchase Order": "PO-",
	"Delivery Note": "DN-",
	"Purchase Invoice": "PINV-",
	"Sales Order": "SO-",
	"Stock Entry": "STE-",
	Quotation: "QUO-",
	"Payment Entry": "PE-",
	"Journal Entry": "JV-",
	"Credit Note": "CN-",
};

const DOCTYPES = [
	"Sales Invoice",
	"Purchase Order",
	"Delivery Note",
	"Purchase Invoice",
	"Sales Order",
	"Stock Entry",
	"Quotation",
	"Payment Entry",
	"Journal Entry",
	"Credit Note",
];

DOCTYPES.forEach((dt) => {
	frappe.ui.form.on(dt, {
		onload: function (frm) {
			apply_series(frm);
		},

		refresh: function (frm) {
			apply_series(frm);
		},

		company: function (frm) {
			console.log(`${dt} Company Changed:`, frm.doc.company);

			if (frm.doc.docstatus === 0) {
				frm.set_value("naming_series", "");
				apply_series(frm);
			}
		},
	});
});

function apply_series(frm) {
	if (!frm.doc.company || !frm.fields_dict.naming_series) return;

	// ❌ Skip submitted
	if (frm.doc.docstatus === 1) return;

	frappe.call({
		method: "naming_series_app.utils.naming.get_series",
		args: {
			company: frm.doc.company,
			doctype: frm.doc.doctype,
		},
		callback: function (r) {
			let series = r.message || [];
			console.log(`${frm.doc.doctype} Fetched Series:`, series);

			// ✅ Fallback
			if (!series.length) {
				const default_series =
					DEFAULT_SERIES[frm.doc.doctype] ||
					frm.doc.doctype.substr(0, 4).toUpperCase() + "-";

				series = [default_series];
			}

			// ✅ Set dropdown options
			frm.fields_dict.naming_series.df.options = series.join("\n");
			frm.refresh_field("naming_series");

			let current_series = frm.doc.naming_series;
			let is_new_doc = frm.is_new();

			// ✅ NEW DOCUMENT → Always force company-mapped series, ignore Frappe's auto-filled default
			if (is_new_doc) {
				frm.set_value("naming_series", series[0]);
				return;
			}

			// ✅ CASE 1: Existing draft already has value → KEEP IT
			if (current_series && series.includes(current_series)) {
				return;
			}

			// ✅ CASE 2: Existing draft has value but not in list → ADD IT
			if (current_series && !series.includes(current_series)) {
				series.unshift(current_series);

				frm.fields_dict.naming_series.df.options = series.join("\n");
				frm.refresh_field("naming_series");
				return;
			}

			// ✅ CASE 3: Existing draft, no value yet → set first series
			if (!current_series) {
				frm.set_value("naming_series", series[0]);
			}
		},
	});
}
