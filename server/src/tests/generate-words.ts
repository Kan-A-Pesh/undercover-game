#!/usr/bin/env node

import { generateWordPair } from '../utils/word-generator';

const { word, similarWord } = generateWordPair('en');

console.log('=== Semantic Word Generator ===');
console.log(`Original word: ${word}`);
console.log(`Similar word: ${similarWord}`);
console.log('==============================');