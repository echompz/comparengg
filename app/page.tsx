export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        ComParEngg FEU Tech Starter Pack
      </h1>

      <p className="mb-4">
        {`Hi, ComParEngg! Welcome to the FEU Tech Starter Pack for Computer Engineering Students.`}
      </p>

      <p className="mb-4">
        {`This site contains some tools to make your life easier.`}
      </p>
      
      <div className="my-8 flex justify-center gap-4">
      <a href="/gwacalculator" className="w-64 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center text-sm border border-neutral-300 dark:border-neutral-600">
        gwa calculator
      </a>
      <a href="/prereq" className="w-64 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center text-sm border border-neutral-300 dark:border-neutral-600">
        prerequisite searcher
      </a>
      <a href="/curriculum" className="w-64 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center text-sm border border-neutral-300 dark:border-neutral-600">
        curriculum
      </a>
    </div>

    <p className="mb-4">
        <i>{`Note: this site is NOT official or affiliated with FEU Tech or the FEU Tech CpE Department.`}</i>
      </p>

    </section>

  )
}
