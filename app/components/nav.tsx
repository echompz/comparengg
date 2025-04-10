'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = {
  '/': {
    name: 'home',
  },
  '/gwacalculator': {
    name: 'gwa calculator',
  },
  '/prereq': {
    name: 'prerequisite searcher',
  },
  '/curriculum': {
    name: 'cpe curriculum',
  },
}

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        
        {/* Hamburger toggle button */}
        <div className="md:hidden flex justify-between items-center px-4 py-2">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation links */}
        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row items-start md:items-center relative px-4 md:px-0 fade md:overflow-auto scroll-pr-6 md:relative`}
          id="nav"
        >
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-0 md:pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 ${
                    isActive ? 'text-blue-500' : ''
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
