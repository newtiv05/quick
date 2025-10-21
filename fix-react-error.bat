@echo off
echo Fixing React useState error...

echo Clearing Vite cache...
rmdir /s /q node_modules\.vite 2>nul

echo Clearing browser cache...
echo Please clear your browser cache manually or use Ctrl+Shift+R

echo Restarting development server...
npm run dev

pause

