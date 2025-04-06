"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { predefinedSubjects, type Subject } from "app/gwacalculator/subjects" 
import { Trash2, Search } from "lucide-react"

export function GWATable() {
  const [subjects, setSubjects] = useState([{ code: "", name: "", grade: "", units: "" }])
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null)
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveSearchIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (index: number, field: string, value: string) => {
    if (field === "grade" || field === "units") {
      // Only allow valid numeric input
      if (value === "" || (!isNaN(Number.parseFloat(value)) && Number.parseFloat(value) >= 0)) {
        const updatedSubjects = [...subjects]
        updatedSubjects[index][field] = value
        setSubjects(updatedSubjects)
      }
    } else {
      // For code or name fields
      const updatedSubjects = [...subjects]
      updatedSubjects[index][field] = value
      setSubjects(updatedSubjects)

      // Show search dropdown when typing in code field
      if (field === "code") {
        setActiveSearchIndex(index)
      }
    }
  }

  const handleSubjectSelection = (index: number, selectedSubject: Subject) => {
    const updatedSubjects = [...subjects]
    updatedSubjects[index].code = selectedSubject.code
    updatedSubjects[index].name = selectedSubject.name
    updatedSubjects[index].units = selectedSubject.units
    setSubjects(updatedSubjects)
    setActiveSearchIndex(null)
  }

  const addRow = () => {
    setSubjects([...subjects, { code: "", name: "", grade: "", units: "" }])
  }

  const deleteRow = (index: number) => {
    if (subjects.length > 1) {
      // Prevent deleting the last row
      const updatedSubjects = subjects.filter((_, i) => i !== index)
      setSubjects(updatedSubjects)
    }
  }

  const clearAllSubjects = () => {
    setSubjects([{ code: "", name: "", grade: "", units: "" }])
  }

  const computeGWA = () => {
    let totalWeightedGrades = 0
    let totalUnits = 0

    subjects.forEach(({ grade, units }) => {
      const numericGrade = Number.parseFloat(grade)
      const numericUnits = Number.parseFloat(units)

      if (!isNaN(numericGrade) && !isNaN(numericUnits)) {
        totalWeightedGrades += numericGrade * numericUnits
        totalUnits += numericUnits
      }
    })

    return totalUnits > 0 ? (totalWeightedGrades / totalUnits).toFixed(4) : "N/A"
  }

  const getFilteredSubjects = (searchTerm: string) => {
    if (!searchTerm) return []
    return predefinedSubjects.filter((subj) =>
      `${subj.code} ${subj.name}`.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value)
  }

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value)
  }

  const loadSubjectsForYearAndSemester = () => {
    // Filter subjects based on the year and semester
    if (!year || !semester) return

    // Example: Filter predefinedSubjects based on year and semester (this is just an example)
    const filteredSubjects = predefinedSubjects.filter((subj) => subj.year === year && subj.semester === semester)

    setSubjects(filteredSubjects.length ? filteredSubjects : [{ code: "", name: "", grade: "", units: "" }])
  }

    return (
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg">
            <div className="overflow-x-auto rounded-lg">
                <table className="overflow-x-auto min-h-[250px]">
                    <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-700">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-2">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-28">
                                Search
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-48">
                                Course Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-20 ">
                                Grade
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-2">
                                Units
                            </th>
                            <th className="px-2 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-200 w-0">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((row, index) => (
                            <tr key={index} className="border-b border-neutral-200 dark:border-neutral-700">
                                 <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-200">
                                    {index + 1}  {/* Display the subject number */}
                                </td>
                                <td className="px-4 py-3 relative">
                                    <input
                                        type="text"
                                        value={row.code}
                                        onChange={(e) => handleInputChange(index, 'code', e.target.value)}
                                        onFocus={() => setActiveSearchIndex(index)}
                                        className="rounded-md w-full bg-transparent border-b border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none px-1 py-1 text-neutral-800 dark:text-neutral-200"
                                        placeholder="Search"
                                    />
                                           {activeSearchIndex === index && row.code && (
                                            <div className="relative" ref={dropdownRef}>
                                            <ul className="absolute left-0 mt-1 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto w-[300px]">
                                                {getFilteredSubjects(row.code).map((subj, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() => handleSubjectSelection(index, subj)}
                                                    className="px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200"
                                                >
                                                    <div className="flex justify-between">
                                                    <span className="font-medium">{subj.code}</span>
                                                    <span className="text-neutral-500 dark:text-neutral-400">{subj.units} units</span>
                                                    </div>
                                                    <div className="text-sm text-neutral-600 dark:text-neutral-300 truncate">{subj.name}</div>
                                                </li>
                                                ))}
                                                {getFilteredSubjects(row.code).length === 0 && (
                                                <li className="px-4 py-2 text-neutral-500 dark:text-neutral-400">No courses found</li>
                                                )}
                                            </ul>
                                            </div>
                                        )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                        readOnly className="rounded-md w-full bg-transparent border-b border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none px-1 py-1 text-neutral-800 dark:text-neutral-200 cursor-not-allowed"
                                        placeholder="Course name"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.grade}
                                        onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                                        className="rounded-md w-full bg-transparent border-b border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none px-1 py-1 text-neutral-800 dark:text-neutral-200"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.units}
                                        onChange={(e) => handleInputChange(index, 'units', e.target.value)}
                                        readOnly className="rounded-md w-full bg-transparent border-b border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 outline-none px-1 py-1 text-neutral-800 dark:text-neutral-200 cursor-not-allowed"
                                        min="0"
                                        step="0.5"
                                        placeholder="0.0"
                                    />
                                </td>
                                <td className="px-2 py-3 text-center">
                                    <button
                                        onClick={() => deleteRow(index)}
                                        disabled={subjects.length <= 1}
                                        className={`p-1 rounded-full transition-colors ${
                                            subjects.length <= 1 
                                            ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed' 
                                            : 'text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        }`}
                                        title={subjects.length <= 1 ? "Cannot delete the only row" : "Delete row"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                    onClick={addRow}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                    </svg>
                    Add Course
                </button>

                <button
            onClick={clearAllSubjects}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>


                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">
            Academic Year
          </label>
          <input
            id="year"
            type="text"
            placeholder="e.g. 1"
            value={year}
            onChange={handleYearChange}
            className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1">
            Semester
          </label>
          <input
            id="semester"
            type="text"
            placeholder="e.g. 2"
            value={semester}
            onChange={handleSemesterChange}
            className="w-full px-4 py-2 bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            onClick={loadSubjectsForYearAndSemester}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            disabled={!year || !semester}
          >
            <Search size={16} />
            Load Subjects
          </button>
        </div>
      </div>

               <div className="w-full bg-neutral-50 dark:bg-neutral-700 px-6 py-3 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-600 ">
                <p className="text-neutral-900 dark:text-neutral-100 text-center">
                    Your GWA: <span className="font-bold text-xl ml-2">{computeGWA()}</span>
                </p>
               </div>
            </div>
        </div>
    )
}




   
