"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LeaveRequest from '../components/LeaveRequest';
import IconButton from '../components/IconButton';
import useLoading from '@/app/hooks/useLoader';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchDaysOff, downloadDaysOffInvoice, updateDaysOffInDatabase, removeDaysOffFromDatabase } from '../utils/daysoff/leaveRequest';
import { FaFileDownload, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Страница, показваща всички заявления за отпуск на потребителя, който е влязъл в системата.
const Page = () => {
  const [userLeaveRequests, setUserLeaveRequests] = useState([]);
  const [editId, setEditId] = useState(null);
  const [updatedData, setUpdatedData] = useState({ startDate: '', endDate: '' });
  const [isLoading, setLoading] = useLoading();
  const { data: session, status } = useSession();
  const router = useRouter();

  if(!session)
  {
    router.push('/signin');
  }


  // Функция за извличане на данните за всички заявления за отпуски от сървъра
  const fetchDaysOffData = async () => {
    setLoading(true);
    const data = await fetchDaysOff('/api/leaveRequests/userLeaveRequests');

    setUserLeaveRequests(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchDaysOffData();
  }, []);


  const handleEditClick = (dayOff) => {
    setEditId(dayOff.id);
    setUpdatedData({ startDate: dayOff.start, endDate: dayOff.end });
  };

  const handleUpdate = async (id) => {
    await updateDaysOffInDatabase(id, updatedData);
    
    fetchDaysOffData();
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await removeDaysOffFromDatabase(id);
    fetchDaysOffData();
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center min-h-screen flex flex-col">
      <h1 className="text-xl mb-4">Вашите отпуски:</h1>

      <div className="flex-grow overflow-y-auto max-h-[calc(100vh-200px)]">
        {userLeaveRequests.length === 0 ? (
          <p>Няма текущи молби за отпуск. Можете да пуснете молба за отпуск, ако имате нужда.</p>
        ) : (
          userLeaveRequests.map((leaveRequest) => (
            <LeaveRequest
              key={leaveRequest.id}
              id={leaveRequest.id}
              startDate={new Date(leaveRequest.start).toLocaleDateString()}
              endDate={new Date(leaveRequest.end).toLocaleDateString()}
              onEdit={() => handleEditClick(leaveRequest)}
              isEditing={editId === leaveRequest.id}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              handleUpdate={handleUpdate}
              handleCancelEdit={() => setEditId(null)}
            >
              <div className="flex flex-col">
                <div className='text-left'>
                  <p>{leaveRequest.title}</p>
                  <p><strong>Статус:</strong> 
                    {leaveRequest.status === "Approved" ? " Одобрена" : 
                      leaveRequest.status === "Declined" ? " Неодобрена" :
                      leaveRequest.status === "Pending" ? " В процес на разглеждане" :
                      ""}
                  </p>
                </div>
                
                <div className="flex justify-end">
                  {leaveRequest.status === "Pending" && (
                    <div>
                      <IconButton
                        onClick={() => handleEditClick(leaveRequest)}
                        icon={<FaEdit />}
                      />
                      <IconButton
                        onClick={() => handleDelete(leaveRequest.id)}
                        icon={<FaRegTrashAlt />}
                      />
                    </div>
                  )}
                </div>
              </div>
            </LeaveRequest>
          ))
        )}
      </div>

      {/* Линкове, сочещи към страница за запазване на отпуск и страница, показваща всички заявления, пуснати от всички служители (достъпна само за администратор).*/}
      <div className='fixed bottom-10 left-1 '>
        <Link 
          href="/leave-request" 
          style={{ display: 'block', margin: '10px', backgroundColor: 'navy', color: 'white', padding: '10px', borderRadius: '5px' }}>
          Пуснете молба за отпуск
        </Link>
        <Link 
          href="/all-requests" 
          style={{ backgroundColor: 'navy', color: 'white', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
          Вижте всички молби
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default Page;
