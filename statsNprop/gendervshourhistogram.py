import pandas as pd
from matplotlib import pyplot as plt

#plt.style.use('fivethirtyeight')

data = pd.read_csv('pcshour.csv')
bins = [2, 4, 6, 8, 10, 16]
plt.hist(data.phonehour, bins=bins, edgecolor='black')

"""
title = input("Insert the title: ")
plt.title(title)
xlabel = input("Insert the x-coordinate label: ")
plt.xlabel(xlabel)
ylabel = input("Insert the y-coordinate label: ")
plt.ylabel(ylabel)
"""
plt.title('Relasi antara jenis kelamin dan penggunaan hp')
plt.xlabel('Rata-rata penggunaan handphone per hari (dalam jam)')
plt.ylabel('Jumlah responden')

plt.tight_layout()

plt.show()