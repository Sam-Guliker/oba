# Oba/Browser-technologies
In this document I will apply some browser-technologies cases
towards my code.  

:fire:[LINK](https://sam-guliker.github.io/oba/):fire: to the project.
[![https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f](https://i.gyazo.com/827df2002f9a1fcd478e2115be8c1c3f.gif)](https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f)  

## Progressive Enhancement
With this list I will try to make my code more accessible and useful for every user.  I made a list to try and tackle this subject.

## Tools
These are the tools I will be using to test my website for optimalization and accessibility.  

[developers.google.com](https://developers.google.com/speed/docs/insights/about?hl=en-US&utm_source=PSI&utm_medium=incoming-link&utm_campaign=PSI) Tests on speed and optimalization.  

[Sim Daltonism](https://itunes.apple.com/us/app/sim-daltonism/id693112260?mt=12) with this tool you can test on different colours.  
This way you can test if your website is still working for people that are colourblind.  

### The list:
* Cross-browser
* Images
* Custom fonts
* Javascript
* Colours
* Broad band
* Cookies
* localStorage
* Mouse/trackpad

## Cross-Browser
Testing on different browsers to check if my code still works.  
Works on chrome and safari. Firefox isn't working I need to debug it.

## Images
I'm not using any images for this webpage.    
But the stuff I can do for it is for example bringing  alt tags towards the code and maybe some aria labels if  I want to give some extra information.  

### Alt tag
An ALTernative text describing the image.

```HTML

  <img src="images/cat-image.svg" alt="This is a black fluffy cat.">

```

### Aria Labels
Accessible Rich Internet Applications (ARIA) can be used to help people with disabilities.


```HTML
  <button aria-label="Close" type="button" name="button">x</button>
```

## Fonts
I'm using the google web-fonts that are from another CDN.  
This means when the CDN server is down it will load the fallback fonts.  

![showing the cdn](images/webfonts.png)

### Alternative
You can load the fonts in from your own webpage.  

## Javascript
Trying my website without Javascript...  
Well this wont work :pensive:  The API loads in my data
and Javascript generates the map.

## Colours
Different colourblind tests using Sin Daltonism  

Deuteroanopia  

![first](images/1.png)  

Deuteranomaly  

![second](images/2.png)  

Protanopia  

![third](images/3.png)  

Protanomaly  

![fourth](images/4.png)  

Tritanopia  

![fifth](images/5.png)  

Tritanomaly

![sixth](images/6.png)  

## Broadband Internet
On fast 3g the map is rendered after 1s.  
![renderingfast](images/fast3g.png)  

On slow 3G the map is rendered on 4s.
![renderingslow](images/slow3g.png)  

## Cookies
I'm not using HTTP :cookie: , just make sure you keep the size  of the cookies as low as possible to minimize the impact on the user's response time.

## LocalStorage
Unfortunately I wasn't able to find anything to help me test this.

## Mouse/Trackpad
![marker](images/marker.png)
My webpage is not really accessible for tabbing at the moment.   
Maybe I can make it more tab-able so the user can tab  through all the items on the map.


## Testing with the tools
Testing using [developers.google.com]](https://developers.google.com/speed/docs/insights/about?hl=en-US&utm_source=PSI&utm_medium=incoming-link&utm_campaign=PSI)

for mobile  
![formobile](images/mobiletest.png)

for Desktop  
![fordesktop](images/desktoptest.png)

## Device lab

### License
Copyright © 2018 Sam Guliker. Released under the [MIT license](https://opensource.org/licenses/MIT)
