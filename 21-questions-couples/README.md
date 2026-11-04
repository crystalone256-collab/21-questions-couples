# 21 Questions — Couples 💜

A casual, two-way couples quiz. One person answers 21 multiple-choice questions about themselves and shares a unique link. The recipient answers, sees whether each answer is correct, and immediately sees the creator's actual answer. At the end, the recipient can create their own challenge and send a link back.

## What's included

- No accounts, sign-in, leaderboard, or formal rooms.
- 21 multiple-choice questions.
- Instant answer reveal after each submitted question.
- Unique share links that work across devices.
- The answer key is kept on the server and is not returned when a challenge is first loaded.
- Mobile-friendly dark-purple/neon interface.
- Supabase database + Next.js API routes.

## 1. Create the database

1. Create a free project at [Supabase](https://supabase.com/).
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run `supabase/schema.sql`.
4. In **Project Settings → API**, copy the Project URL and `service_role` key.

The app uses the service-role key only in server-side API routes. Never put it in a `NEXT_PUBLIC_` variable or commit it to source control.

## 2. Run locally

Requires Node.js 18.17+.

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase values:

```env
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test sharing on two devices, deploy it first. A localhost link is only accessible from your own computer.

## 3. Deploy publicly with Vercel

1. Push this project to a private or public GitHub repository.
2. Import the repository at [Vercel](https://vercel.com/).
3. In Vercel → Project → **Settings → Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.
5. Open the deployed site, create a challenge, and share the generated URL.

You can also deploy to another host that supports Next.js server routes. The app must be hosted somewhere public for links to work across devices.

## How the game works

1. The creator enters a name/nickname and chooses one answer for each of the 21 questions.
2. The server stores the answer key and returns a unique challenge URL.
3. The recipient opens the URL and answers one question at a time.
4. After each answer, the server returns correctness and the creator's actual answer.
5. At the end, the recipient can create a new challenge and send their own link back.

## Notes and sensible limits

- This is designed for a private, friendly game, not sensitive information. Anyone with a challenge URL can play it.
- The database stores challenge names and answer keys. Delete old rows from the `challenges` table in Supabase if you want to remove old challenges.
- There is no login or ownership system by design. Anyone with a link can answer it.
- The score counts exact multiple-choice matches.
- The current question set is in `lib/questions.ts`; edit the wording/options there if you want to personalise the game.
- For production use with public traffic, consider adding rate limiting, CAPTCHA, challenge expiry, and automated cleanup of old records.
