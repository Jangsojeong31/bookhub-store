from datetime import datetime
import os
import re
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By

# 드라이버 시작
driver = webdriver.Chrome()

data = []

# 크롤링할 페이지
for page in range(1, 2):
    url = ""
    if page == 1:
        url = "https://store.kyobobook.co.kr/bestseller/total/monthly"
    else:
        url = f"https://store.kyobobook.co.kr/bestseller/total/monthly?page={page}"

    driver.get(url)
    time.sleep(3)  # 페이지 로딩 대기

    # 각 책 아이템 선택
    book_elements = driver.find_elements(By.CSS_SELECTOR, "li.mt-9.flex")
    book_links = []

    for book in book_elements:
        try:
            link_elem = book.find_element(By.CSS_SELECTOR, 'div.relative.flex-shrink-0 a.prod_link')

            # 상세 페이지 url
            detail_url = link_elem.get_attribute('href')
            print(detail_url)

            book_links.append(detail_url)
        except Exception as e:
            print("책 링크 수집 실패:", e)
            continue

    for detail_url in book_links:
        # 상세 페이지 이동
        driver.get(detail_url)
        time.sleep(3)

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')

        # 표지
        cover_tag = soup.select_one('div.portrait_img_box img')
        cover_url = cover_tag['src'] if cover_tag else None

        # 제목
        title_tag = soup.select_one('span.prod_title')
        title = title_tag.get_text(strip=True) if title_tag else None

        # 저자 / 출판사 / 출판년도
        author_tag = soup.select_one('.author a')
        author = author_tag.get_text(strip=True) if author_tag else None

        prod_tag = soup.select_one('div.prod_info_text')
        if prod_tag:
            pub_date_text = prod_tag.get_text(strip=True)
            match = re.search(r"(\d{4})년\s*(\d{2})월\s*(\d{2})일", pub_date_text)
            if match:
                year, month, day = match.groups()
                pub_date = f"{year}-{month}-{day}"
            else:
                pub_date = None

            publisher_tag = prod_tag.select_one('a')
            publisher = publisher_tag.text.strip() if publisher_tag else None
        else:
            pub_date = None
            publisher = None

        # 가격 / 할인율
        discount_tag = soup.select_one('div.prod_price span.percent')
        discount_percent = discount_tag.text.strip().replace("%", "") if discount_tag else None

        price_tag = soup.select_one('div.prod_price span.val')
        price = price_tag.text.strip().replace(",", "").replace("원", "") if price_tag else None

        # ISBN / 페이지수
        isbn, page_count = None, None
        info_tag = soup.select('tbody td')
        if len(info_tag) >= 1:
            isbn = info_tag[0].text.strip()
        if len(info_tag) >= 3:
            page_count = info_tag[2].text.strip().replace("쪽", "")

        # 카테고리
        category_type, parent_category, category_name = None, None, None
        try:
            category_links = soup.select('li.category_list_item a.intro_category_link')
            if len(category_links) >= 3:
                category_type = category_links[0].text.strip()
                parent_category = category_links[1].text.strip()
                category_name = category_links[2].text.strip()
        except Exception as e:
            print("카테고리 수집 실패:", e)

        # 설명
        description_tag = soup.select('div.intro_bottom div.info_text')
        description = description_tag[0].get_text(strip=True).replace('"', "") if len(description_tag) >= 1 else None
        if len(description_tag) >= 2:
            description = description_tag[1].get_text(strip=True).replace('"', "")
        print(description)

        data.append({
            "crawled_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "isbn": isbn,
            "title": title,
            "cover": cover_url,
            "author": author,
            "publisher": publisher,
            "pub_date": pub_date,
            "price": price,
            "discount_percent": discount_percent,
            "category_type": category_type,
            "category_name": category_name,
            "parent_category": parent_category,
            "page_count": page_count,
            "description": description
        })

# DataFrame 생성 후 CSV 저장
df = pd.DataFrame(data)

file_path = 'kyobo_books.csv'

# 파일이 이미 있는지 확인
if not os.path.isfile(file_path):
    # 없으면 헤더 포함 덮어쓰기
    df.to_csv(file_path, index=False, encoding='cp949', mode='w')
else:
    # 이미 있으면 헤더 제외하고 추가하기
    df.to_csv(file_path, index=False, encoding='cp949', mode='a', header=False)

# # SQLite 연결
# conn = sqlite3.connect('books.db')

# df.to_sql('books', conn, if_exists='replace', index=False)

# print(pd.read_sql('SELECT * FROM books', conn))

# 드라이버 종료
driver.quit()
