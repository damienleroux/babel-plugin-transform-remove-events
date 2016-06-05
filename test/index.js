import fs from 'fs';
import {parse, transform, traverse} from 'babel-core';

if (process.env.NODE_WATCH) {
  var pluginToTest = require('../src').default;
} else {
  var pluginToTest = require('../lib').default;
}

describe('Test Plugin', function () {
  var basename = 'like-button';
  it(`should remove onClick from'${basename}'`, async function () {
    const transpiled = load(basename);
    if (transpiled.indexOf('onClick') !== -1) {
      throw new Error(`Test '${basename}' should have no more onClick.`);
    }
  });
});

function load(basename, opts) {
  return loadInternal(basename, opts);
}

function loadInternal(basename, opts) {
  const filename = `${__dirname}/fixtures/${basename}.js`;
  const source = fs.readFileSync(filename, 'utf8');
  const transformed = transform(source, {
    filename: filename,
    presets: [
      "es2015",
      "stage-0",
      "react"
    ],
    plugins: [
      opts ? [pluginToTest, opts] : pluginToTest
    ]
  });
  return transformed.code;
}
