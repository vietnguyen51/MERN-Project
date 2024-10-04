import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import { Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    name: '',
    role: '',
    _id: '',
  });

  const usersPerPage = 10;

  // Fetch all users from API
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: 'include',
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUser.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderTableRow = (el, index) => (
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
        <button
          className="p-2 bg-transparent hover:bg-black hover:text-white border border-gray-300 rounded-full transition duration-300 ease-in-out"
          onClick={() => {
            setUpdateUserDetails(el);
            setOpenUpdateRole(true);
          }}
        >
          <Edit2 size={18} />
          <span className="sr-only">Edit user role</span>
        </button>
      </td>
    </tr>
  );

  const renderMobileCard = (el, index) => (
    <div key={index} className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="font-bold text-lg mb-2">{el?.name}</h3>
      <p className="text-sm mb-1"><strong>Email:</strong> {el?.email}</p>
      <p className="text-sm mb-1">
        <strong>Role:</strong> 
        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-black text-white">
          {el?.role}
        </span>
      </p>
      <p className="text-sm mb-3"><strong>Created:</strong> {new Date(el?.createdAt).toLocaleDateString()}</p>
      <button
        className="w-full p-2 bg-transparent hover:bg-black hover:text-white border border-gray-300 rounded-md transition duration-300 ease-in-out flex items-center justify-center"
        onClick={() => {
          setUpdateUserDetails(el);
          setOpenUpdateRole(true);
        }}
      >
        <Edit2 size={18} className="mr-2" />
        Edit Role
      </button>
    </div>
  );

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden ">
      <h2 className="text-2xl font-bold mb-6 px-6 pt-6">All Users</h2>

      {loading ? (
        <div className="text-center py-6">Loading users...</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
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
                {currentUsers.map(renderTableRow)}
              </tbody>
            </table>
          </div>

          <div className="md:hidden px-4 py-4">
            {currentUsers.map(renderMobileCard)}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <span className="text-sm text-gray-700 mb-2 sm:mb-0">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, allUser.length)} of {allUser.length} Entries
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
                <span className="sr-only">Previous page</span>
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {Math.ceil(allUser.length / usersPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastUser >= allUser.length}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
                <span className="sr-only">Next page</span>
              </button>
            </div>
          </div>

          {openUpdateRole && (
            <ChangeUserRole
              onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;