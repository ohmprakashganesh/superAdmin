import React from 'react'
interface HeaderProps{
    onClose:()=>void;
    data:any;
}

const Header:React.FC<HeaderProps> =({onClose,data}) => {
  return (
    <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {data.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">{data.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">ID: {data.slug}</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${data.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="text-sm font-medium text-gray-600">
                    {data.isActive ? 'Active' : 'Suspended'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>
  )
}

export default Header
