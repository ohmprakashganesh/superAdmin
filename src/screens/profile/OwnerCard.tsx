import React from 'react'
import Input from '../../components/ui/Input'

interface ownerProps {
  isEditing: boolean;
  editedCompany: any;
  handleInputChange: (field: string, value: string) => void; // Fixed type    data: any;
  data: any;
}

const OwnerCard: React.FC<ownerProps> = ({ isEditing, handleInputChange, editedCompany, data }) => (
  <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-sm font-bold text-purple-600 uppercase mb-4 flex items-center gap-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      Owner Credentials
    </h3>
    <div className="space-y-3">
      <div>
        <p className="text-xs text-gray-500">Full Name</p>
        {isEditing ? (
          <Input onChange={(e) => handleInputChange("ownerName", e.target.value)} value={editedCompany?.ownerName || data.ownerName} />
        ) : (
          <p className="font-bold text-gray-800">{data.ownerName}</p>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-500">Login Email</p>
        <p className="font-mono text-sm text-gray-600">{data.loginEmail}</p>
      </div>

    </div>
  </div>
)


export default OwnerCard;
