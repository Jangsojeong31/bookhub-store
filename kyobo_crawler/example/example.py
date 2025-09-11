# for page in range(2, 6):
#     url = "http://page=" + str(page)
#     url = f"http://page={page}"
#     print(url)

######################

import pandas as pd


names = ['user1', 'user2', 'user3', 'user4', 'user5']

data = [{'name': name} for name in names]

df = pd.DataFrame(data)

file_path = 'example.csv'

df.to_csv(file_path, index=False, encoding='utf-8-sig')

conn = MySQLdb.connect(
  user="root",
  password="susan429@",
  host="localhost",
  db="bookhub_store_db",
  charset="utf8mb4"
)

cursor = conn.cursor()

csv_file = open('./example.csv', 'r', encoding='UTF8')
fReader = csv.DictReader(csv_file)

for line in fReader:
    query = "INSERT INTO example (name) VALUES (%s)"