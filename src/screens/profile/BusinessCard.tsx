
 interface companyProps {
  data: any;
}
 export  const BusinessCard: React.FC<companyProps> = ({ data }) => (<div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-sm font-bold text-indigo-600 uppercase mb-4 flex items-center gap-2">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
    Business Identity
  </h3>
  <div className="space-y-3">
    <div>
      <p className="text-xs text-gray-500">Restaurant Name</p>

        <p className="font-bold text-gray-800">{data.name}</p>

    </div>
    <div>
      <p className="text-xs text-gray-500">Slug (URL identifier)</p>
      <p className="font-mono text-sm text-gray-600">{data.slug}</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Total Capacity (Tables)</p>
      <p className="font-bold text-gray-800">{data.totalCapacity} Tables</p>
    </div>
  </div>
</div>
)
export default BusinessCard;