import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome to Availability Scheduler
            </h1>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-6">
              <p className="text-gray-600">
                This application allows you to manage your weekly availability schedule. To access your 
                personal scheduling interface, please visit:
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md font-mono">
                <code className="text-blue-600">
                  http://localhost/user/availability/[your-user-id]
                </code>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Getting Started:</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    1. Replace [your-user-id] with your assigned user identifier.
                  </p>
                  <p className="text-gray-600">
                    2. On your availability page, you can set specific time slots for each day of the week.
                  </p>
                  <p className="text-gray-600">
                    3. Use the + button to add multiple time slots per day, and the - button to remove them.
                  </p>
                  <p className="text-gray-600">
                    4. Toggle days on/off using the checkbox next to each day.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  Example: For user ID `12345`, visit:{' '}
                  <Link 
                    href="/user/availability/12345" 
                    className="underline hover:text-blue-600 transition-colors"
                  >
                    /user/availability/12345
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}