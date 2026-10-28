# LinkedIn Physical Design ODC lead capture

## Route
- Landing page: `/physical-design-odc/`
- API endpoint: `POST /api/linkedin-lead`
- The landing page includes hidden UTM fields and `li_fat_id`, and preserves query-string attribution on submit.

## HubSpot setup
1. Create a HubSpot Private App and grant CRM contacts read/write access (and contacts property read access). Store its token as the server-side environment variable `HUBSPOT_PRIVATE_APP_TOKEN` in the deployment host. Do not put it in `PUBLIC_*` variables or client-side code.
2. Deploy to the server runtime configured for this Astro site. The API route uses server-side `fetch` and will return a clear 503 until the token is configured.
3. Standard contact properties sent: first name, last name, email, company, job title and lifecycle stage (Lead).
4. Optional fields are sent only when those properties exist in HubSpot. The handler checks the contact property catalog before including them. To retain the detail, create these HubSpot contact properties using internal names that match:
   - `lead_source_detail` (single-line text)
   - `pd_workstream` (single-line text)
   - `pd_team_size` (single-line text)
   - `pd_start_timeline` (single-line text)
   - `message` (multi-line text, if not already present)
   - `linkedin_landing_page_url` (single-line text)
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `li_fat_id` (single-line text)
   - `hs_analytics_source` is a standard HubSpot field and may be read-only or system-managed. If not accepted by your portal, remove it from the configured field mapping; attribution is also retained in the optional UTM properties.
5. Add LinkedIn campaign tracking parameters to your destination URL, for example:
   `https://aionsi.com/physical-design-odc/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=physical_design_odc&utm_content=odc_team_ready`
6. Test by submitting a record with an internal email and verifying it appears in HubSpot. Confirm the optional properties exist before launching paid traffic.

## Security and behaviour
- Token stays server-side and is never rendered into HTML.
- Validates required values and consent, limits field lengths, uses a honeypot field, and does not accept design files.
- New leads are created; if HubSpot reports a duplicate, the handler searches by email and updates the existing contact with current submitted fields.
- The endpoint requires server-side Astro output. Static-only hosting would need a separate serverless function.
