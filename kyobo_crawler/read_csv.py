import pandas as pd

# CSV 불러오기
df = pd.read_csv('kyobo_books.csv')

# # 처음 5행 확인
# print(df.head())

# # 컬럼 확인
# print(df.columns)

# 데이터 전체 확인 (작으면)
print(df)
