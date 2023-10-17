import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('modifieddata.csv')
plt.plot(data.usgdp, data.ushours)
plt.plot(data.sgdp, data.shours)
plt.plot(data.camgdp, data.camhours)
plt.plot(data.mgdp, data.mhours)
plt.plot(data.ggdp, data.ghours)
plt.plot(data.bgdp, data.bhours)
plt.plot(data.skgdp, data.skhours)
plt.plot(data.jgdp, data.jhours)
plt.plot(data.indogdp, data.indohours)
plt.plot(data.indigdp, data.indihours)

plt.scatter(data.usgdp, data.ushours, label="United States", marker='.')
plt.scatter(data.sgdp, data.shours, label="Switzerland", marker='.')
plt.scatter(data.camgdp, data.camhours, label="Cambodia", marker='.')
plt.scatter(data.mgdp, data.mhours, label="Myanmar", marker='.')
plt.scatter(data.ggdp, data.ghours, label="Germany", marker='.')
plt.scatter(data.bgdp, data.bhours, label="Brazil", marker='.')
plt.scatter(data.skgdp, data.skhours, label="South Korea", marker='.')
plt.scatter(data.jgdp, data.jhours, label="Japan", marker='.')
plt.scatter(data.indogdp, data.indohours, label="Indonesia", marker='.')
plt.scatter(data.indigdp, data.indihours, label="India", marker='.')

# Add labels for each data point
plt.annotate(str(data.usyear[0]), (data.usgdp[0], data.ushours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.usyear[len(data.usyear) - 1]), (data.usgdp[len(data.usyear) - 1], data.ushours[len(data.usyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.syear[0]), (data.sgdp[0], data.shours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.syear[len(data.syear) - 1]), (data.sgdp[len(data.syear) - 1], data.shours[len(data.syear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.myear[3]), (data.mgdp[3], data.mhours[3]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.myear[len(data.myear) - 1]), (data.mgdp[len(data.myear) - 1], data.mhours[len(data.myear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.gyear[0]), (data.ggdp[0], data.ghours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.gyear[len(data.gyear) - 1]), (data.ggdp[len(data.gyear) - 1], data.ghours[len(data.gyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.jyear[0]), (data.jgdp[0], data.jhours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.jyear[len(data.jyear) - 1]), (data.jgdp[len(data.jyear) - 1], data.jhours[len(data.jyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.gyear[1]), (data.ggdp[1], data.ghours[1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.gyear[len(data.gyear) - 1]), (data.ggdp[len(data.gyear) - 1], data.ghours[len(data.gyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
for i in range(len(data.skyear)):
    plt.annotate(str(data.skyear[i]), (data.skgdp[i], data.skhours[i]), textcoords="offset points", xytext=(0, 10),
                 ha='center')
plt.annotate(str(data.indoyear[0]), (data.indogdp[0], data.indohours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.indoyear[4]), (data.indogdp[4], data.indohours[4]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.indoyear[8]), (data.indogdp[8], data.indohours[8]), textcoords="offset points", xytext=(0, 10), ha='center')

plt.annotate(str(data.indoyear[len(data.indoyear) - 1]), (data.indogdp[len(data.indoyear) - 1], data.indohours[len(data.indoyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.indiyear[0]), (data.indigdp[0], data.indihours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.indiyear[len(data.indiyear) - 1]), (data.indigdp[len(data.indiyear) - 1], data.indihours[len(data.indiyear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.byear[0]), (data.bgdp[0], data.bhours[0]), textcoords="offset points", xytext=(0, 10), ha='center')
plt.annotate(str(data.byear[len(data.byear) - 1]), (data.bgdp[len(data.byear) - 1], data.bhours[len(data.byear) - 1]), textcoords="offset points", xytext=(0, 10), ha='center')
for i in range(len(data.camyear)):
    plt.annotate(str(data.camyear[i]), (data.camgdp[i], data.camhours[i]), textcoords="offset points", xytext=(0, 10),
                 ha='center')


# Set axis labels
plt.xlabel('GDP per capita')
plt.ylabel('Annual working hours per worker')

# Set axis limits and ticks
plt.xlim(1000, 100000)
plt.ylim(1400, 3000)
plt.xscale("log")
plt.xticks([1000, 2000, 5000, 10000, 20000, 50000, 100000], [1000, 2000, 5000, 10000, 20000, 50000, 100000])
plt.yticks(range(1400, 3001, 200))

# Add a legend
plt.legend()

# Add a title
plt.title('Annual working hours vs. GDP per capita over time')

# Display the plot
plt.grid(True)
plt.tight_layout()
plt.show()
