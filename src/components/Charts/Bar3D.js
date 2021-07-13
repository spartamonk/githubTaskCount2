// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Charts from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartDiagram = ({ data }) => {
  const chartConfigs = {
    type: 'bar2d', // The chart type
    width: '100%', // Width of the chart
    height: 350, // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Most Forked',
        captionFontSize: 20,
        captionFont: 'Roboto',
        captionFontBold: 0,
        captionFontColor: '#102a42',
        theme: 'fusion',
        showPercentValues: '0',
        decimals: '0',
        labelFontSize: 12,
        labelFont: 'Open Sans',
        labelFontColor: '#617D98',
        showPercentInToolTip: 1,
        baseFont: 'Open Sans',
        baseFontSize: 12,
        baseFontColor: '#617D98',
        paletteColors: '#2caeb9, #5256a1, #ffc532, #f2726e, #8d6d63',
        xAxisName: 'Repos',
        yAxisName: 'Stars',
        xAxisNameFontSize: 16,
        yAxisNameFontSize: 16,
        xAxisNameFontColor: '#627c99',
        yAxisNameFontColor: '#627c99',
        formatNumberScale: 1,
        showValues: 1,
        valueFontSize: 16,
        valueFontColor: '#627c99',
        valueFont: 'Open Sans',
        divLineColor: '#102a42',
        divLineThickness: 0.5,
        maxBarHeight: 50,
      },
      // Chart Data
      data,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default ChartDiagram
