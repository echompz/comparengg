"use client"

import { predefinedSubjects } from "app/gwacalculator/subjects"

export default function Page() {
  // Group subjects by year and semester
  const groupedSubjects = predefinedSubjects.reduce(
    (acc, subject) => {
      const key = `${subject.year}-${subject.semester}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(subject)
      return acc
    },
    {} as { [key: string]: typeof predefinedSubjects },
  )

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">CpE Curriculum</h1>
      <p className="mb-4">{`For Computer Engineering Students in FEU Tech`}</p>
      <p className="mb-4">{`• View subjects organized by year and semester`}</p>
      <p className="mb-4">
        <i>{`• Curriculum Data Updated as of April 2025`}</i>
      </p>

      <p className="text-neutral-900 dark:text-neutral-100">
            Total Courses: <span className="font-bold text-xl ml-2">{predefinedSubjects.length}</span>
        </p>

      {/* Render Subjects Grouped by Year and Semester */}
      {Object.keys(groupedSubjects).map((key) => {
        const [year, semester] = key.split("-")
        const subjects = groupedSubjects[key]

        return (
          <div key={key} className="my-8">
            <h2 className="text-xl font-semibold tracking-tighter mb-4">
              Year {year} - Semester {semester}
            </h2>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg">
              <div className="overflow-x-auto flex justify-center">
                <table className="rounded-md" style={{ tableLayout: "fixed" }}>
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-700">
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200">Course Code</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200" style={{ width: "250px", wordWrap: "break-word", whiteSpace: "normal" }}>
                        Course Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200">Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.code} className="border-b border-neutral-200 dark:border-neutral-700">
                        <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-200">{subject.code}</td>
                        <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-200" style={{ wordWrap: "break-word", whiteSpace: "normal" }}>{subject.name}</td>
                        <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-200">{subject.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      })}

    </section>
  )
}
