# FlipBook.js

## Description

This is a fork of fchavonet's css-only web flipbook implementation, but using js to configure the flipbook, load assets, and trigger events. This hugely simplifies the necessary html and css, and makes it easier to ship and scale.

## File structure

```
flipbook.js/
├── src/                <-- the flipbook framework is built here
│   ├── flipbook.js
│   └── flipbook.css
├── assets/                 
│   └── pages/          <-- page images go here
│       └── 0.webp
|       └── 1.webp
|       └── ...
├── config.js           <-- this configures a single flipbook instance
├── index.html
```

Notice how framework files are seperate from implementation files. This means that a website that wishes to display several flipbooks across different pages we be structured like so:

```
/
├── src/                <-- the flipbook framework is built here
│   ├── flipbook.js
│   └── flipbook.css
├── flipbook1/
|   ├── index.html
│   ├── config.js       <-- configure flipbook 1 here
|   ├── assets/                 
|   │   └── pages/      <-- flipbook 1's page images go here
|   │       └── 0.webp
|   |       └── 1.webp
|   |       └── ...
├── flipbook2/
|   ├── index.html
│   ├── config.js       <-- configure flipbook 2 here
|   ├── assets/                 
|   │   └── pages/      <-- flipbook 2's page images go here
|   │       └── 0.webp
|   |       └── 1.webp
|   |       └── ...
├── ...  
├── index.html
```

Each subpage imports the framework files (`flipbook.*`), while being configured by their own `config.js`.

You can demo this application [here](https://yonmaor.com/flipbookjs). # TODO

## Credits
Forked From Fabien CHAVONET [@fchavonet](https://github.com/fchavonet)
This project was developed for the [Turner Hall Review](https://thecmcp.org/TurnerHall)'s website — check them out!
