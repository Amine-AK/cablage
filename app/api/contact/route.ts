import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/whatsapp";

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Requête invalide" }, { status: 400 });
  }

  const body = data as Record<string, unknown> | null;
  if (
    !body ||
    typeof body !== "object" ||
    typeof body.clientName !== "string" ||
    typeof body.phone !== "string" ||
    !body.clientName.trim() ||
    !body.phone.trim()
  ) {
    return NextResponse.json({ success: false, message: "Nom et téléphone requis" }, { status: 400 });
  }

  // Log the order / inquiry on the server console. The customer confirms it
  // by sending the pre-filled WhatsApp message.
  console.log("=== NOUVELLE DEMANDE / COMMANDE ===");
  console.log("Destination:", CONTACT_EMAIL);
  console.log("Détails:", JSON.stringify(body, null, 2));

  return NextResponse.json({ success: true, message: "Demande reçue" });
}
