import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Users, GraduationCap, Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  facultyName: string;
  time: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

interface ExtraClass {
  id: number;
  courseId: number;
  courseName: string;
  date: string;
  time: string;
  duration: number;
  room: string;
  reason: string;
  facultyName: string;
}

interface StudentTimetableProps {
  courses: Course[];
  extraClasses: ExtraClass[];
}

const StudentTimetable: React.FC<StudentTimetableProps> = ({ courses, extraClasses }) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'border-indigo-500';
      case 'lab':
        return 'border-green-500';
      case 'tutorial':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  const getClassTypeBg = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-indigo-50';
      case 'lab':
        return 'bg-green-50';
      case 'tutorial':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getNextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const getPrevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  const getDayDate = (dayIndex: number) => {
    const date = new Date(currentWeek);
    date.setDate(date.getDate() - date.getDay() + dayIndex + 1);
    return date;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-xl font-semibold text-gray-900">My Class Schedule</h3>
          </div>
          <div className="flex items-center space-x-6">
            {/* Legend */}
            <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                <span className="ml-1 text-sm text-gray-600">Lecture</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="ml-1 text-sm text-gray-600">Lab</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                <span className="ml-1 text-sm text-gray-600">Tutorial</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="ml-1 text-sm text-gray-600">Extra</span>
              </div>
            </div>
            {/* Week Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={getPrevWeek}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700">
                Week of {formatDate(currentWeek)}
              </span>
              <button
                onClick={getNextWeek}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-6 gap-[1px] bg-gray-200 rounded-lg">
            {/* Time Column */}
            <div className="bg-gray-50">
              <div className="h-12 flex items-center justify-center font-medium text-gray-500 bg-gray-100">
                Time
              </div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-24 flex items-center justify-center text-sm text-gray-500 bg-gray-50"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Days Columns */}
            {weekDays.map((day, index) => (
              <div key={day} className="bg-white">
                <div className="h-12 flex flex-col items-center justify-center bg-gray-100">
                  <div className="font-medium text-gray-900">{day}</div>
                  <div className="text-sm text-gray-500">{formatDate(getDayDate(index))}</div>
                </div>
                {timeSlots.map((time) => (
                  <div key={`${day}-${time}`} className="h-24 p-1 bg-white border-t border-gray-100">
                    {courses
                      .filter((course) => course.time.startsWith(time))
                      .map((course) => (
                        <div
                          key={course.id}
                          className={`p-2 rounded-lg shadow-sm border-l-4 ${getClassTypeColor(
                            course.type
                          )} ${getClassTypeBg(course.type)} hover:shadow-md transition-all`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{course.name}</p>
                              <p className="text-xs text-gray-600 mt-1 flex items-center">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                {course.facultyName}
                              </p>
                              <p className="text-xs text-gray-600 flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {course.room}
                              </p>
                            </div>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${getClassTypeBg(course.type)} font-medium`}>
                              {course.type.slice(0, 3)}
                            </span>
                          </div>
                        </div>
                      ))}
                    {extraClasses
                      .filter((ec) => {
                        const classDate = new Date(ec.date);
                        return weekDays.indexOf(day) === classDate.getDay() - 1 && ec.time.startsWith(time);
                      })
                      .map((extraClass) => (
                        <div
                          key={extraClass.id}
                          className="p-2 rounded-lg shadow-sm border-l-4 border-yellow-500 bg-yellow-50 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <p className="font-medium text-yellow-800 text-sm">{extraClass.courseName}</p>
                                <span className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                  Extra
                                </span>
                              </div>
                              <p className="text-xs text-yellow-700 mt-1 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {extraClass.duration}min
                              </p>
                              <p className="text-xs text-yellow-700 flex items-center">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                {extraClass.facultyName}
                              </p>
                              <p className="text-xs text-yellow-700 flex items-center">
                                <BookOpen className="h-3 w-3 mr-1" />
                                {extraClass.room}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Extra Classes Summary */}
        {extraClasses.length > 0 && (
          <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="text-sm font-medium text-yellow-800 flex items-center mb-3">
              <Bell className="h-4 w-4 mr-2" />
              Upcoming Extra Classes
            </h4>
            <div className="space-y-2">
              {extraClasses.map((extraClass) => (
                <div
                  key={extraClass.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">{extraClass.courseName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(extraClass.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })} at {extraClass.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Room {extraClass.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTimetable; 