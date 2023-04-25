---
layout: page
title: Ajian Sushi Mobile App
permalink: /
---

## Goals
1. Build Presentable app with information from client's website

2. Build a backend to allow users and simple modification of app data

3. Deploy the app to the iOS App Store

## Tools / APIs / Frameworks
- React Native
    - Open-source mobile app dev framework created by Facebook
    - Allows traditional React framework to be used for mobile apps
    - High-performance, responsive mobile applications that feel like a "native" application, but are written in JavaScript
    - Allows for reuse of code across platforms (Android, iOS)
- Expo
    - Built on top of React Native
    - Set of tools to allow for easy building of mobile apps for iOS and Android
    - Provides development environment with preconfigured settings, removing the hassle of setup and configuration
    - Set of pre-built UI components
    - Built-in simulator (Expo Go) for testing app during development
- Firebase
    - Backend-as-a-Service platform provided by Google
    - Provides user authentication to allow for account creation / login functionality 
    - Realtime database to store additional user data, as well as generic data about the restaurant
    - Free tier (Spark plan) allows for lots of functionality at low cost

## Experience
The overall experience of our app can be divided into the following pages which can be navigated to via the bottom navigation bar. Since this is a mobile app, an example would be the user opens the app which navigates them to the Home page. They can they click on 'Order Now' to place an order through the restaurant's payment processor, Skytab. The user might want to first view the Menu tab to view their options before placing an order via the web. 

Alternatively, the user could navigate to the account page and log in to their account to redeem their free roll that they received upon downloading the app and creating the account. This reward can only be redeemed in-store by presenting to a cashier. 
- Home Page
    - Simple UI with Ajian logo and text
    - Mobile ordering button to open the restaurant's existing ordering URL in-app
    - Social media icons to open Ajian's Facebook, Twitter, and Instagram profiles
- Menu Page
    - Contains all menu and nutritional information for food offered by Ajian
    - Various pages including:
        - Roll Options  
            - Provides the user with options for build-your-own rolls
        - Rolls
            - Displays pre-existing rolls offered by the restaurant
        - Sides
            - Side dish offerings including soups, salads, etc.
        - Fried Rice
            - Fried rice and additional toppings
        - Drinks
            - Pricing for fountain and bottled drinks
        - Nutrition
            - Nutrition information for various ingredients offered by the restaurant
- Hours Page
    - Interactive map displaying the location of the restaurant
    - Button to open directions to Ajian in maps app
    - List of Ajian's current hours by day of week
- Announcements Page
    - Lists current announcements that can be updated by the restaurant owner via the separate admin dashboard site
- Account Page
    - Allows the user to create an account to receive a free sushi roll of their choice
    - Users must verify their phone number prior to creating an account to receive the reward
        - This verification is done using Firebase reCAPTCHA
    - User can update their account information including Name, Email, Phone Number
    - Additional rewards functionality TODO

## Team Members
- Erik Buinevicius
- Chris Moorhouse
- Emily Lucas
- Nick Callahan