# Oba/Browser-technologies
In this document I will apply some browser-technologies cases
towards my code.  

:fire:[LINK](https://sam-guliker.github.io/oba/):fire: to the project.
[![https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f](https://i.gyazo.com/827df2002f9a1fcd478e2115be8c1c3f.gif)](https://gyazo.com/827df2002f9a1fcd478e2115be8c1c3f)  

## Progressive Enhancement
With this list I will try to make my code more accessible and useful for every user.

### The list:
* Images
* Custom fonts
* Javascript
* Colours
* Broad band
* Cookies
* localStorage
* Mouse/trackpad

## Images.
I'm not using any images for this webpage.    
But the stuff I can do for it is for example bringing  alt tags towards the code and maybe some aria labels if  I want to give some extra information.  

### Alt tag.
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

## Testing
![formobile](images/mobiletest.png)
![fordesktop](images/desktop.png)

## Device lab

### License
Copyright © 2018 Sam Guliker. Released under the [MIT license](https://opensource.org/licenses/MIT)
