"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseBrowser";

type SummaryRow = { choice: string; cnt: number };

function labelOf(choice: string) {
  if (choice === "support") return "支持";
  if (choice === "neutral") return "どちらでもない";
  if (choice === "oppose") return "不支持";
  return choice;
}

export default function ResultPage() {
  const params = useSearchParams();
  const myChoice = params.get("choice") ?? "";
  const [rows, setRows] = useState<SummaryRow[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSummary = async () => {
      setError("");
      const { data, error } = await supabase.rpc("get_vote_summary");
      if (error) {
        setError(error.message);
        return;
      }
      setRows((data ?? []).map((r: any) => ({ choice: r.choice, cnt: Number(r.cnt) })));
    };
    fetchSummary();
  }, []);

  const total = useMemo(() => rows.reduce((a, r) => a + r.cnt, 0), [rows]);

  return (
    <main className="mx-auto max-w-lg p-6 space-y-4">
      <h1 className="text-2xl font-bold">結果</h1>

      {myChoice && (
        <p>
          あなたの投票：<b>{labelOf(myChoice)}</b>
        </p>
      )}

      {error && <p className="text-red-600">エラー: {error}</p>}

      <div className="space-y-3">
        {rows.map((r) => {
          const pct = total === 0 ? 0 : Math.round((r.cnt / total) * 100);
          return (
            <div key={r.choice} className="space-y-1">
              <div className="flex justify-between">
                <span>{labelOf(r.choice)}</span>
                <span>
                  {pct}%（{r.cnt}票）
                </span>
              </div>
              <div className="h-2 rounded bg-gray-200 overflow-hidden">
                <div className="h-full bg-gray-800" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <a className="underline text-sm" href="/">
        ← もう一度投票する
      </a>
    </main>
  );
}