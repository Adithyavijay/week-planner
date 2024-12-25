Weekly Availability Manager - Installation Guide
Prerequisites
Before installing the application, ensure you have the following installed on your system:
I am using Linux ubuntu ,installation may differ according to the os .So i am providing the steps for Mac,linux and windows

Node.js (v18 or higher)
npm (v8 or higher)
Memcached server

Installation Steps

Install Memcached
For Ubuntu/Debian:
bashCopysudo apt-get update
sudo apt-get install memcached
sudo systemctl start memcached
sudo systemctl enable memcached
For macOS:
bashCopybrew install memcached
brew services start memcached
For Windows:

Download the latest binary from https://memcached.org
Run memcached.exe from the command prompt


Set Up the Application
bashCopy# Extract the ZIP file
unzip weekly-availability-manager.zip

# Navigate to the project directory
cd weekly-availability-manager

# Install dependencies
npm install

# Create environment file
cp .env.example .env ( i have attached the .env.local so you can avoid this step :) 
 
Configure Environment Variables
Edit the .env file and set the following variables:
CopyMEMCACHIER_SERVERS=localhost:11211
MEMCACHIER_USERNAME=
MEMCACHIER_PASSWORD=

Run the Application
bashCopy# Run in development mode
npm run dev

# Or build and run in production mode
npm run build
npm start
The application will be available at http://localhost:3000/user/availability/{user_id}