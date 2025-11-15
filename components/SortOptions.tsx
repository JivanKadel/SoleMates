"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function SortOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    // If user selects the empty option, remove sort
    if (!selected) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("sort");
      params.delete("asc");
      router.push(`/explore?${params.toString()}`);
      return;
    }

    const [tag, ascStr] = selected.split(":");
    const asc = ascStr === "true" ? "true" : "false";

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", tag);
    params.set("asc", asc);

    router.push(`/explore?${params.toString()}`);
  };

  const currentTag = searchParams.get("sort") ?? "";
  const currentAsc = searchParams.get("asc") ?? "";

  const currentValue =
    currentTag && currentAsc ? `${currentTag}:${currentAsc}` : "";

  return (
    <select
      className="border px-3 py-2 rounded"
      value={currentValue}
      onChange={onChange}
    >
      <option value="">Sort (All)</option>
      <option value="price:true">Price (Low → High)</option>
      <option value="price:false">Price (High → Low)</option>
      <option value="newest:true">Newest First</option>
      <option value="popularity:true">Top Rated (Sales + Rating)</option>
    </select>
  );
}
