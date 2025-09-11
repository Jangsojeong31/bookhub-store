@echo off

REM 로그 파일 경로
set LOG_FILE=C:\장소정\북허브_스토어\kyobo_crawler\logs\crawler_log.txt

REM 파이썬 경로
set PYTHON=C:\Users\82104\AppData\Local\Programs\Python\Python313\python.exe

REM 스크립트 경로
set SCRIPT=C:\장소정\북허브_스토어\kyobo_crawler\crawling_script\csv_to_db.py

REM 시간 기록 - 시작
echo [%DATE% %TIME%] 배치 실행 시작 >> "%LOG_FILE%"

REM 스크립트 실행
"%PYTHON%" "%SCRIPT%" >> "%LOG_FILE%" 2>&1

REM 시간 기록 - 종료
echo [%DATE% %TIME%] 배치 실행 종료 >> "%LOG_FILE%"