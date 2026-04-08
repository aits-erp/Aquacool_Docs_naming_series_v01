console.log("🔥 Naming Series JS Loaded");

frappe.ui.form.on('Sales Invoice', {
    refresh: function(frm) {
        apply_series_with_delay(frm);
    },
    company: function(frm) {
        console.log("Company Changed:", frm.doc.company);

        // Clear old value immediately
        frm.set_value('naming_series', '');

        apply_series_with_delay(frm);
    }
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
            doctype: frm.doc.doctype
        },
        callback: function(r) {
            let series = r.message || [];
            console.log("Fetched Series:", series);

            if (series.length > 0) {
                // Set the options in dropdown
                frm.fields_dict.naming_series.df.options = series.join('\n');
                frm.refresh_field('naming_series');

                // Always set a valid value
                if (!series.includes(frm.doc.naming_series)) {
                    frm.set_value('naming_series', series[0]);
                }
            } else {
                // Fallback if nothing returned
                frm.fields_dict.naming_series.df.options = '';
                frm.refresh_field('naming_series');
                frm.set_value('naming_series', DEFAULT_SERIES[frm.doc.doctype] || '');
            }
        }
    });
}