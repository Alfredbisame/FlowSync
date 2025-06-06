import React from 'react';

interface NotificationsSettingsProps {
  notificationSettings: {
    taskUpdates: boolean;
    deadlineReminders: boolean;
    systemAlerts: boolean;
    emailNotifications: boolean;
  };
  setNotificationSettings: React.Dispatch<React.SetStateAction<{
    taskUpdates: boolean;
    deadlineReminders: boolean;
    systemAlerts: boolean;
    emailNotifications: boolean;
  }>>;
}

const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({ 
  notificationSettings, 
  setNotificationSettings 
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-lg font-medium text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => setNotificationSettings({
                  ...notificationSettings,
                  [key]: !value
                })}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition duration-200 ease-in-out"
              />
              <label
                htmlFor={key}
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSettings;