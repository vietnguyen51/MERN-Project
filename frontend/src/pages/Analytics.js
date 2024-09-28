import React, { useState } from 'react'
import { Smartphone, Laptop, Headphones, Tablet } from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const TabButton = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 font-medium text-sm transition-all duration-300 ease-in-out ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-blue-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-shadow duration-300 ease-in-out hover:shadow-lg">
    {children}
  </div>
)

const PieChart = ({ data }) => {
  let total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="relative w-64 h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item, index) => {
          const startAngle = currentAngle
          const percentage = (item.value / total) * 100
          const angle = (percentage / 100) * 360
          currentAngle += angle

          const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180)
          const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180)
          const x2 = 50 + 50 * Math.cos((Math.PI * currentAngle) / 180)
          const y2 = 50 + 50 * Math.sin((Math.PI * currentAngle) / 180)

          const largeArcFlag = angle > 180 ? 1 : 0

          return (
            <path
              key={index}
              d={`M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`}
              fill={COLORS[index % COLORS.length]}
            />
          )
        })}
      </svg>
      {data.map((item, index) => {
        const percentage = ((item.value / total) * 100).toFixed(0)
        const angle = ((percentage / 100) * 360 + currentAngle) / 2
        const x = 50 + 35 * Math.cos((Math.PI * angle) / 180)
        const y = 50 + 35 * Math.sin((Math.PI * angle) / 180)
        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {percentage}%
          </div>
        )
      })}
    </div>
  )
}

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const salesData = [
    { name: 'Điện thoại', value: 400, icon: <Smartphone className="w-6 h-6" /> },
    { name: 'Laptop', value: 300, icon: <Laptop className="w-6 h-6" /> },
    { name: 'Phụ kiện', value: 200, icon: <Headphones className="w-6 h-6" /> },
    { name: 'Máy tính bảng', value: 100, icon: <Tablet className="w-6 h-6" /> },
  ]

  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Phân tích bán hàng</h1>
      <div className="mb-6 border-b">
        <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
          Tổng quan
        </TabButton>
        <TabButton isActive={activeTab === 'details'} onClick={() => setActiveTab('details')}>
          Chi tiết
        </TabButton>
      </div>
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Phân bố doanh số</h2>
            <div className="flex justify-center">
              <PieChart data={salesData} />
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tổng quan doanh số</h2>
            <div className="space-y-4">
              {salesData.map((item, index) => {
                const percentage = Math.round((item.value / totalSales) * 100)
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2 text-gray-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{item.value.toLocaleString()} ₫</p>
                      <p className="text-sm text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}
      {activeTab === 'details' && (
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Chi tiết doanh số</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh số</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phần trăm</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value.toLocaleString()} ₫</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.round((item.value / totalSales) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Tổng doanh số</h2>
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold text-gray-900">{totalSales.toLocaleString()} ₫</p>
        </div>
      </Card>
    </div>
  )
}

export default Analytics