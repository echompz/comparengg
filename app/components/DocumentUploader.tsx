"use client"

import type React from "react"
import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { type Subject, predefinedSubjects } from "app/gwacalculator/subjects"
import Image from "next/image"

// Define a type for the display style options
type DisplayStyle = "stacked" | "inline"

const DocumentUploader = () => {
  const [signature, setSignature] = useState<File | null>(null)
  const [idPhoto, setIdPhoto] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [studentNumber, setStudentNumber] = useState("")
  const [studentYear, setStudentYear] = useState("")
  const [semester, setSemester] = useState("")
  const [academicYear, setAcademicYear] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>(predefinedSubjects)
  // Add new state for display style
  const [displayStyle, setDisplayStyle] = useState<DisplayStyle>("stacked")

  const clearAllFields = () => {
    setSignature(null)
    setIdPhoto(null)
    setName("")
    setStudentNumber("")
    setStudentYear("")
    setSemester("")
    setAcademicYear("")
    setSelectedSubjects([])
    setSearchQuery("")
    setFilteredSubjects(predefinedSubjects)
    // Reset display style to default
    setDisplayStyle("stacked")
  }

  // Add a new function to clear only the subjects
  const clearSubjects = () => {
    setSelectedSubjects([])
    setSearchQuery("")
    setFilteredSubjects(predefinedSubjects)
  }

  // Filter subjects based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSubjects(predefinedSubjects)
    } else {
      const filtered = predefinedSubjects.filter(
        (subject) =>
          subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subject.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredSubjects(filtered)
    }
  }, [searchQuery])

  const onSignatureDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSignature(acceptedFiles[0])
    }
  }, [])

  const onIdPhotoDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIdPhoto(acceptedFiles[0])
    }
  }, [])

  const { getRootProps: getSignatureRootProps, getInputProps: getSignatureInputProps } = useDropzone({
    onDrop: onSignatureDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  })

  const { getRootProps: getIdPhotoRootProps, getInputProps: getIdPhotoInputProps } = useDropzone({
    onDrop: onIdPhotoDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  })

  const handleSubjectToggle = (subject: Subject) => {
    setSelectedSubjects((prev) => {
      const isSelected = prev.some((s) => s.code === subject.code)
      if (isSelected) {
        return prev.filter((s) => s.code !== subject.code)
      } else {
        return [...prev, subject]
      }
    })
  }

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === filteredSubjects.length) {
      // If all filtered subjects are selected, deselect all
      setSelectedSubjects([])
    } else {
      // Select all currently filtered subjects
      const newSelection = [...selectedSubjects]

      filteredSubjects.forEach((subject) => {
        if (!newSelection.some((s) => s.code === subject.code)) {
          newSelection.push(subject)
        }
      })

      setSelectedSubjects(newSelection)
    }
  }

  // Auto-select subjects based on semester and academic year
  const handleSemesterYearSelection = () => {
    if (semester && academicYear) {
      const matchingSubjects = predefinedSubjects.filter(
        (subject) => subject.semester === semester && subject.year === academicYear,
      )
      setSelectedSubjects(matchingSubjects)

      // Also update the search to show only these subjects
      setSearchQuery("")
      setFilteredSubjects(predefinedSubjects)
    }
  }

  // Handler for display style change
  const handleDisplayStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayStyle(e.target.value as DisplayStyle)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signature || !idPhoto || !name || !studentNumber || !studentYear || selectedSubjects.length === 0) {
      alert("Please fill in all required fields and select at least one subject")
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("signature", signature)
    formData.append("idPhoto", idPhoto)
    formData.append("name", name)
    formData.append("studentNumber", studentNumber)
    formData.append("studentYear", studentYear)
    formData.append("semester", semester)
    formData.append("academicYear", academicYear)
    formData.append("subjects", JSON.stringify(selectedSubjects))
    // Add display style to form data
    formData.append("displayStyle", displayStyle)

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        // Create a link and trigger download
        const a = document.createElement("a")
        a.href = url

        // Set filename based on content type (PDF or ZIP)
        const contentType = response.headers.get("Content-Type")
        if (contentType === "application/pdf") {
          // If only one subject was selected, it returns a PDF
          const subject = selectedSubjects[0]
          a.download = `${subject.code}_form.pdf`
        } else {
          // Multiple subjects return a ZIP
          a.download = "completed-forms.zip"
        }

        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      } else {
        const errorData = await response.json()
        alert(`Failed to generate PDFs: ${errorData.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred while generating the PDFs")
    } finally {
      setLoading(false)
    }
  }

  // Group subjects by year and semester
  const groupedSubjects: Record<string, Subject[]> = {}
  filteredSubjects.forEach((subject) => {
    const key = `Year ${subject.year} - Semester ${subject.semester}`
    if (!groupedSubjects[key]) {
      groupedSubjects[key] = []
    }
    groupedSubjects[key].push(subject)
  })

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-neutral-950 dark:text-neutral-200 border-b pb-2 border-gray-200">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Fullname (e.g. Juan Dela Cruz)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="studentNumber" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
                  Student Number *
                </label>
                <input
                  type="text"
                  id="studentNumber"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  placeholder="Enter Student Number (e.g. 202512345)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="studentYear" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
                  Student Year *
                </label>
                <input
                  type="text"
                  id="studentYear"
                  value={studentYear}
                  onChange={(e) => setStudentYear(e.target.value)}
                  placeholder="Enter Student Year (e.g. 1, 2, 3, 4)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Display Style Selection */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-neutral-950 dark:text-neutral-200 border-b pb-2 border-gray-200">
              Subject Display Style
            </h2>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stacked"
                  name="displayStyle"
                  value="stacked"
                  checked={displayStyle === "stacked"}
                  onChange={handleDisplayStyleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="stacked" className="ml-2 block text-sm text-neutral-600 dark:text-neutral-200">
                  <span className="font-medium ">Option 1: Stacked Format</span>
                  <div className="mt-1 pl-2 text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-gray-300">
                    <div>COE0001</div>
                    <div>ENGINEERING MATHEMATICS 1</div>
                    <div>FEU Tech</div>
                  </div>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inline"
                  name="displayStyle"
                  value="inline"
                  checked={displayStyle === "inline"}
                  onChange={handleDisplayStyleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="inline" className="ml-2 block text-sm text-neutral-600 dark:text-neutral-200">
                  <span className="font-medium">Option 2: Inline Format</span>
                  <div className="mt-1 pl-2 text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-gray-300">
                    COE0001 / FEU Tech
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Signature Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-950 dark:text-neutral-200">Signature Upload *</h2>
            <div
              {...getSignatureRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <input {...getSignatureInputProps()} />
              {signature ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600">✓ Signature uploaded</p>
                  <p className="text-xs text-gray-500 mt-1">{signature.name}</p>
                  {signature && (
                    <div className="mt-2">
                      <Image
                        src={URL.createObjectURL(signature) || "/placeholder.svg"}
                        alt="Signature preview"
                        width={200} 
                        height={200} 
                        className="max-h-20 max-w-full mx-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Drag & drop your signature here</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1">or click to select file</p>
                </div>
              )}
            </div>
          </div>

          {/* ID Photo Upload */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-neutral-950 dark:text-neutral-200">ID Photo Upload *</h2>
            <div
              {...getIdPhotoRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-4 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <input {...getIdPhotoInputProps()} />
              {idPhoto ? (
                <div className="text-center">
                  <p className="text-sm font-medium text-green-600">✓ ID Photo uploaded</p>
                  <p className="text-xs text-gray-500 mt-1">{idPhoto.name}</p>
                  {idPhoto && (
                    <div className="mt-2">
                      <Image
                        src={URL.createObjectURL(idPhoto) || "/placeholder.svg"}
                        alt="ID Photo preview"
                        width={200} 
                        height={200} 
                        className="max-h-20 max-w-full mx-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Drag & drop your ID photo here</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1">or click to select file</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subject Search */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <label htmlFor="searchSubjects" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
              Search Subjects
            </label>
            <input
              type="text"
              id="searchSubjects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code or name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Subject Selection */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-200">Select Subjects *</h2>
            <div className="flex space-x-4">
              <button type="button" onClick={clearSubjects} className="text-sm text-red-600 hover:text-red-800">
                Clear Subjects
              </button>
              <button
                type="button"
                onClick={handleSelectAllSubjects}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {selectedSubjects.length === filteredSubjects.length ? "Deselect All" : "Select All"}
              </button>
            </div>
          </div>

          <div className="border border-gray-300 dark:border-gray-950 rounded-md p-4 max-h-96 overflow-y-auto bg-neutral-50 dark:bg-neutral-800 shadow-inner">
            {Object.keys(groupedSubjects).length > 0 ? (
              Object.entries(groupedSubjects).map(([groupName, subjects]) => (
                <div key={groupName} className="mb-4">
                  <h3 className="font-medium text-neutral-600 dark:text-neutral-200 mb-2">{groupName}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {subjects.map((subject) => (
                      <div key={subject.code} className="flex items-center">
                        <input
                          type="checkbox"
                          id={subject.code}
                          checked={selectedSubjects.some((s) => s.code === subject.code)}
                          onChange={() => handleSubjectToggle(subject)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={subject.code} className="ml-2 block text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">{subject.code}</span> - {subject.name} ({subject.units} units)
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">No subjects match your search criteria.</p>
            )}
          </div>
          <div className="text-sm text-gray-600 mt-1">Selected subjects: {selectedSubjects.length}</div>
        </div>

        <p className="text-xl font-semibold text-neutral-950 dark:text-neutral-200">
              OR
            </p>

            
        {/* Semester and Academic Year Selection with Auto Select */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-neutral-950 dark:text-neutral-200 border-b pb-2 border-gray-200">Select Subjects by Semester and Academic Year</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
                Semester
              </label>
              <input
                type="text"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. 1, 2, 3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-neutral-600 dark:text-neutral-200 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                id="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g. 1, 2, 3, 4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleSemesterYearSelection}
                className="w-full px-3 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={!semester || !academicYear}
              >
                Auto-Select Subjs
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={clearAllFields}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Clear All Data
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !signature ||
              !idPhoto ||
              !name ||
              !studentNumber ||
              !studentYear ||
              selectedSubjects.length === 0 ||
              loading
            }
          >
            {loading
              ? "Generating..."
              : selectedSubjects.length === 1
                ? "Generate PDF"
                : `Generate ${selectedSubjects.length} PDFs (ZIP)`}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DocumentUploader