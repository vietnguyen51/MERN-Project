import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { Edit2, ChevronLeft, ChevronRight } from 'lucide-react'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            })

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                setAllUsers(dataResponse.data)
            } else {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            toast.error('Failed to fetch users')
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = allUser.slice(indexOfFirstUser, indexOfLastUser)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold mb-6 px-6 pt-6">All Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="px-6 py-3">Sr.</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Created Date</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentUsers.map((el, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstUser + index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{el?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{el?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white">
                                        {el?.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(el?.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-gray-600 hover:text-black transition duration-300 ease-in-out">
                                        <Edit2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
                <span className="text-sm text-gray-700">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, allUser.length)} of {allUser.length} Entries
                </span>
                <div className="mt-2 sm:mt-0 flex">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastUser >= allUser.length}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllUsers