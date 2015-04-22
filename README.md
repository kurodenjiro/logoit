# LogoIt <img src="https://raw.githubusercontent.com/yieme/logoit/master/img/logo.jpg" align="right" height="185" border="0">

Logo Image Builder

# Install

```sh
npm install logoit --save
```

# Run server

```sh
npm start
```

# Usage

Logos are built up as a series of layers each with an increased ```z-index```

**domain/[pixels/]layer/layer2/.../layerN[.format]**

- ```pixels```: size in pixels, default 256. Same as: width:<pixels>px; height:<pixels>px
- ```layer```: layer details
- ```format```: currently only ```.png``` is supported

## Examples

<img src="https://raw.githubusercontent.com/yieme/logoit/master/img/logo.jpg" align="right" width="80" border="0">

[LogoIt](http://localhost:3000/b:yellow--gf:Lobster--f:b--mc:100--o:0.3--p:0--i:nodejs--tc:50--o:1--p:5--fa:photo--bc:35--p:10--LogoIt--/logoit.png)

```
http://localhost:3000/b:yellow--gf:Lobster--f:b--mc:100--o:0.3--p:0--i:nodejs--tc:50--o:1--p:5--fa:photo--bc:35--p:10--LogoIt--/logoit.png
```
<img src="https://raw.githubusercontent.com/yieme/logoit/master/img/invalid_image.png" align="right" width="80" border="0">

[Invalid Image](http://localhost:3000/b:white--tc:46--p:12--fa:picture-o--bc:14--p:10--gf:Share%20Tech%20Mono--Invalid%20Image--tc:70--p:1--c:990000--o:0.6--fa:ban--/img.png)

```
http://localhost:3000/b:white--tc:46--p:12--fa:picture-o--bc:14--p:10--gf:Share Tech Mono--Invalid Image--tc:70--p:1--c:990000--o:0.6--fa:ban--/img.png
```

<img src="https://raw.githubusercontent.com/yieme/logoit/master/img/not_found.png" align="right" width="80" border="0">

[Not Found](http://localhost:3000/p:10--tc:60--fa:frown-o--bc:15--Not%20Found--/img.png)

```
http://localhost:3000/p:10--tc:60--fa:frown-o--bc:15--Not Found--/img.png
```

CDNall

```
http://localhost:3000/bc:49--c:navy--fa:download--tc:49--fa:globe--/cdnall.png
```

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
- ```fa:<name>[,name...]>```: Add [Font Awesome Icon](http://fortawesome.github.io/Font-Awesome/icons/) to layer
- ```dev:<name>[,name...]>```: Add [Devicon](https://vorillaz.github.io/devicons/#/cheat) to layer
- ```fi:<name>[,name...]>```: Add [Foundation Icon](http://zurb.com/playground/foundation-icon-fonts-3) to layer
- ```flag:<country_code>```: Add [Flag Icon](https://lipis.github.io/flag-icon-css/) to layer
- ```md:<name>```: Add [Material Design Icon](https://zavoloklom.github.io/material-design-iconic-font/icons.html) to layer
- ```gf:<name>```: Select [Google Font](https://www.google.com/fonts). Case sensitive, ex: ```Logster```
- ```i:<img_src>```: Add image. Ex: ```i:http://domain.com/sample.png```

### f:shorthand

- ```b```: ```fw:bold```
- ```i```: ```fs:italic```


## Common Images

Shortcut for common images, like ```nodejs```

Click [here to see a complete list](https://github.com/yieme/logoit/blob/master/images.json)

# License: MIT
