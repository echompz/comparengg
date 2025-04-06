'use client';

import React, { useState } from 'react';
import { predefinedSubjects } from "app/gwacalculator/subjects";
import { Search } from 'lucide-react';

type Subject = {
  code: string;
  name: string;
  units: number;
  year: number;
  semester: string;
  grade?: string;
  prerequisites?: string[];
};

export default function PrerequisiteSearcher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [prerequisites, setPrerequisites] = useState<Subject[]>([]);
  const [subsequentCourses, setSubsequentCourses] = useState<Subject[]>([]);

  // Convert and normalize subjects
  const getFormattedSubjects = (): Subject[] => {
    return predefinedSubjects.map(subject => ({
      ...subject,
      code: subject.code.trim().toUpperCase(),
      units: Number(subject.units) || 0,
      year: Number(subject.year) || 0,
      prerequisites: subject.prerequisites?.map(p => p.trim().toUpperCase())
    }));
  };

  // Get ACTUAL prerequisites of a subject (what it requires)
  const getSubjectPrerequisites = (subjectCode: string): Subject[] => {
    const normalizedCode = subjectCode.trim().toUpperCase();
    const subject = getFormattedSubjects().find(s => s.code === normalizedCode);
    
    if (!subject?.prerequisites) return [];
    
    return subject.prerequisites
      .map(prereqCode => 
        getFormattedSubjects().find(s => s.code === prereqCode)
      )
      .filter(Boolean) as Subject[];
  };

  // Get courses that REQUIRE this subject (what it unlocks)
  const getSubsequentCourses = (subjectCode: string): Subject[] => {
    const normalizedCode = subjectCode.trim().toUpperCase();
    return getFormattedSubjects().filter(subject => 
      subject.prerequisites?.some(prereq => prereq === normalizedCode)
    );
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const term = value.toLowerCase();
      const results = getFormattedSubjects()
        .filter(
          subject =>
            subject.code.toLowerCase().includes(term) ||
            subject.name.toLowerCase().includes(term)
        );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = getFormattedSubjects().filter(
      subject =>
        subject.code.toLowerCase().includes(term) ||
        subject.name.toLowerCase().includes(term)
    );

    setSearchResults(results);
  };

  // Select a subject to view its details
  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setPrerequisites(getSubjectPrerequisites(subject.code));
    setSubsequentCourses(getSubsequentCourses(subject.code));
  };


  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        CpE Prerequisite Searcher
      </h1>

      <div className="mb-6">
  <div className="relative flex gap-2">
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Search by course code or name..."
        className="w-80 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-600 pr-10" // Added pr-10 for padding
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            setSearchResults([]);
            setSelectedSubject(null);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          ×
        </button>
      )}
    </div>
    <button 
      onClick={handleSearch}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
    >
      <Search size={16} />
      Search
    </button>
  </div>
</div>

      {/* Search Results with max height and scrollbar */}
      {searchResults.length > 0 && (
        <div className="mb-8 max-h-96 overflow-auto"> {/* Added max height and scrollbar */}
          <h2 className="text-lg font-medium mb-2">Search Results</h2>
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-700">
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-left" style={{ width: "250px", wordWrap: "break-word", whiteSpace: "normal" }}>Name</th>
                  <th className="p-3 text-center">Units</th>
                  <th className="p-3 text-center">Year</th>
                  <th className="p-3 text-center">Semester</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(subject => (
                  <tr key={subject.code} className="border-t dark:border-neutral-700">
                    <td className="p-3">{subject.code}</td>
                    <td className="p-3" style={{ width: "250px", wordWrap: "break-word", whiteSpace: "normal" }}>{subject.name}</td>
                    <td className="p-3 text-center">{subject.units}</td>
                    <td className="p-3 text-center">{subject.year}</td>
                    <td className="p-3 text-center">{subject.semester}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleSelectSubject(subject)}
                        className="px-3 py-1 bg-white dark:bg-neutral-600 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Subject Details with max height and scrollbar */}
      {selectedSubject && (
        <div className="mb-8 max-h-96 overflow-auto"> {/* Added max height and scrollbar */}
          <h2 className="text-lg font-medium mb-2">Subject Details</h2>
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-bold mb-1">{selectedSubject.name}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">Code: {selectedSubject.code} | Units: {selectedSubject.units} | Year {selectedSubject.year}, Semester {selectedSubject.semester}</p>
            
            {/* Prerequisites */}
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Prerequisites:</h4>
              {prerequisites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {prerequisites.map(prereq => (
                    <div 
                      key={prereq.code}
                      className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-md"
                    >
                      <div className="font-medium">{prereq.name}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {prereq.code} | {prereq.units} units | Year {prereq.year}, Semester {prereq.semester}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-600 dark:text-neutral-400">This subject has no prerequisites.</p>
              )}
            </div>

            {/* Courses that have this as a prerequisite */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Required for:</h4>
              {subsequentCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {subsequentCourses.map(course => (
                    <div 
                      key={course.code}
                      className="bg-neutral-100 dark:bg-neutral-700 p-3 rounded-md"
                    >
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {course.code} | {course.units} units | Year {course.year}, Semester {course.semester}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-600 dark:text-neutral-400">This subject is not a prerequisite for any other subjects.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* How to use section */}
      <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">How to use:</h2>
        <ul className="list-disc ml-6">
          <li className="mb-1">Search for a subject by typing part of its name or code.</li>
          <li className="mb-1">Click "View" on any search result to see its prerequisites.</li>
          <li className="mb-1">The details page shows both prerequisites for the selected course and courses that require it as a prerequisite.</li>
        </ul>
      </div>
    </section>
  );
}
