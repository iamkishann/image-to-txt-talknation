# Image to text recognition

[![Build Status](https://travis-ci.org/iamkishann/image-to-txt-talknation.svg?branch=master)](https://travis-ci.org/iamkishann/image-to-txt-talknation)

We here at I.R.V.A. facilitate challenged individuals to experience the world at their fullest.
The application takes Image input uses cloudsight api to extract txt, describe the image as best as possible and html5 txt to voice api to read the txt out.

Sign up free with cloudsightapi for 100 image requests replace the api key (`src>renderer>index.js`)
(`--login > default project > api keys >api key`)

A gui app drag and drop image or choose file from finder
will process the image and output the text.

```bash
git clone https://github.com/iamkishann/image-to-txt-talknation
npm install
npm start
```
