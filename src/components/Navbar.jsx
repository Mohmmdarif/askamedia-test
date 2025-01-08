import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar h-20 bg-white shadow-md flex items-center justify-between px-10">
      <div>
        <span className="font-bold text-2xl text-orange-500">Recipe App</span>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
          </li>
          <li>
            <a href="/recipes" className="text-gray-700 hover:text-gray-900">Recipes</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
