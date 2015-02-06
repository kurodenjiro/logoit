# LogoIt <img src="https://raw.githubusercontent.com/yieme/logoit/master/logo.jpg" align="right">

Logo Image Builder

# Install

```js
npm install logoit --save
```

# Usage

Logos are built up as a series of layers each with an increased ```z-index```

```domain/[pixels/]layer/layer2/.../layerN[.format]```

- ```pixels```: size in pixels, default 256. Same as: width:<pixels>px; height:<pixels>px
- ```layer```: layer details
- ```format```: currently on ```.png``` is supported

## Options

- ```l:<language>```: Set languge. default: ```l:en```
- ```s:<style>```: Set style. default: ```s:background:yellow;color:black```
- ```b:<color>```: Shorthand for ```s:background-color:<color>```
- ```c:<color>```: Shorthand for ```s:color:<color>```
- ```o:<opacity>```: Shorthand for ```s:opacity:<opacity>```
- ```ff:<font-family>```: Shorthand for ```s:font-family:<font-family>```
- ```fw:<font-weight>```: Shorthand for ```s:font-weight:<font-weight>```
- ```fs:<font-style>```: Shorthand for ```s:font-style:<font-style>```
- ```f:<shorthand>```: Special font shorthands, see: f:shorthand below
- ```p:<percent>```: Padding, default is ```p:5```
- ```<percent>%```: Slide in percentage
- ```tl[:percent]```: New Top Left layer, optional size percentage
- ```tc[:percent]```: New Top Center layer, optional size percentage
- ```tr[:percent]```: New Top Right layer, optional size percentage
- ```ml[:percent]```: New Middle Left layer, optional size percentage
- ```mc[:percent]```: New Middle Center layer, optional size percentage
- ```mr[:percent]```: New Middle Right layer, optional size percentage
- ```bl[:percent]```: New Bottom Left layer, optional size percentage
- ```bc[:percent]```: New Bottom Center layer, optional size percentage
- ```br[:percent]```: New Bottom Right layer, optional size percentage
- ```t:<text>```: Add text to layer. ex: ```t:JS```
- ```i:<src or common>```: Add image to layer. Recommend square transpart .png. See [Common Images](https://raw.githubusercontent.com/yieme/logoit/master/images.json) for list
- ```fa:<name>[,name...]>```: Add [Font Awesome Icon](https://fontawesome.io/icons/) to layer
- ```dev:<name>[,name...]>```: Add [Devicon](https://vorillaz.github.io/devicons/#/cheat) to layer
- ```fi:<name>[,name...]>```: Add [Foundation Icon](http://zurb.com/playground/foundation-icon-fonts-3) to layer
- ```flag:<country_code>```: Add [Flag Icon](https://lipis.github.io/flag-icon-css/) to layer
- ```md:<name>```: Add [Material Design Icon](https://zavoloklom.github.io/material-design-iconic-font/icons.html) to layer
- ```gf:<name>```: Select [Google Font](https://www.google.com/fonts). Case sensitive, ex: ```Logster```

### f:shorthand

- ```b```: ```fw:bold```
- ```i```: ```fs:italic```

## Future

- ```i:<img_src>```: Add image (path without https://). Ex: ```i:domain.com/img/sample.png```
- ```h:<img_src>```: Add image (path without http://). Ex: ```h:domain.com/img/sample.png```

## Common Images

- ```nodejs```:

# License: MIT
