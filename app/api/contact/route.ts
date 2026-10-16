import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the order / inquiry on server console
    console.log("=== NOUVELLE DEMANDE / COMMANDE ===");
    console.log("Destination:", "1Gb.resaux@gmail.com");
    console.log("Détails:", JSON.stringify(data, null, 2));

    // Return success response to the client
    return NextResponse.json({
      success: true,
      message: "Demande reçue avec succès",
    });
  } catch (error) {
    console.error("Erreur API Contact:", error);
    return NextResponse.json(
      { success: false, message: "Erreur de traitement" },
      { status: 500 }
    );
  }
}
