# Instructions

If a build fails you can check logs at: <https://voteflux.org/build-logs/>

## Dependencies

### Docker

If you have docker installed just run `./dev-docker.sh` - that should get you developing straight away (well, minus the minutes required to build and install deps)

### Manually

We presume your environment is OSX.

* Install `node`, `npm`, `ruby`, `yarn` first
 * macOS: `brew install ruby node npm yarn`
 * Ubuntu: `sudo apt install ruby nodejs` (aside: does this include `npm`?)
 * Ubuntu: Note: you'll need to install yarn yourself
 * Fedora: `redhat-rpm-config`
* Install dependencies: `./dev-install-deps.sh` or if that doesn't work: `gem install bundle` then `bundle install` then `yarn install`

Note: Node v11 doesn't seem to work building for some deps

## Development

* To run a development copy for everything run `./dev-watch-all.sh` or `npm run flux`
* To simulate a build run `npm run build`

### Spellcheck

To run the interactive spellchecker: `npm run spellcheck`.
By default it runs in interactive mode with suggestions.
Run `npm run spellcheck -- -x` to disable suggestions, which is much faster.

## Deployment

* Deployments automatically happen via the `master` branch.
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

* macOS: `brew install ruby` for ruby
* `gem install bundle` for bundle
* `bundle install` to install jekyll dependencies
* `bundle exec jekyll serve --watch` to run a dev server for just jekyll stuff.
* `./dev-docker.sh` to run jekyll and webpack in a docker container
* React is used for the sign-up form but not for anything else.
* Some widgets are written in Elm

## Kip's notes on contributing

MK note: if you need to use `sudo` to run `./dev-docker.sh` you should add yourself to the `docker` group (or google what to do for your OS); typically you shouldn't need sudo for docker, or at least it's good not to run it like that on your dev machine.

* Install git
* Install Docker
* Get an IDE (I use Atom)
* fork the flux-website
* https://github.com/voteflux/flux-website-v2 - use the fork button
* clone your copy onto your machine. For me in a terminal it's:
* git clone https://github.com/KipCrossing/flux-website-v2
* Read the README and run: sudo ./dev-docker.sh
* Once the file has run it will tell you the server address. for me it was: http://0.0.0.0:9000/
* Paste that into your web browser
* Open the flux-website repo as a project in your IDE
* Make changes
* in terminal:
* git add .
* git commit -m "Write a commit message"
* git push
* Go to your repo on GitHub and make a pull request
* This will help with the Pull Request https://github.com/voteflux/flux-docs/blob/master/docs/contributing/index.rst

## CICD Notes

* Changes to bundler/ruby (maybe node stuff too) might break the build process due to docker volumes. Removing the volumes on the docker host seems to fix.
* If CICD stuff doesn't happen then things are broken, please contact @XertroV
