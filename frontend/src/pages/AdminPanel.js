import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { User, Users, ShoppingBag, ShoppingCart, BarChart2, Menu, X } from 'lucide-react'
import ROLE from '../common/role'

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/")
    }
  }, [user, navigate])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  const navItems = [
    { to: "all-users", icon: Users, label: "All Users" },
    { to: "all-products", icon: ShoppingBag, label: "All Products" },
    { to: "orders", icon: ShoppingCart, label: "Orders" },
    { to: "analytics", icon: BarChart2, label: "Analytics" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">       
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="mt-4 text-xl font-semibold capitalize">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
        <nav className="px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center w-full px-4 py-2 text-sm ${location.pathname.includes(item.to) ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'} rounded mb-1`}
              onClick={closeSidebarOnMobile}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600">
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}