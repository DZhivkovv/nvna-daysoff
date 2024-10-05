import React from 'react';
import { FaTimes } from "react-icons/fa";

const LeaveRequest = ({ children, id, startDate, endDate, isEditing, updatedData, setUpdatedData, handleUpdate, handleCancelEdit }) => {
  const handleSubmit = (leaveRequestId) => {
    if (updatedData.startDate > updatedData.endDate) {
      alert("Невалидна дата");
      return null;
    }

    handleUpdate(leaveRequestId);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 space-y-2">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">Начало на отпуск:</span>
        <span>{new Date(startDate).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Край на отпуск:</span>
        <span>{new Date(endDate).toLocaleDateString()}</span>
      </div>

      {children}

      {isEditing && (
        <div className="mt-4 border p-4 rounded-md bg-gray-100">
          <div className="flex justify-end">
            <button className="text-gray-500 text-md rounded" onClick={handleCancelEdit}>
              <FaTimes />
            </button>
          </div>

          <h2 className="mb-3">Промяна на заявление за отпуск</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Начало на отпуск:</label>
            <input
              type="date"
              defaultValue={updatedData.startDate}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2"
              onChange={(e) => setUpdatedData({ ...updatedData, startDate: e.target.value })}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Край на отпуск:</label>
            <input
              type="date"
              defaultValue={updatedData.endDate}
              onChange={(e) => setUpdatedData({ ...updatedData, endDate: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 mb-2"
            />
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              className="border text-sm bg-indigo-900 text-white transition-all mt-1 hover:bg-indigo-700 hover:text-white font-bold py-2 px-4 rounded"
              onClick={() => handleSubmit(id)}
            >
              Запазете промените
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
