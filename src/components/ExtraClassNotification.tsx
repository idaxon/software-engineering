import React from 'react';
import { Bell, Calendar, Clock, BookOpen } from 'lucide-react';

interface ExtraClass {
  id: number;
  courseId: number;
  courseName: string;
  date: string;
  time: string;
  duration: number;
  room: string;
  reason: string;
}

interface ExtraClassNotificationProps {
  extraClasses: ExtraClass[];
  onDismiss: (id: number) => void;
}

const ExtraClassNotification: React.FC<ExtraClassNotificationProps> = ({
  extraClasses,
  onDismiss
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-indigo-600" />
          Extra Class Notifications
        </h3>
      </div>
      {extraClasses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No extra classes scheduled</p>
      ) : (
        <div className="space-y-3">
          {extraClasses.map((extraClass) => (
            <div
              key={extraClass.id}
              className="bg-white rounded-lg shadow-sm border border-l-4 border-l-yellow-500 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">{extraClass.courseName}</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(extraClass.date)}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {extraClass.time} ({extraClass.duration} minutes)
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {extraClass.room}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Reason:</span> {extraClass.reason}
                  </p>
                </div>
                <button
                  onClick={() => onDismiss(extraClass.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Dismiss</span>
                  ×
                </button>
              </div>
              <div className="mt-3 flex justify-end space-x-3">
                <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100">
                  Add to Calendar
                </button>
                <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExtraClassNotification; 