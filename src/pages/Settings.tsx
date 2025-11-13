import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Settings as SettingsIcon } from 'lucide-react';
import { NotificationSettings } from '@/components/NotificationSettings';

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Settings - Gavi Gadgets</title>
        <meta name="description" content="Manage your Gavi Gadgets account settings and preferences." />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">Settings</h1>
              <p className="text-sm text-gray-500">Manage your preferences</p>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <NotificationSettings />

            {/* Other settings can be added here */}
            {/* <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-500">More settings coming soon...</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

