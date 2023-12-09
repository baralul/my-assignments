import pandas as pd
from matplotlib import pyplot as plt


def genderhvshourpiechart(whichactivity, whichgender):
    data = pd.read_csv('data1komputer.csv')
    male = []
    female = []
    both = []
    for index, row in data.iterrows():
        both.append(row)
        if row['gender'] == "Laki-laki":
            male.append(row)
        elif row['gender'] == "Perempuan":
            female.append(row)

    appscount = {}
    for index, row in data.iterrows():
        usage = row['usage']
        if usage in appscount:
            appscount[usage] += 1
        else:
            appscount[usage] = 1
    labels = list(appscount.keys())
    slices = list(appscount.values())
    plt.pie(slices, labels=labels, autopct='%1.1f%%', wedgeprops={'edgecolor': 'black'})
    plt.title(f"Rata-rata jumlah jam dihabiskan untuk {whichactivity} responden {whichgender}")
    plt.tight_layout()
    plt.show()

genderhvshourpiechart('komputer', 'Perempuan')
