"use client";

import { useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/questions";

export default function HomePage() {
  const [creatorName, setCreatorName] = useState("");
  const [answers, setAnswers] = useState<(number | null)[]>(Array(21).fill(null));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const answered = useMemo(() => answers.filter((a) => a !== null).length, [answers]);

  function choose(index: number, value: number) {
    setAnswers((old) => old.map((a, i) => i === index ? value : a));
  }

  async function createChallenge() {
    setError("");
    if (!creatorName.trim()) { setError("Add your name or nickname so they know whose challenge this is."); return; }
    if (answers.some((a) => a === null)) { setError("Answer all 21 questions before creating your link."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorName, answers })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setShareUrl(`${window.location.origin}/play/${data.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create your link.");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(shareUrl); }
    catch { setError("Copy was blocked by your browser. You can select and copy the link below."); }
  }

  if (shareUrl) return (
    <main className="shell">
      <section className="hero compact">
        <div className="eyebrow">YOUR CHALLENGE IS READY ✨</div>
        <div className="logo-mark">21<span>Q</span></div>
        <h1>Now let’s see<br /><em>how well they know you.</em></h1>
        <p className="subtext">Send this link to your person. They’ll answer all 21 questions and find out what they got right.</p>
      </section>
      <section className="panel share-panel">
        <div className="success-icon">✓</div>
        <h2>Share your challenge</h2>
        <div className="share-url">{shareUrl}</div>
        <button className="primary-button" onClick={copyLink}>Copy challenge link ↗</button>
        <p className="tiny-note">When they finish, they can create their own challenge and send a link back to you.</p>
        <a className="text-link" href="/">← Create another challenge</a>
      </section>
      <footer>Made for two curious hearts. 💜</footer>
    </main>
  );

  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow"><span className="spark">✦</span> A LITTLE GAME FOR TWO <span className="spark">✦</span></div>
        <div className="logo-mark">21<span>Q</span></div>
        <h1>How well do<br /><em>you know me?</em></h1>
        <p className="subtext">Twenty-one questions. A few surprises. And a chance to find out who’s been paying attention. 💜</p>
        <div className="hero-pills"><span>✦ Just the two of you</span><span>✦ Instant reveals</span><span>✦ No sign-up</span></div>
      </section>

      <section className="panel intro-panel">
        <div className="section-kicker">ROUND 01 / YOUR TURN</div>
        <h2>First, tell us about you.</h2>
        <p className="muted">Choose the answers that describe you best. We’ll turn them into a challenge you can share.</p>
        <label className="field-label" htmlFor="creatorName">Your name or nickname</label>
        <input id="creatorName" className="name-input" maxLength={40} placeholder="e.g. Alex, sunshine, troublemaker..." value={creatorName} onChange={(e) => setCreatorName(e.target.value)} />
        <div className="progress-row"><span>YOUR ANSWERS</span><strong>{answered} / 21</strong></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${answered / 21 * 100}%` }} /></div>
      </section>

      <section className="questions-list">
        {QUESTIONS.map((q, i) => (
          <article className="question-card" key={q.id}>
            <div className="question-meta"><span>QUESTION {String(q.id).padStart(2, "0")}</span><span>{q.category}</span></div>
            <h3>{q.text}</h3>
            <div className="options-grid">
              {q.options.map((option, j) => (
                <button type="button" key={option} className={`option ${answers[i] === j ? "selected" : ""}`} onClick={() => choose(i, j)}>
                  <span className="option-letter">{String.fromCharCode(65 + j)}</span><span>{option}</span>
                  {answers[i] === j && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="panel finish-panel">
        <div className="section-kicker">READY WHEN YOU ARE</div>
        <h2>Make it a challenge. 💌</h2>
        <p className="muted">Once all 21 are answered, create your personal link and send it to your person.</p>
        {error && <p className="error-message">{error}</p>}
        <button className="primary-button" disabled={busy || answered !== 21} onClick={createChallenge}>{busy ? "Creating your link..." : "Create my challenge →"}</button>
        <p className="tiny-note">Your answers stay hidden until each question is answered.</p>
      </section>
      <footer>21 Questions <span>•</span> A little curiosity goes a long way.</footer>
    </main>
  );
}
