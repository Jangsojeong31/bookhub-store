import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver

driver = webdriver.Chrome()
# 2. 크롤링할 페이지
url = "https://store.kyobobook.co.kr/bestseller/total/annual"
driver.get(url)
time.sleep(3)  # 페이지 로딩 대기

# 3. HTML 가져오기
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
# print(soup.prettify())

# 4. 각 책 아이템 선택
items = soup.select("li.mt-9.flex")  # li 단위

data = []

for item in items:
    # 표지 이미지
    cover_tag = item.select_one('div.relative.flex-shrink-0 a.prod_link img')
    cover = cover_tag['src'] if cover_tag else None

    # 제목
    title_tag = item.select_one('a.prod_link.line-clamp-2')
    title = title_tag.text.strip() if title_tag else None

    # 저자 / 출판사 / 출판일
    info_tag = item.select_one('div.line-clamp-2.text-gray-800')
    if info_tag:
        info_text = [x.strip() for x in info_tag.get_text(separator="|")
                      .split("|")]
        author = info_text[0] if len(info_text) > 0 else None
        publisher = info_text[1] if len(info_text) > 1 else None
        pub_date = info_text[2] if len(info_text) > 2 else None
    else:
        author = publisher = pub_date = None

    # 가격
    price_tag = item.select_one('div.flex.flex-row.flex-wrap span.font-bold')
    price = price_tag.text.strip() if price_tag else None

    # 설명
    desc_tag = item.select_one('p.prod_introduction')
    description = desc_tag.text.strip() if desc_tag else None

    data.append((cover, title, author,
                publisher, pub_date, price, description))

# 5. DataFrame 생성 후 CSV 저장
df = pd.DataFrame(data, columns=[
    'Cover', 'Title', 'Author', 'Publisher',
    'PublicationDate', 'Price', 'Description'
    ])
df.to_csv('kyobo_books.csv', index=False, encoding='utf-8-sig')

# 6. 드라이버 종료
driver.quit()