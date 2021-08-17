// import "core-js/stable";
import "regenerator-runtime/runtime";

import sketch from 'sketch';
import * as React from 'react';
import { render, Page, Document, RedBox, Artboard, Text, View } from 'react-sketchapp';

import App from './App';

// const App = () => (
//   <Page>
//     <View>
//       <Text>Hello, World!</Text>
//     </View>
//   </Page>
// )

const DocumentContainer = () => {
  return (
    <Document>
      <App />
    </Document>
  )
}

export default () => {

  try {
    render(<DocumentContainer />, sketch.getSelectedDocument() || new sketch.Document());
  } catch (err) {
    render(<RedBox error={err} />);
  }};
