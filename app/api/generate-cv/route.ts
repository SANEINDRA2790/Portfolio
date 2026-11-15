import { NextRequest, NextResponse } from "next/server";
import { generateCvPdf, getCvFileName, CustomCvPayload } from "@/lib/cvPdfGenerator";
import { ProfessionalRole, CountryFormat, ROLES_CONFIG } from "@/data/rolesData";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CustomCvPayload;

    const role: ProfessionalRole = body.role && ROLES_CONFIG[body.role] ? body.role : "data-analyst";
    const country: CountryFormat =
      body.country && ["UK", "USA", "India"].includes(body.country) ? body.country : "UK";

    const pdfBuffer = generateCvPdf({
      ...body,
      role,
      country,
    });

    const filename = getCvFileName(role, country);

    // Return PDF buffer as downloadable response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error generating customized CV PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate customized CV document" },
      { status: 500 }
    );
  }
}
