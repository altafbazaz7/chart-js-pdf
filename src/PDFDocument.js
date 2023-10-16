// PDFDocument.js
import React, { useState, useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import LineGraph from './LineGraph';

const styles = StyleSheet.create({
  // Your styles here...
});

const PDFDocument = () => {
  const [chartImage, setChartImage] = useState(null);

  useEffect(() => {
    const captureChartAsImage = async () => {
      try {
        setChartImage(LineGraph.getChartImage());
      } catch (error) {
        console.error('Error capturing chart as image:', error);
      }
    };

    captureChartAsImage();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Header</Text>
        </View>
        <Text style={styles.title}>Chart Title</Text>
        <View style={styles.chartContainer}>
          {chartImage && <Image src={chartImage} style={{ width: '100%', height: 'auto' }} />}
        </View>
        <Text style={styles.footer}>Footer</Text>
      </Page>
    </Document>
  );
};

export default PDFDocument;
