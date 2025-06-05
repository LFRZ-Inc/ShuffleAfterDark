@echo off
echo.
echo ========================================
echo  ShuffleAfterDark - Push to GitHub
echo ========================================
echo.
echo Please provide your GitHub repository URL
echo (e.g., https://github.com/username/ShuffleAfterDark.git)
echo.
set /p REPO_URL="Enter your repository URL: "

echo.
echo Adding GitHub remote...
git remote add origin %REPO_URL%

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Successfully pushed to GitHub!
echo  Repository: %REPO_URL%
echo ========================================
pause 