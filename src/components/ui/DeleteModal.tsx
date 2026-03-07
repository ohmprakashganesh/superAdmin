import React, { useEffect, useState } from 'react'

interface deleteModal{
  setShow:(show:boolean)=>void;
  show:boolean;
}

const DeleteModal:React.FC<deleteModal> = ({setShow,show}) => {
     const [confirmText, setConfirmText] = useState("");
  const [randomString, setRandomString] = useState("");

    useEffect(()=>{
        if(show){
            const random=Math.random().toString(36).substring(2,10);
            setRandomString(random);
            setConfirmText("");

        }
    },[show]);

    if(!show) return null;

    const isMatch= confirmText===randomString;

     const deleteFunc= ()=>{
      if(isMatch){
        alert(isMatch);
        setShow(false);
        
      }
      // call the delete api
     }
 return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
        
        <h2 className="text-lg font-semibold text-gray-900">
          ⚠️ Confirm Deletion
        </h2>

        <p className="text-sm text-gray-600">
          This action cannot be undone.  
          Please type the following code to confirm deletion:
        </p>

        {/* Random Code Display */}
        <div className="bg-gray-100 border rounded-lg p-3 font-mono text-center text-red-600 font-semibold tracking-widest">
          {randomString}
        </div>

        {/* Input */}
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type the code above"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={()=>setShow(false)}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
          onClick={()=>deleteFunc()}
            disabled={!isMatch}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isMatch
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
