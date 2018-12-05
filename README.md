# Template Creator
This project has been created with the purporse to skip having to write manually the CFM and SCSS markups for new website elements.

* [Template Creato Website](http://markclausnunes.com/template-creator/) 

## Getting Started
### Installing
Check node version:
```
node -v
```

Install node files in the folder:
```
npm init
```

Install sass and add dependencies code on the package.json file:
```
npm install node-sass --save-dev
```

If I got site files built with sass, it will install all the node files that are missing:
```
npm install
```

Compile Sass to Css
```
npm run compile:sass
```

Install Automatically reloading a page on files change
```
sudo npm install live-server -g
```
## Built With

* JavaScript
* SCSS
* HTML

## Author

* **Mark Claus Nunes**

## Acknowledgments

* Inspiration * [Vincent Wings - Template Creator](https://github.com/VincentWings) 
* Drag and Drop code source * [Jeremy Bartels - Drag & Drop From Scratch](https://codepen.io/jbartels/pen/yPemMB)
