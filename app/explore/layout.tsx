import Filters from "@/components/Filters";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto flex flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex w-full flex-col md:flex-row gap-8">
        <Filters />
        {children}
      </div>
    </main>
  );
}
