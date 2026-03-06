import type { Handler } from "@netlify/functions";

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let firstName = "";
  let email = "";

  try {
    const body = JSON.parse(event.body || "{}");
    firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!firstName || !email) {
    return { statusCode: 400, body: JSON.stringify({ error: "First name and email are required" }) };
  }

  const payload = {
    firstName,
    email,
    source: "Hypno Masterclass Registration",
  };

  try {
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
      return { statusCode: 201, body: JSON.stringify({ ok: true }) };
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
      return { statusCode: 201, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 503, body: JSON.stringify({ error: "Registration not configured." }) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("not configured")) {
      return { statusCode: 503, body: JSON.stringify({ error: "Registration not configured." }) };
    }
    console.error("Register error:", err);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Registration service temporarily unavailable. Please try again." }),
    };
  }
};

export { handler };
