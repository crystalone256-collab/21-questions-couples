import { NextResponse } from "next/server";
import { QUESTIONS } from "@/lib/questions";
import { getAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const creatorName = typeof body.creatorName === "string" ? body.creatorName.trim().slice(0, 40) : "";
    const answers = body.answers;
    if (!creatorName) return NextResponse.json({ error: "Add your name or nickname first." }, { status: 400 });
    if (!Array.isArray(answers) || answers.length !== QUESTIONS.length ||
        answers.some((a: unknown, i: number) => !Number.isInteger(a) || (a as number) < 0 || (a as number) >= QUESTIONS[i].options.length)) {
      return NextResponse.json({ error: "Please choose an answer for all 21 questions." }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("challenges")
      .insert({ creator_name: creatorName, answers })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("Create challenge error:", error);
    return NextResponse.json({ error: "Could not create the challenge. Check your database setup and try again." }, { status: 500 });
  }
}
