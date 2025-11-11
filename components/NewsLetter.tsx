export function NewsLetterForm() {
  return (
    <div className="col-span-2 md:col-span-4 lg:col-span-1">
      <h3 className="font-bold text-foreground mb-4">Join Our NewsLetter</h3>
      <p className="text-sm text-secondary mb-4">
        Get 10% off your first order and stay up to date on new arrivals
      </p>
      <form action="mailto:jivankadel256@gmail.com" className="flex">
        <input
          type="email"
          placeholder="Enter your Email"
          className="flex w-full min-w-0 px-2 flex-1 resize-none overflow-hidden rounded-r-none rounded-lg text-foreground bg-white/60 dark:bg-black/60 focus:outline-0 focus:ring-0 border border-black/20 dark:border-white/20 focus:border-accent h-10 placeholder:text-secondary text-sm font-normal leading-normal"
        />
        <button className="flex items-center justify-center rounded-l-none rounded-lg h-10 px-2 bg-accent text-white text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined ">arrow_right_alt</span>
        </button>
      </form>
    </div>
  );
}
