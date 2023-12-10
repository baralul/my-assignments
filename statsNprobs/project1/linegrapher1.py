import matplotlib.pyplot as plt
import pandas as pd

data = pd.read_csv('modifieddata.csv')
plt.plot(data.usy, data.usp, label='United States')
plt.plot(data.sy, data.sp, label='Switzerland')
plt.plot(data.gy, data.gp, label='Germany')
plt.plot(data.myear, data.myear/data.mhours, label='Myanmar')
plt.plot(data.by, data.bp, label='Brazil')
plt.plot(data.ay, data.ap, label='Argentina')
plt.plot(data.ty, data.tp, label='Turkey')
plt.plot(data.sky, data.skp, label='South Korea')
plt.plot(data.cy, data.cp, label='Canada')
plt.plot(data.by, data.bp, label='Belgium')
plt.plot(data.say, data.sap, label='South Africa')
plt.plot(data.chy, data.chp, label='China')
plt.plot(data.indiay, data.indiap, label='India')
plt.plot(data.indony, data.indonp, label='Indonesia')
plt.plot(data.uky, data.ukp, label='United Kingdom')
plt.plot(data.camy, data.camp, label='Cambodia')
# Set axis labels
plt.xlabel('Year')
plt.ylabel('$/h (Dollar per hour)')

# Set axis limits and ticks
plt.xlim(1950, 2019)
plt.ylim(0, 90)
plt.xscale("log")
plt.xticks([1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020], [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020])
plt.yticks(range(0, 90, 10))

# Add a legend
plt.legend()

# Add a title
plt.title('Productivity: output per hour worked')

# Display the plot
plt.grid(True)
plt.tight_layout()
plt.show()