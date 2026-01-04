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
      <h1 className="text-2xl font-bold">繝溘ル謚慕･ｨ</h1>
      <p>Q. 蜀・魅謾ｯ謖√ｒ縺ｩ縺・・∴縺ｾ縺吶°・・/p>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "support"}
            onChange={() => setChoice("support")}
          />
          謾ｯ謖・        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "neutral"}
            onChange={() => setChoice("neutral")}
          />
          縺ｩ縺｡繧峨〒繧ゅ↑縺・        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="choice"
            checked={choice === "oppose"}
            onChange={() => setChoice("oppose")}
          />
          荳肴髪謖・        </label>
      </div>

      <button
        onClick={submitVote}
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "騾∽ｿ｡荳ｭ..." : "謚慕･ｨ縺吶ｋ"}
      </button>

      {error && <p className="text-red-600">繧ｨ繝ｩ繝ｼ: {error}</p>}

      <p className="text-xs opacity-70">
        窶ｻ繝ｭ繧ｰ繧､繝ｳ縺ｪ縺励ら函繝・・繧ｿ縺ｯ蜈ｬ髢九○縺壹・寔險医・縺ｿ陦ｨ遉ｺ
      </p>
    </main>
  );
}
