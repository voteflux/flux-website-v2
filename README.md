# Instructions

#### Development options
- To run dev environment for the jekyll site at the project root run `$ npm run flux`
- To run dev environment for `react-signup` at the root of `react-signup` run `$ npm run flux`
- To build the complete site including `react-signup` at the root level run `$ npm run build` this  will clean and build jekyll after compiling sass and the react app into the `_site folder`

#### Deployment
- Simply push to `master` of the `vote-flux-v2` repo: https://github.com/voteflux/vote-flux-v2 this will use a webhook to trigger a build by netlify



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
