import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { User, Users, ShoppingBag } from 'lucide-react'
import ROLE from '../common/role'

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">       
              <User className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="mt-4 text-xl font-semibold capitalize">{user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
        <div className="h-[calc(100vh-200px)] overflow-auto">
          <nav className="px-4 py-2">
            <Link to={"all-users"} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded mb-1">
              <Users className="mr-2 h-4 w-4" />
              All Users
            </Link>
            <Link to={"all-products"} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              <ShoppingBag className="mr-2 h-4 w-4" />
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}