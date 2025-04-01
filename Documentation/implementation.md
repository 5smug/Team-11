# Introduction

* Overview of the System
  - This system uses the Bristol Open Data to retrieve crucial information needed for the website to work such as the basic information (location, name, area code, website) of all the local authorities in bristol
  to help people find the nearest local authority effortless with their up to date information.

* Datasets
  - The system uses a local authority API which provides
    - Location
    - Name
    - Area Code
    - Website

* Issues
  - The data is slightly confusing to read as a user

* Configuration Data
  - The API is needed for the users to be able to see the map and information about the places
  - It also adds filters to limit results given

# Project Structure

**Main Folder/**

 # Code for website (Folder)/**
  - style (Folder)/
    - script.js
    - style.css
  - index.html

 # Documentation (Folder)/**
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
