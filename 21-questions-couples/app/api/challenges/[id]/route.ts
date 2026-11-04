import { NextResponse } from "next/server";
import { QUESTIONS } from "@/lib/questions";
import { getAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: { id: string } }) {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("challenges")
      .select("id, creator_name")
      .eq("id", context.params.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "This challenge link could not be found. Ask the person who sent it to make a new one." }, { status: 404 });
    // The answer key is deliberately not returned by this endpoint.
    return NextResponse.json({ id: data.id, creatorName: data.creator_name, questions: QUESTIONS });
  } catch (error) {
    console.error("Load challenge error:", error);
    return NextResponse.json({ error: "Could not load this challenge right now." }, { status: 500 });
  }
}
