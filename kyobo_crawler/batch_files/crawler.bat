@echo off

REM �α� ���� ����
if not exist "C:\�����\�����_�����\kyobo_crawler\logs" mkdir "C:\�����\�����_�����\kyobo_crawler\logs"

REM �α� ���� ���
set LOG_FILE=C:\�����\�����_�����\kyobo_crawler\logs\crawler_log.txt

REM ���̽� ���
set PYTHON=C:\Users\82104\AppData\Local\Programs\Python\Python313\python.exe

REM ��ũ��Ʈ ���
set SCRIPT=C:\�����\�����_�����\kyobo_crawler\crawling_script\kyobo_books_update.py

REM �ð� ��� - ����
echo [%DATE% %TIME%] ��ġ ���� ���� >> "%LOG_FILE%"

REM ��ũ��Ʈ ����
"%PYTHON%" "%SCRIPT%" >> "%LOG_FILE%" 2>&1

REM �ð� ��� - ����
echo [%DATE% %TIME%] ��ġ ���� ���� >> "%LOG_FILE%"