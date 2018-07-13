deeplearning4j-docs
===================

The documentation for Deeplearning4j and all of its libraries (DL4J, ND4J, Arbiter, DataVec, etc.) live in this repository.

## Developing

The site is hosted on Github pages and when files are merged to the default branch `gh-pages` a Jekyll server hosted by Github automatically generates the static content and publishes them to the deeplearning4j.org domain.

To develop and test site content locally, you must have the following tools installed on your system:

- Jekyll
- NodeJS/NPM

Once you have Jekyll and NPM installed on your local machine, navigate to the root directory of this repostory and then run:

```shell
npm install
```

This will ensure tools such as Gulp are installed to your local filesystem.

### Running Locally

If you want to start up a server that hot reloads web content after edits, run the following two commands in parallel from the root of this repository (such as two terminal windows):

```shell
jekyll serve
```

```shell
gulp watch
```