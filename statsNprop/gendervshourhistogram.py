import pandas as pd
from matplotlib import pyplot as plt


def genderhvshourhistogram(whichactivity, whichgender):
    data = pd.read_csv('pcshour.csv')
    bins = [0, 2, 4, 6, 8, 10, 12]
    male = []
    female = []
    both = []
    for index, row in data.iterrows():
        both.append(row[whichactivity])
        if row['gender'] == "Laki-laki":
            male.append(row[whichactivity])
        elif row['gender'] == "Perempuan":
            female.append(row[whichactivity])
    plt.title(f"Rata-rata jumlah jam dihabiskan untuk {whichactivity} responden {whichgender}")
    plt.xlabel(f"Rata-rata jumlah jam dihabiskan untuk {whichactivity} per hari")
    plt.ylabel('Jumlah responden')
    if whichgender == "Laki-laki":
        plt.hist(male, bins=bins, edgecolor='black')
    elif whichgender == "Perempuan":
        plt.hist(female, bins=bins, edgecolor='black')
    elif whichgender == "Laki-laki dan Perempuan":
        plt.hist(both, bins=bins, edgecolor='black')
    plt.show()


genderhvshourhistogram('komputer', 'Laki-laki')
