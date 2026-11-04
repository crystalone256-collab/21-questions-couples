import { NextResponse } from "next/server";
import { QUESTIONS } from "@/lib/questions";
import { getAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request, context: { params: { id: string } }) {
  try {
    const body = await request.json();
    const questionIndex = body.questionIndex;
    const selectedIndex = body.selectedIndex;

    if (!Number.isInteger(questionIndex) || questionIndex < 0 || questionIndex >= QUESTIONS.length ||
        !Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= 4) {
      return NextResponse.json({ error: "That answer doesn't look valid. Please try again." }, { status: 400 });
    }

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("challenges")
      .select("answers")
      .eq("id", context.params.id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "This challenge link could not be found." }, { status: 404 });

    const correctIndex = data.answers[questionIndex];
    return NextResponse.json({
      correct: selectedIndex === correctIndex,
      correctIndex,
      correctAnswer: QUESTIONS[questionIndex].options[correctIndex]
    });
  } catch (error) {
    console.error("Check answer error:", error);
    return NextResponse.json({ error: "Could not check that answer. Please try again." }, { status: 500 });
  }
}
