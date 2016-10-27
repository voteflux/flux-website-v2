# Instructions

## Dependencies

We presume your environment is OSX.

* Install `node`, `npm`, `ruby` first
 * macOS: `brew install ruby node npm`
 * ubuntu: `sudo apt install ruby nodejs` (aside: does this include `npm`?)
* Install dependencies: `gem install bundle` then `bundle install` then `npm install`

## Development

* To run a development copy for everything run `npm run flux`
* To simulate a build run `npm run build`

## Deployment

* Deployments atomatically happen via the `master` branch.
* All merges require a PR.



<!-- 1. run npm install
2. To start dev environment run: $ `npm run flux`

## Don't edit files from _Sites folder

## _site folder  and it's contents are cleaned on site builds!!
The contents of `_site` are automatically cleaned, by default, when the site is built.

The `_site` folder should only be used as a staging area and to copy files from to your web server.

http://ricostacruz.com/til/relative-paths-in-jekyll.html

http://wolfslittlestore.be/2013/10/rendering-markdown-in-jekyll/

http://stackoverflow.com/questions/21976330/passing-parameters-to-inclusion-in-liquid-templates

http://stackoverflow.com/questions/26855552/jekyll-compiling-seems-way-too-slow


https://docs.shopify.com/themes/liquid/tags/control-flow-tags -->


#### Hints and Tips

`brew install ruby` for ruby

`gem install bundle` for bundle

`bundle install` to install dependencies

`bundle exec jekyll serve --watch` to run a dev server for just jekyll stuff.

React is used for the signup form but not for anything else.
