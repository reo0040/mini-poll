"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./lib/supabaseBrowser";

type Choice = "support" | "neutral" | "oppose";

export default function HomePage() {
  const router = useRouter();
  const [choice, setChoice] = useState<Choice>("support");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const submitVote = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.from("votes").insert({ choice });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(`/result?choice=${choice}`);
  };

  return (
    <main className="mx-auto max-w-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold">ミニ投票</h1>
      <p>Q. 内閣支持をどう考えますか？</p>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "support"}
            onChange={() => setChoice("support")}
          />
          支持
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "neutral"}
            onChange={() => setChoice("neutral")}
          />
          どちらでもない
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "oppose"}
            onChange={() => setChoice("oppose")}
          />
          不支持
        </label>
      </div>

      <button
        onClick={submitVote}
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "送信中..." : "投票する"}
      </button>

      {error && <p className="text-red-600">エラー: {error}</p>}

      <p className="text-xs opacity-70">
        ※ログインなしのデモです。正確性は保証しません（生データは公開せず、集計のみ表示）
      </p>
    </main>
  );
}