@echo off
echo "🌐 Testing server connectivity..."

echo "📡 Checking if server is running on port 3000..."
netstat -an | findstr ":3000"

echo.
echo "🔍 Checking if server is running on port 3001..."
netstat -an | findstr ":3001"

echo.
echo "🔍 Checking if server is running on port 3002..."
netstat -an | findstr ":3002"

echo.
echo "🔍 Checking if server is running on port 3003..."
netstat -an | findstr ":3003"

echo.
echo "✅ If you see 'LISTENING' above, the server is running!"
echo "🌐 Try accessing: http://localhost:3000/"
echo "🌐 Or try: http://localhost:3001/"
echo "🌐 Or try: http://localhost:3002/"
echo "🌐 Or try: http://localhost:3003/"

