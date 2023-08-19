:: Backend
cd backend/backend/

call gradlew

cd ..
cd ..

:: Frontend
cd frontend/

call npm install

call npm test -- --coverage --watchAll=false

if [ $? -ne 0 ]; then
  echo "Frontend Tests failed"
  exit 2
fi

echo "Tests complete."
exit 0