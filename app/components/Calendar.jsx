// Calendar.js
import React,{useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { fetchDaysOff } from '../utils/daysoff/leaveRequest';
import { getRandomColor } from '../utils/colors';
import useLoading from '../hooks/useLoader'
import LoadingSpinner from './LoadingSpinner';

const Calendar = () => {
    const [daysOff, setDaysOff] = useState([]);
    const [isLoading, setLoading] = useLoading();
    const [employeeColors, setEmployeeColors] = useState({});

    const fetchDaysOffData = async () => {
      setLoading(true);
      const data = await fetchDaysOff('/api/leaveRequests');
      const approvedDaysOff = data.events.filter(event => event.status === 'Approved');   
   
      // Create a mapping of employee IDs to colors
      const newEmployeeColors = { ...employeeColors };
      approvedDaysOff.forEach(event => {
        if (!newEmployeeColors[event.employeeId]) {
          newEmployeeColors[event.employeeId] = getRandomColor();
        }
        event.backgroundColor = newEmployeeColors[event.employeeId];
      });

      setEmployeeColors(newEmployeeColors);
      setDaysOff(approvedDaysOff);
      setLoading(false);
    }
  
    useEffect(() => {
      fetchDaysOffData();
    }, []);

    return (
    <div className='capitalize h-full'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          height={'100%'}
          locale={'bg'}
          events={daysOff} 
        />

        {/* Loading spinner */}
        {isLoading && <LoadingSpinner/>}
    </div>
    )
  }
export default Calendar
