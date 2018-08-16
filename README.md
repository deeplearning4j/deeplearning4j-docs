deeplearning4j-docs
===================

The documentation for Deeplearning4j and all of its libraries (DL4J, ND4J, Arbiter, DataVec, etc.) live in this repository.

**Warning: DO NOT edit the user guide directly in this repository. Commits will be reverted. Please make changes to the main repository [here](https://github.com/deeplearning4j/deeplearning4j/tree/master/docs), run the autogeneration process, and open a pull request.**

## Developing

The site is hosted on Github pages and when files are merged to the default branch `gh-pages` a Jekyll server hosted by Github automatically generates the static content and publishes them to the deeplearning4j.org domain.

To develop and test site content locally, you must have the following tools installed on your system:

- Ruby (suggest using `rbenv`)
- NodeJS/NPM

Once you have Ruby and NPM installed on your local machine, navigate to the root directory of this repostory and then run:

```shell
gem install jekyll bundler
npm install
```

This will ensure tools such as Gulp are installed to your local filesystem.

### Mandatory Headers

Because the DL4J website uses descriptions and categories to enhance the user experience, all web pages will need to use jekyll headers. For most pages, the `default` template is fine.

```yaml
---
title: Deeplearning4j Autoencoders
short_title: Autoencoders
description: Supported autoencoder configurations.
layout: default
---
```

Note that the user guide also uses Jekyll headers with some specific changes. Please see the README for autogen docs for more information: https://github.com/deeplearning4j/deeplearning4j/blob/master/docs/README.md.

### Running Locally

If you want to start up a server that hot reloads web content after edits, run the following two commands in parallel from the root of this repository (such as two terminal windows):

```shell
jekyll serve
```

```shell
gulp watch
```

### Regenerating Tutorials

Tutorials are converted from Jupyter notebooks with the extension `.ipynb` in the examples repository, and generated into pages directly accessible on the docs website. If you need to update the tutorials, run the command:

```shell
cd utils
export DL4J_TUTORIALS_DIR=/path/to/dl4j-examples/tutorials/
bash convert_tutorials.sh
```

The conversion script will handle everything automatically.