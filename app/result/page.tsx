import ResultClient from "./ResultClient";

export default function ResultPage({
  searchParams,
}: {
  searchParams: { choice?: string };
}) {
  const choice = typeof searchParams?.choice === "string" ? searchParams.choice : "";
  return <ResultClient myChoice={choice} />;
}