export const ORDER_STATUS = {
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  OPEN: 'open',
  CANCELLED: 'cancelled'
};

export const USER_TYPE = {
  SELLER: 'seller',
  BUYER: 'buyer'
};

export const basicChartOptions = {
  title: {
    text: ''
  },
  tooltip: {},
  legend: {
    data: ['sales']
  },
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: []
    }
  ]
};

export const pieChartoptions = {
  title:{
    text:''
  },
  legend: {
    top: 'bottom',
    left: 'center',
    itemGap: 15,
    padding: [0, 0, 0, 0],
    type: 'plain',
    textStyle: {
      fontWeight: '400',
      fontSize: '12px'
    }
  },
  color: [
    '#c77dff',
    '#7b2cbf',
    '#ff5a5f',
    '#9d4edd',
    '#5a189a',
    '#be95c4',
    '#e0aaff',
    '#c47e12',
    '#f4b350',
    '#e6e6e6',
    '#429692',
    '#a2a828',
    '#b0abab'
  ],
  icon: 'circle',

  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      bottom: 52,
      avoidLabelOverlap: true,
      label: {
        show: false,
        position: 'center',
        formatter: '{b}: {c}'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '15',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },

      data: []
    }
  ]
};

export const barChartOptions = {
  title: {
    text: ''
  },
  color: ['#c77dff'],
  legend: {
    top: 'bottom',
    left: 'center',
    padding: [50, 0, 0, 0],
    margin: [30]
  },
  tooltip: {},

  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: '60%',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

export const circleGauge = {
  title: {
    text: ''
  },
  color: [
    '#c77dff',
    '#7b2cbf',
    '#ff5a5f',
  ],
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: [],
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  
}

export const lineChartData = {
  title:{
    text:''
  },
color: [ '#9d4edd'],
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
