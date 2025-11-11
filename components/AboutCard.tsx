import { AboutUs } from "@/data/about";

export default function AboutCard({ about }: { about: AboutUs }) {
  return (
    <div className="flex flex-col gap-3 bg-background border border-black/10 rounded-xl p-6">
      <div>
        <span className="material-symbols-outlined font-extrabold text-accent">
          {about.icon}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-2xl">{about.title}</h4>
        <p className="text-muted">{about.description}</p>
      </div>
    </div>
  );
}
