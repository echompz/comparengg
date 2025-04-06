import { GWATable } from 'app/components/calculator'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        CpE GWA Calculator
      </h1>
      <p className="mb-4">
        {`For Computer Engineering Students in FEU Tech`}
      </p>
      <p className="mb-4">
        {`• Search by Course Code or Course Name`}
      </p>
      <p className="mb-4">
        <i>{'• Course Data Updated as of April 2025'}</i>
      </p>

      <div className="my-8">
        <GWATable />
      </div>

      <p className="mb-4">
        <i>Disclaimer: This calculator does</i> not <i>store any user data.</i>
      </p>

      <p className="mb-4">
        {"GWA stands for General Weighted Average. It is a way to calculate a student's overall academic performance by considering both the grades received and the number of units for each course."}
      </p>

      <p className="mb-4">
        {"• Weighted Grade = Grade x Units"}
      </p>

      <p className="mb-4">
        {"• Total Weighted Grade = Sum of all Weighted Grades"}
      </p>

      <p className="mb-4">
        {"• Total Units = Sum of all Units"}
      </p>

      <p className="mb-4">
        {"• GWA = Total Weighted Grade / Total Units"}
      </p>

    </section>
  )
}
