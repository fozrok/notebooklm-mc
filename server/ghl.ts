/**
 * Send opt-in data to GoHighLevel (webhook or Contacts API).
 * Used by Express and by Vite dev middleware.
 */

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

export async function submitOptIn(firstName: string, email: string): Promise<void> {
  const payload = {
    firstName: firstName.trim(),
    email: email.trim(),
    source: "NotebookLM-masterclass",
  };

  if (GHL_WEBHOOK_URL) {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GHL webhook ${res.status}: ${text}`);
    }
    return;
  }

  if (GHL_API_KEY && GHL_LOCATION_ID) {
    const res = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName: payload.firstName,
        email: payload.email,
        source: payload.source,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GHL API ${res.status}: ${text}`);
    }
    return;
  }

  throw new Error(
    "GHL not configured. Set GHL_WEBHOOK_URL or GHL_API_KEY and GHL_LOCATION_ID."
  );
}
