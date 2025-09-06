import os
import requests
import pymysql

# 네이버 API 키
CLIENT_ID = "네이버_Client_ID"
CLIENT_SECRET = "네이버_Client_Secret"

headers = {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET
}

# DB 연결
conn = pymysql.connect(
    host="localhost",
    user="root",
    password="password",
    db="bookhub",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

save_dir = "./files"
os.makedirs(save_dir, exist_ok=True)

def search_book(isbn):
    url = "https://openapi.naver.com/v1/search/book.json"
    params = {"query": isbn}
    res = requests.get(url, headers=headers, params=params)
    if res.status_code == 200:
        data = res.json().get("items", [])
        if data:
            return data[0]  # 첫 번째 검색 결과 반환
    return None

with conn.cursor() as cursor:
    cursor.execute("SELECT book_isbn FROM books WHERE cover_image_id IS NULL;")
    books = cursor.fetchall()

    for book in books:
        isbn = book["book_isbn"]
        book_data = search_book(isbn)

        if book_data:
            title = book_data["title"].replace("<b>", "").replace("</b>", "")
            cover_url = book_data["image"]

            if cover_url:
                img_res = requests.get(cover_url, stream=True)
                if img_res.status_code == 200:
                    file_name = f"{isbn}.jpg"
                    file_path = os.path.join(save_dir, file_name)

                    with open(file_path, "wb") as f:
                        for chunk in img_res.iter_content(1024):
                            f.write(chunk)

                    file_size = os.path.getsize(file_path)

                    # upload_files insert
                    cursor.execute("""
                        INSERT INTO upload_files 
                            (original_name, file_name, file_path, file_type, file_size)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (file_name, file_name, file_path, "image/jpeg", file_size))
                    upload_file_id = cursor.lastrowid

                    # books update
                    cursor.execute("""
                        UPDATE books SET cover_image_id = %s WHERE book_isbn = %s
                    """, (upload_file_id, isbn))

                    print(f"✅ {title} ({isbn}) 표지 저장 완료")

    conn.commit()

conn.close()
