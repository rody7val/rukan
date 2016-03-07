### Rukan website

#####Setup for developers

* Requirements
    1. [Node.js](http://nodejs.org/)
    2. [MongoDB](http://www.mongodb.com/)

You should have a MongoDB server running.

Install global node dependencies `Grunt` and `Bower`

    npm install -g grunt-cli bower

Clone the git repository and cd into it

    git clone https://github.com/rody7val/rukan
    cd rukan/

Install node dependencies based on the `package.json` configuration

    npm install

Install front-end dependencies with Bower based on the `bower.json` configuration

    bower install

Copy all `public/*` configuration files into place

    grunt

Start the server

    npm start

Then open a browser and go to:

    http://localhost:8080