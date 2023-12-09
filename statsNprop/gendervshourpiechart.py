import pandas as pd
from matplotlib import pyplot as plt


def genderhvshourpiechart(whichactivity, whichgender):
    data = pd.read_csv('data1komputer.csv')
    appscount = {}
    appscountmale = {}
    appscountfemale = {}
    for index, row in data.iterrows():
        usage = row['usage']
        if usage in appscount:
            appscount[usage] += 1
        else:
            appscount[usage] = 1
        if row['gender'] == "Laki-laki":
            if usage in appscountmale:
                appscountmale[usage] += 1
            else:
                appscountmale[usage] = 1
        elif row['gender'] == "Perempuan":
            if usage in appscountfemale:
                appscountfemale[usage] += 1
            else:
                appscountfemale[usage] = 1
    labels = []
    slices = []
    if whichgender == "Laki-laki":
        labels = list(appscountmale.keys())
        slices = list(appscountmale.values())
    elif whichgender == "Perempuan":
        labels = list(appscountfemale.keys())
        slices = list(appscountfemale.values())
    elif whichgender == "Laki-laki dan Perempuan":
        labels = list(appscount.keys())
        slices = list(appscount.values())
    plt.pie(slices, labels=labels, autopct='%1.1f%%', wedgeprops={'edgecolor': 'black'})
    plt.title(f"Rata-rata jumlah jam dihabiskan untuk {whichactivity} responden {whichgender}")
    plt.tight_layout()
    plt.show()


genderhvshourpiechart('komputer', 'Perempuan')
