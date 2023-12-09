import pandas as pd
from matplotlib import pyplot as plt


def genderhvshouristogram(whichhour, whichgender):
    data = pd.read_csv('pcshour.csv')
    bins = [0, 2, 4, 6, 8, 10, 12]
    male = []
    female = []
    all = []
    for index, row in data.iterrows():
        all.append(row[whichhour])
        if row['gender'] == "Laki-laki":
            male.append(row[whichhour])
        elif row['gender'] == "Perempuan":
            female.append(row[whichhour])
    plt.title(f"Rata-rata jumlah jam dihabiskan untuk {whichhour} responden {whichgender}")
    plt.xlabel(f"Rata-rata jumlah jam dihabiskan untuk {whichhour} per hari")
    plt.ylabel('Jumlah responden')
    if whichgender == "Laki-laki":
        plt.hist(male, bins=bins, edgecolor='black')
    elif whichgender == "Perempuan":
        plt.hist(female, bins=bins, edgecolor='black')
    elif whichgender == "Laki-laki dan Perempuan":
        plt.hist(all, bins=bins, edgecolor='black')
    plt.show()


genderhvshouristogram('komputer', 'Laki-laki')
