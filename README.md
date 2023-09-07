# Tyres App

Tyre engineers need a web page to plan and track tyre sets usage of a car for a race weekend. 

On a race weekend, the tyre manufacturer supplies one car with a predefined number of tyre sets. A tyre set can be of three types: Soft (red), Medium (yellow) or Hard (white). One tyre set represents 4 tyres of the same type to be fitted to the car. 

- **1. Number of sets:** the number of tyre sets may vary for each race weekend. The tyre engineer will input on the web page how many sets of each type are available for the Race weekend. For example, in a normal race weekend, there are 13 total sets: 2xHard, 3xMedium and 8xSoft. 

- **2. Weekend sessions:** Race weekends have sessions when cars can run their tyre sets. The tyre engineer will input on the web page the expected sessions for the race weekend. For example, in a normal race weekend, there is a Free Practice 1, Free Practice 2, Free practice 3, Qualifying and Race session. Race session will always be on this list, and it will always be the last session. 

- **3. Returns:** After each session, excluding the Race session, tyre sets may have to be returned to the tyre manufacturer and never be used again in the race weekend. The tyre engineer will input on the web platform how many tyre sets must be returned after each session. For example, in a normal race weekend, 2 tyre sets must be returned after each Free Practice session and 1 tyre set must be returned after Qualifying. Any remaining set may be used for the Race session. 

The Tyre Engineer will input number of sets (1), weekend sessions (2) and returns (3) prior to a race weekend. These settings define a weekend format. The tyre engineers will be grateful if they can save the settings of a weekend format so that they can reuse them for race weekends with the same format. 

The Tyre Engineer should be able to plan the weekend by moving sets around sessions and decide which sets to return. See how this affects other sessions and most importantly visualise which sets are left for the Race session. It should be possible to track sets and, if possible, to see their state: new (not used in any session) or used (fitted at least once in any session). 

Develop the web app that provides Tyre Engineers with the desired tool. 
