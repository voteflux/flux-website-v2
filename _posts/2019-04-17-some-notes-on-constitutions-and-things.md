---
title: Some Notes on Constitutions and Things
summary: Notes on where our constitutions are stored, accessing rendered versions, differences, and the latest copies.
author: Max Kaye
layout: about
date: 2019-04-17
---

Our constitutions are stored and managed here: [https://github.com/voteflux/flux/](https://github.com/voteflux/flux/).
This is the *only* canonical source.

That said, we provide rendered copies (docx, epub, html, odt, pdf, rst, and txt) via [https://voteflux.org/constitutions/](https://voteflux.org/constitutions/), and you can find up-to-date latest copies in the `_latest` folder.
These are regenerated every time a change is made to any document in the `voteflux/flux` repository (think of a repository like a folder) on GitHub.
If you're technical, you might be interested in the [buildspec.yml](https://github.com/voteflux/flux/blob/master/buildspec.yml) file.

The copies of our constitutions in the constitutions folder above include the dates they were last edited.
If you'd like to view the constitutions on github as they appeared at a particular date, you can use a URL like this: `https://github.com/voteflux/flux/tree/master@{2019-02-01}`.
This will (in this case) show you our constitutions as they appeared on the 1st of February 2019.

You can also compare between arbitrary dates using a URL like this: `https://github.com/voteflux/flux/compare/master@{2019-01-01}...master@{2019-03-31}`.
This shows all changes made between the 1st of January 2019 and the 31st of March 2019.
