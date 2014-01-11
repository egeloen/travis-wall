# README

Hey everyone! I'm Travis Wall, a [SaaS](http://en.wikipedia.org/wiki/Software_as_a_service) which gives you feedbacks
about your [Travis](https://travis-ci.org/)!

## Install me

My installation process is based on [Npm](https://npmjs.org/), a dependency manager for [NodeJS](http://nodejs.org).
So, first, you need to install it on your system. After, install my dependencies:

``` bash
$ npm install
```

At the end, the `node_modules` directory should have been created...

## Build me

Once my dependencies are well installed, you need to build me because my source code can not work as it is. My building
process and many other processes are managed by [Grunt](http://gruntjs.com/), a task manager for
[NodeJS](http://nodejs.org):

``` bash
$ grunt dist
```

Now, the `dist` directory should wrap me. Basically, I'm just a set of HTML/JS/CSS and image files which can be
deployed on any web server :)

## Run me

Because I'm an angular application, I can't be ran like simple HTML files... To ease your play with me, I'm shipped
with an ExpressJS web server which can be ran as simple as the following command:

``` bash
$ grunt serve
```

Then, you can play with me at [http://localhost:3000](http://localhost:3000).

## Test me

I'm unit tested with [Karma](http://karma-runner.github.io) and [Jasmine](http://pivotal.github.io/jasmine/):

``` bash
$ grunt test
```

## Enhance me

Like all open source projects, I love contributors! If you'd like to contribute, feel free to propose a PR!

## License

I'm under the MIT license. For the full copyright and license information, please read the
[LICENSE](https://github.com/egeloen/travis-wall/blob/master/LICENSE) file that was distributed with this soure code.
