import pandas as pd
from matplotlib import pyplot as plt


def genderhvshourpiechart(whichactivity, whichgender):
    data = pd.read_csv('pcshour.csv')

slices = [120, 80, 30, 20]
labels = ['Sixty', 'Forty', 'Extra1', 'Extra2']
#colors = ['blue', 'red', 'yellow', 'green']
#explode = [0, 0, 0.1, 0]

plt.pie(slices, labels=labels, autopct='%1.1f%%', wedgeprops={'edgecolor': 'black'})

plt.title("this is the title")
plt.tight_layout()
plt.show()
