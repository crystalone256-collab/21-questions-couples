
import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const participantName =
      typeof body.participantName === "string"
        ? body.participantName.trim()
        : "Anonymous";

    const score = body.score;
    const challengeId = context.params.id;

    if (
      !Number.isInteger(score) ||
      score < 0 ||
      score > 21 ||
      participantName.length < 1 ||
      participantName.length > 40
    ) {
      return NextResponse.json(
        { error: "Please check the name and score." },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { data, error } = await supabase
      .from("attempts")
      .insert({
        challenge_id: challengeId,
        participant_name: participantName,
        score
      })
      .select("id, participant_name, score, completed_at")
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, attempt: data });
  } catch (error) {
    console.error("Save attempt error:", error);

    return NextResponse.json(
      { error: "Could not save your result. Please try again." },
      { status: 500 }
    );
  }
}
