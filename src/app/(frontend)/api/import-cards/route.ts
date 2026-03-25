import { getPayload } from "payload";
import config from "@payload-config";

function parseCSV(raw: string) {
  const lines = raw.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const record: Record<string, string> = {};
    headers.forEach((header, i) => {
      record[header.trim()] = values[i] ?? "";
    });
    return record;
  });
}

export async function POST(request: Request) {
  const payload = await getPayload({ config });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return Response.json(
      { error: "A CSV file is required in the 'file' field" },
      { status: 400 },
    );
  }

  const csv = await file.text();
  const rows = parseCSV(csv);
  const results = { created: 0, errors: [] as string[] };

  for (const row of rows) {
    try {
      await payload.create({
        collection: "cards",
        data: {
          person: row.person ?? "",
          world: row.world ?? "",
          object: row.object ?? "",
          action: row.action ?? "",
          nature: row.nature ?? "",
          random: row.random ?? "",
          allplay: row.allplay ?? "",
        },
      });
      results.created++;
    } catch (err) {
      results.errors.push(
        `Row "${row.action}": ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return Response.json({
    message: `Imported ${results.created} of ${rows.length} cards`,
    ...results,
  });
}
