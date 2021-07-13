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
    type: 'pie2d', // The chart type
    width: '100%', // Width of the chart
    height: 350, // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Languages',
        captionFontSize: 20,
        captionFont: 'Roboto',
        captionFontBold: 0,
        captionFontColor: '#102a42',
        pieRadius: '45%',
        theme: 'fusion',
        showLegend: '0',
        showPercentValues: '0',
        decimals: '0',
        labelFontSize: 16,
        labelFont: 'Open Sans',
        labelFontColor: '#617D98',
        showPercentInToolTip: 1,
        baseFont: 'Open Sans',
        baseFontSize: 16,
        baseFontColor: '#617D98',
        paletteColors: '#2caeb9, #5256a1, #ffc532',
      },
      // Chart Data
      data,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default ChartDiagram
