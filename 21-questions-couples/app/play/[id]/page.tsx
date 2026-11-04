"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Question } from "@/lib/questions";

type Challenge = { id: string; creatorName: string; questions: Question[] };
type Reveal = { correct: boolean; correctIndex: number; correctAnswer: string };

export default function PlayPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [score, setScore] = useState(0);
  const [participantName, setParticipantName] = useState("");
const [started, setStarted] = useState(false);
const [attemptSaved, setAttemptSaved] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [savingAttempt, setSavingAttempt] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/challenges/${id}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Could not load this challenge.");
        return d as Challenge;
      })
      .then((d) => { if (active) setChallenge(d); })
      .catch((e) => { if (active) setLoadError(e instanceof Error ? e.message : "Could not load this challenge."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function submitAnswer() {
    if (selected === null || checking) return;
    setChecking(true);
    setError("");
    try {
      const response = await fetch(`/api/challenges/${id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionIndex: index, selectedIndex: selected })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not check your answer.");
      setReveal(data);
      if (data.correct) setScore((s) => s + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not check your answer.");
    } finally {
      setChecking(false);
    }
  }

  async function nextQuestion() {
  if (index === 20) {
    setSavingAttempt(true);
    setError("");

    try {
      const response = await fetch(`/api/challenges/${id}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: participantName.trim() || "Anonymous",
          score
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not save your result.");
      }

      setAttemptSaved(true);
      setIndex(21);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your result.");
    } finally {
      setSavingAttempt(false);
    }

    return;
  }

  setIndex((i) => i + 1);
  setSelected(null);
  setReveal(null);
  setError("");
}

  if (loading) return <main className="shell centered"><div className="loader-orb">21Q</div><p className="muted">Getting your questions ready...</p></main>;
  if (loadError || !challenge) return <main className="shell centered"><div className="logo-mark">21<span>Q</span></div><h1>Oops, this link<br /><em>isn't working.</em></h1><p className="error-message">{loadError || "Challenge not found."}</p><a className="primary-button link-button" href="/">Make a new challenge</a></main>;

  if (index >= 21) return (
    if (!started) return (
  <main className="shell centered">
    <div className="eyebrow">BEFORE WE BEGIN ✨</div>
    <div className="logo-mark">21<span>Q</span></div>
    <h1>Who's taking<br /><em>the challenge?</em></h1>
    <section className="panel">
      <p className="muted">Enter your name or nickname. You can also play anonymously.</p>
      <input
        className="name-input"
        type="text"
        maxLength={40}
        placeholder="Your name (optional)"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
      />
      <button
        className="primary-button"
        onClick={() => setStarted(true)}
      >
        Let's play 💜
      </button>
    </section>
  </main>
);
    <main className="shell centered">
      <div className="eyebrow">THAT’S A WRAP ✨</div>
      <div className="result-score">{score}<span>/21</span></div>
      <h1>You got to know<br /><em>{challenge.creatorName} a little better.</em></h1>
      <p className="subtext">You got {score} out of 21 right. The best part? You can now turn the tables.</p>
      <section className="panel share-panel">
        <div className="success-icon">↻</div>
        <h2>Your turn to be the mystery.</h2>
        <p className="muted">Create your own 21 answers and send {challenge.creatorName} a link to see how well they know you.</p>
        <a className="primary-button link-button" href="/">Create my challenge →</a>
      </section>
      <footer>Made for two curious hearts. 💜</footer>
    </main>
  );

  const question = challenge.questions[index];
  return (
    <main className="shell play-shell">
      <section className="hero compact play-hero">
        <div className="eyebrow">A CHALLENGE FROM {challenge.creatorName.toUpperCase()}</div>
        <div className="logo-mark">21<span>Q</span></div>
        <h1>How well do<br /><em>you know {challenge.creatorName}?</em></h1>
      </section>
      <section key={index} className="panel play-panel question-transition">
        <div className="progress-row"><span>YOUR TURN</span><strong>{index + 1} / 21</strong></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${(index + (reveal ? 1 : 0)) / 21 * 100}%` }} /></div>
        <div className="question-meta"><span>QUESTION {String(index + 1).padStart(2, "0")}</span><span>{question.category}</span></div>
        <h2>{question.text}</h2>
        {!reveal ? (
          <>
            <div className="options-grid play-options">
              {question.options.map((option, j) => (
                <button type="button" key={option} className={`option ${selected === j ? "selected" : ""}`} onClick={() => setSelected(j)}>
                  <span className="option-letter">{String.fromCharCode(65 + j)}</span><span>{option}</span>
                  {selected === j && <span className="check">✓</span>}
                </button>
              ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className="primary-button" disabled={selected === null || checking} onClick={submitAnswer}>{checking ? "Checking..." : "Lock in my answer →"}</button>
          </>
        ) : (
          <div className="reveal-box">
            <div className={`reveal-status ${reveal.correct ? "correct" : "incorrect"}`}>{reveal.correct ? "✓ You got it!" : "Not quite — keep going!"}</div>
            <p className="your-answer"><span>Your answer</span><strong>{question.options[selected!]}</strong></p>
            <p className="actual-answer"><span>{challenge.creatorName}’s actual answer</span><strong>{reveal.correctAnswer}</strong></p>
          <button
  className="primary-button"
  onClick={nextQuestion}
  disabled={savingAttempt || attemptSaved}
>
  {savingAttempt
    ? "Saving your result..."
    : index === 20
      ? "See my result →"
      : "Next question →"}
</button>
          </div>
        )}
      </section>
      <div className="score-hint">A little attention goes a long way. 💜</div>
    </main>
  );
}
