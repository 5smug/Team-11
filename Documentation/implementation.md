# Project Structure

## Main Folder/

- **Code for website (Folder)/**
  - style (Folder)/
    - script.js
    - style.css
  - index.html

- **Documentation (Folder)/**
  - design.md
  - implementation.md
  - planning.md
  - requirements.md
  - testing.md

# Software Architecture

![alt text](image.png)

# Bristol Open Data Api

* Local Authorities API
  - Get data/information about the local authorities in Bristol such as : Location, Name, Area Code, etc...
  - Out Fields Used : NAME, AREA_CODE, LA_AREA, WEBSITE, Shape_Area, Shape_Length
  - Query URL : https://maps2.bristol.gov.uk/server2/rest/services/ext/boundaries/FeatureServer/0/query?where=1%3D1&outFields=NAME,AREA_CODE,LA_AREA,WEBSITE,Shape__Area,Shape__Length&outSR=4326&f=json
  - This API will be used so that we can implement the map with the data from Bristol Open Data into our website for users to be able to search for local authorities in the wanted area.
