import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest, NextResponse } from "next/server";

const CARD_FIELDS = ["person", "world", "object", "action", "nature", "random"] as const;
type CardField = (typeof CARD_FIELDS)[number];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const person = searchParams.get("person");
  const world = searchParams.get("world");
  const object = searchParams.get("object");
  const action = searchParams.get("action");
  const nature = searchParams.get("nature");
  const random = searchParams.get("random");
  const allplay = searchParams.get("allplay");

  if (!person || !world || !object || !action || !nature || !random || !allplay) {
    return NextResponse.json({ message: "Missing params" }, { status: 400 });
  }

  const card = { person, world, object, action, nature, random, allplay };

  try {
    const payload = await getPayload({ config });

    const duplicateChecks = await payload.find({
      collection: "cards",
      where: {
        or: CARD_FIELDS.map((field) => ({
          [field]: { like: card[field] },
        })),
      },
      limit: 0,
      pagination: false,
    });

    console.log(duplicateChecks);

    if (duplicateChecks.docs.length > 0) {
      const matchingKeys = new Set<CardField>();

      for (const existing of duplicateChecks.docs) {
        for (const field of CARD_FIELDS) {
          if (card[field].toLowerCase() === existing[field].toLowerCase()) {
            matchingKeys.add(field);
          }
        }
      }

      if (matchingKeys.size > 0) {
        return NextResponse.json({
          message: "Duplicate answers",
          duplicates: [...matchingKeys],
        });
      }
    }

    const created = await payload.create({
      collection: "cards",
      data: card,
    });

    if (!created) {
      return NextResponse.json({ message: "Did not create card" }, { status: 400 });
    }

    return NextResponse.json({ message: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Did not create card" }, { status: 400 });
  }
}
