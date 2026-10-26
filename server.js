require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  MEILI_URL,
  MEILI_MASTER_KEY,
  WEBHOOK_SECRET,
  PORT = 3000,
} = process.env;

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

async function meili(path, options = {}) {
  const response = await fetch(`${MEILI_URL}${path}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${MEILI_MASTER_KEY}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Meilisearch ${response.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

function checkSecret(req, res, next) {
  const secret = req.headers["x-webhook-secret"];

  if (secret !== WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

// Health check
app.get("/health", async (req, res) => {
  try {
    const result = await meili("/health");
    res.json({
      ok: true,
      meilisearch: result,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

// Supabase webhook
app.post("/webhook/cars", checkSecret, async (req, res) => {
  try {
    const { type, record, old_record } = req.body;

    console.log(`Received ${type} event`);

    if (type === "INSERT" || type === "UPDATE") {
      await meili("/indexes/cars/documents", {
        method: "POST",
        body: JSON.stringify([record]),
      });

      console.log(`Indexed car ${record.id}`);
    }

    if (type === "DELETE") {
      await meili(
        `/indexes/cars/documents/${old_record.id}`,
        {
          method: "DELETE",
        }
      );

      console.log(`Deleted car ${old_record.id}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Initial import
app.post("/sync-all", checkSecret, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*");

    if (error) {
      throw error;
    }

    await meili("/indexes/cars/documents", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(`Indexed ${data.length} cars`);

    res.json({
      success: true,
      count: data.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Sync service running on http://localhost:${PORT}`);
});