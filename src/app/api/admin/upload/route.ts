import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { MAX_IMAGE_BYTES, saveImage } from "@/lib/content/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "That image is larger than 8 MB. Please resize it first." },
        { status: 413 },
      );
    }

    const url = await saveImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The upload failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
