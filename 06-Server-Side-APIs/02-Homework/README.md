# 06 Server-Side APIs: Weather Dashboard

1. The Weather Dashboard can be used to find the weather forecast of any city in the world.
2. You can search for any city such as "Paris, France" or "Athens, Greece" or "Athens, GA" or simply "Atlanta" or "houston".
3. As you search for cities, the cities will be added to the list on the left of the page. This list is persitant. 
4. You can simply click on the cities from the list to get the weather forecast for those cities.
5. The forecast will display 3 sets of results
    a. Current Weather Details
    b. Daily Forecast for the next 8 days
    c. Hourly Forecast for the next 48 hours

How it is done:
1. I am getting the longitude and lattidude details from opencagedata.com.
2. Using the these details, I am getting the weather forecast data from openweathermap.org.
