// import "core-js/stable";
// import "regenerator-runtime/runtime";

import sketch from 'sketch';
import * as React from 'react';
import { render, Document, RedBox, Artboard, Text, View } from 'react-sketchapp';

import App from './App';

const DocumentContainer = () => {
  return (
    <Document>
      <App />
    </Document>
  )
}

export default async () => {

  try {
    await render(<DocumentContainer />, sketch.getSelectedDocument() || new sketch.Document());
  } catch (err) {
    render(<RedBox error={err} />);
  }};
