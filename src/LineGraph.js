import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { data } from './data';
import jsPDF from 'jspdf';

const LineGraph = () => {
  const chartRef = useRef();

  const exportToPDF = () => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const pdf = new jsPDF('landscape', 'pt', 'a4');

      pdf.setFontSize(16);
      pdf.text("Crime Report", 250, 30);

      pdf.setFillColor(0, 0, 255);
      pdf.rect(10, 45, 800, 20, 'F');

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 65, 800, 400);

      pdf.setFontSize(10);
      pdf.text("Page 1 of 1", 750, 490);

      pdf.save('line_graph.pdf');
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: data?.map(entry => entry.data_year),
          datasets: [
            {
              label: 'Burglary',
              data: data.map(entry => entry.Burglary),
              borderColor: 'blue',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: data?.map(entry => entry.data_year),
              grid: {
                display: false, 
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <div style={{ width: '60%', height: '400px' }}>
        <canvas ref={chartRef} />
      </div>
      <button onClick={exportToPDF}>Export to PDF</button>
    </div>
  );
};

export default LineGraph;
