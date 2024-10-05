"use client";
import React, { useEffect, useState } from 'react';
import useLoading from '../hooks/useLoader';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import LeaveRequests from '../components/LeaveRequest';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [isLoading, setLoading] = useLoading(false);
  const [events, setEvents] = useState([]);

  const { data: session, status } = useSession();
  const router = useRouter();
  
  if(!session)
  {
    router.push('/signin');
  }


  const fetchEmployeeData = async () => {
    const response = await fetch(`/api/employees/`);
    const data = await response.json();
    setUserIsAdmin(data.body.isAdmin);
  };

  const fetchDaysOff = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/leaveRequests');
      const data = await response.json();
      if (response.ok) {
        setEvents(data.events);
      } 
    } catch (error) {
      console.error('Error fetching days off', error);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaveRequests/approve', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSuccessMessage(''); // Clear success message
      } else {
        setSuccessMessage(data.message); // Set success message
        setError(''); // Clear error message
      }

      await fetchDaysOff();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Неуспех при одобряване на молба за отпуск'); // Set error message on fetch failure
    }
  };

  const handleDecline = async (id) => {
    setLoading(true);
    try {
      const response = await fetch('/api/leaveRequests/decline', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSuccessMessage(''); // Clear success message
      } else {
        setSuccessMessage(data.message); // Set success message
        setError(''); // Clear error message
      }

      await fetchDaysOff();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Неуспех при отхвърляне на молба за отпуск'); // Set error message on fetch failure
    }
  };

  // Effect to handle message dismissal
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Message will disappear after 5 seconds
      return () => clearTimeout(timer); // Clear timeout on unmount or when successMessage changes
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); // Message will disappear after 5 seconds
      return () => clearTimeout(timer); // Clear timeout on unmount or when error changes
    }
  }, [error]);

  useEffect(() => {
    fetchEmployeeData();
    fetchDaysOff();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-grow p-4 overflow-auto max-h-[calc(100vh-20vh)]">
        {isLoading && <LoadingSpinner />}


        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">Управление на молби за отпуск</h1>
          <p className="text-gray-600">Тук можете да преглеждате молбите за отпуск на всички служители.</p>
          <p>Само администратори могат да одобряват или отказват молби.</p>
        </div>


        {events.length > 0 ? (
          <div className="h-full max-h-screen">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <LeaveRequests
                  key={event.id}
                  id={event.id}
                  startDate={event.start}
                  endDate={event.end}
                >
                  <div className="text-sm md:text-base">
                    <strong>От:</strong> {event.title}
                    <br />
                    <strong>Статус на молбата: </strong>
                    {event.status === "Approved" ? "Одобренa" : (
                      event.status === "Declined" ? "Неодобренa" : (
                        event.status === "Pending" ? "В процес на разглеждане" : ""
                      )
                    )}
                    <br />
                    <strong>Използвани дни от служителя до момента:</strong>{" "}
                    {event.usedDaysOff} от 20 работни дни
                  </div>

                  {userIsAdmin && event.status === 'Pending' && (
                    <div className="flex justify-end mt-3 space-x-2">
                      <button
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                        onClick={() => handleApprove(event.id)}
                      >
                        <FaThumbsUp />
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                        onClick={() => handleDecline(event.id)}
                      >
                        <FaThumbsDown />
                      </button>
                    </div>
                  )}
                </LeaveRequests>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Няма подадени молби за отпуск.</p>
          </div>
        )}
      </main>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-5 w-full bg-green-500 text-center text-white font-bold transition-opacity duration-500 ease-in-out">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-5 w-full bg-red-500 text-center text-white font-bold transition-opacity duration-500 ease-in-out">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
