import pandas as pd
from matplotlib import pyplot as plt


def genderhvshourhistogram(whichactivity, whichgender):
    data = pd.read_csv('project2/pcshour.csv')
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


def genderhvshourpiechart(whichactivity, whichgender):
    data = pd.read_csv('project2/data1komputer.csv')
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
    plt.title(f"Aktivitas paling sering dilakukan di {whichactivity} oleh responden {whichgender}")
    plt.tight_layout()
    plt.show()


def meanhourvsmeanhourpiechart(activity1, activity2):
    data = pd.read_csv('pcshour.csv')
    data[activity1].fillna(0, inplace=True)
    data[activity2].fillna(0, inplace=True)
    count1 = data[activity1].sum()
    count2 = data[activity2].sum()
    # .count() excludes NaN (Not a Number) values from the count
    count1n = data[activity1].count()
    count2n = data[activity2].count()
    avg1 = count1 / count1n if count1n != 0 else 0
    avg2 = count2 / count2n if count2n != 0 else 0
    averages = [avg1, avg2]
    labels = [f'{activity1} ({avg1:.1f} jam)', f'{activity2} ({avg2:.1f} jam)']
    plt.pie(averages, labels=labels, autopct='', wedgeprops={'edgecolor': 'black'})
    plt.title(f"Rata-rata waktu dihabiskan untuk {activity1} vs {activity2}")
    plt.tight_layout()
    plt.show()


def hourvshourscatterplot(activity1, activity2):
    data = pd.read_csv('project2/pcshour.csv')
    x = []
    y = []
    for index, row in data.iterrows():
        x.append(row[activity1])
        y.append(row[activity2])
    plt.title(f"Relasi antara waktu dihabiskan untuk {activity1} dan waktu {activity2}")
    plt.xlabel(f"Rata-rata jumlah jam dihabiskan untuk {activity1} per hari")
    plt.ylabel(f"Rata-rata jumlah jam dihabiskan untuk {activity2} per hari")
    plt.scatter(x, y, s=669)
    plt.show()


# genderhvshourhistogram('komputer', 'Laki-laki')
# genderhvshourpiechart('komputer', 'Laki-laki dan Perempuan')
# meanhourvsmeanhourpiechart('handphone', 'komputer')
# hourvshourscatterplot('handphone', 'tidur')
