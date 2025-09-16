import csv
import MySQLdb

conn = MySQLdb.connect(
  user="root",
  password="susan429@",
  host="localhost",
  db="bookhub_store_db",
  charset="utf8mb4"
)

cursor = conn.cursor()


# categories INSERT 함수
def get_or_create_category(category_type, parent_name, category_name):
    # 1. parent_category_id 찾기
    parent_id = None
    if parent_name:
        cursor.execute("SELECT category_id FROM categories WHERE category_name = %s", (parent_name,))
        parent = cursor.fetchone()
        if parent:
            parent_id = parent[0]
        else:
            # 부모 카테고리 없으면 먼저 생성
            cursor.execute(
                "INSERT INTO categories (category_type, parent_category_id, category_name) VALUES (%s, %s, %s)",
                (category_type, None, parent_name)
            )
            conn.commit()
            parent_id = cursor.lastrowid

    # 2. 현재 카테고리 존재 여부 확인
    cursor.execute("SELECT category_id FROM categories WHERE category_name = %s", (category_name,))
    category = cursor.fetchone()
    if category:
        return category[0]

    # 3. 없으면 생성
    cursor.execute(
        "INSERT INTO categories (category_type, parent_category_id, category_name) VALUES (%s, %s, %s)",
        (category_type, parent_id, category_name)
    )
    conn.commit()
    return cursor.lastrowid


# CSV 읽기
file_path = 'C:/장소정/북허브_스토어/kyobo_crawler/crawled_data/kyobo_books.csv'
csv_file = open(file_path, 'r', encoding='cp949')
fReader = csv.DictReader(csv_file)

for line in fReader:
    if all(cell.strip() == '' for cell in line):
        continue
    
    # category_type 변환
    raw_type = line['category_type'].strip()
    if raw_type == '국내도서':
        category_type = 'DOMESTIC'
    elif raw_type == '외국도서':
        category_type = 'FOREIGN'
    else:
        category_type = None  # 혹은 기본값 설정

    # 1. 카테고리 먼저 처리
    category_id = None
    if category_type and line['category_name']:
        category_id = get_or_create_category(
            line['category_type'],
            line['parent_category'],
            line['category_name']
        )

    # 2. books INSERT
    query = """
        INSERT INTO books (
            isbn, book_title, author, publisher, book_price, discount_rate,
            published_date, book_status, page_count, language, description,
            cover_image_url, category_id
        ) VALUES (
            %s, %s, %s, %s, %s, %s,
            %s, %s, %s, %s, %s,
            %s, %s
        )
        ON DUPLICATE KEY UPDATE 
            book_title = VALUES(book_title),
            author = VALUES(author),
            publisher = VALUES(publisher),
            book_price = VALUES(book_price),
            discount_rate = VALUES(discount_rate),
            published_date = VALUES(published_date),
            description = VALUES(description),
            cover_image_url = VALUES(cover_image_url),
            category_id = VALUES(category_id)
    """
    isbn = line['isbn'].strip()

# 지수형으로 들어온 경우 처리
    if 'E' in isbn or 'e' in isbn:
        isbn = '{:.0f}'.format(float(isbn))  # 9791170612759 형태로 변환
    price = str(line['price']).strip()

    values = (
        isbn,
        line['title'],
        line['author'],
        line['publisher'],
        int(price) if price else 0,
        line['discount_percent'] if line['discount_percent'] else None,
        line['pub_date'],
        "ACTIVE", 
        None if line['page_count'] in ('준비중', None) else line['page_count'],
        "Korean",
        line['description'] if line['description'] else None,
        line['cover'] if line['cover'] else None,
        category_id
    )

    cursor.execute(query, values)

csv_file.close()   
conn.commit()
cursor.close()
conn.close()