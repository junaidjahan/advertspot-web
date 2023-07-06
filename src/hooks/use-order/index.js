import { useAxios } from '../use-axios';
import { useSnackbar } from '../use-snackbar';

export const useOrder = () => {
  const { post, get, put } = useAxios();
  const { open } = useSnackbar();

  const mapBarChartData = (chartData, data, text) => {
    const months = Object.keys(data);
    const counts = Object.values(data);
    chartData.title.text = text;
    chartData.xAxis[0].data = months;
    chartData.series[0].data = counts;
    chartData.series[0].name = 'Orders Placed';

    return chartData;
  };

  const mapLineChartData = (chartData, data, text) => {
    const months = Object.keys(data);
    const amounts = Object.values(data);
    chartData.title.text = text;
    chartData.xAxis.data = months;
    chartData.series[0].data = amounts;
    chartData.series[0].name = 'Orders Placed';

    return chartData;
  };

  const mapCustomGauge = val => {
    var ROOT_PATH = 'https://echarts.apache.org/examples';
    var _panelImageURL = ROOT_PATH + '/data/asset/img/custom-gauge-panel.png';
    var _animationDuration = 1000;
    var _animationDurationUpdate = 1000;
    var _animationEasingUpdate = 'quarticInOut';
    var _valOnRadianMax = 100;
    var _outerRadius = 200;
    var _innerRadius = 170;
    var _pointerInnerRadius = 40;
    var _insidePanelRadius = 140;
    var _currentDataIndex = 0;
    function renderItem(params, api) {
      var valOnRadian = api.value(1);
      var coords = api.coord([api.value(0), valOnRadian]);
      var polarEndRadian = coords[3];
      var imageStyle = {
        image: _panelImageURL,
        x: params.coordSys.cx - _outerRadius,
        y: params.coordSys.cy - _outerRadius,
        width: _outerRadius * 2,
        height: _outerRadius * 2
      };
      return {
        type: 'group',
        children: [
          {
            type: 'image',
            style: imageStyle,
            clipPath: {
              type: 'sector',
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _outerRadius,
                r0: _innerRadius,
                startAngle: 0,
                endAngle: -polarEndRadian,
                transition: 'endAngle',
                enterFrom: { endAngle: 0 }
              }
            }
          },
          {
            type: 'image',
            style: imageStyle,
            clipPath: {
              type: 'polygon',
              shape: {
                points: makePionterPoints(params, polarEndRadian)
              },
              extra: {
                polarEndRadian: polarEndRadian,
                transition: 'polarEndRadian',
                enterFrom: { polarEndRadian: 0 }
              },
              during: function (apiDuring) {
                apiDuring.setShape('points', makePionterPoints(params, apiDuring.getExtra('polarEndRadian')));
              }
            }
          },
          {
            type: 'circle',
            shape: {
              cx: params.coordSys.cx,
              cy: params.coordSys.cy,
              r: _insidePanelRadius
            },
            style: {
              fill: '#fff',
              shadowBlur: 25,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(184, 184, 184, 0.4)'
            }
          },
          {
            type: 'text',
            extra: {
              valOnRadian: valOnRadian,
              transition: 'valOnRadian',
              enterFrom: { valOnRadian: 0 }
            },
            style: {
              text: makeText(valOnRadian),
              fontSize: 50,
              fontWeight: 700,
              x: params.coordSys.cx,
              y: params.coordSys.cy,
              fill: 'rgb(0,50,190)',
              align: 'center',
              verticalAlign: 'middle',
              enterFrom: { opacity: 0 }
            },
            during: function (apiDuring) {
              apiDuring.setStyle('text', makeText(apiDuring.getExtra('valOnRadian')));
            }
          }
        ]
      };
    }
    function convertToPolarPoint(renderItemParams, radius, radian) {
      return [
        Math.cos(radian) * radius + renderItemParams.coordSys.cx,
        -Math.sin(radian) * radius + renderItemParams.coordSys.cy
      ];
    }
    function makePionterPoints(renderItemParams, polarEndRadian) {
      return [
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
        convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian + Math.PI * 0.03),
        convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
      ];
    }
    function makeText(valOnRadian) {
      // Validate additive animation calc.
      if (valOnRadian < -10) {
        alert('illegal during val: ' + valOnRadian);
      }
      return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
    }
    const option = {
      animationEasing: _animationEasingUpdate,
      animationDuration: _animationDuration,
      animationDurationUpdate: _animationDurationUpdate,
      animationEasingUpdate: _animationEasingUpdate,
      dataset: {
        source: [[1, parseInt(val)]]
      },
      tooltip: {},
      angleAxis: {
        type: 'value',
        startAngle: 0,
        show: false,
        min: 0,
        max: _valOnRadianMax
      },
      radiusAxis: {
        type: 'value',
        show: false
      },
      polar: {},
      series: [
        {
          type: 'custom',
          coordinateSystem: 'polar',
          renderItem: renderItem
        }
      ]
    };

    // option.dataset.source = [1, parseInt(val)];
    return option;
  };

  const orderPercentage = data => {
    const total = data.reduce((acc, cur) => {
      acc += cur.value;
      return acc;
    }, 0);
    return {
      Completed: ((data[0].value / total) * 100).toFixed(2),
      InProgress: ((data[1].value / total) * 100).toFixed(2),
      Cancelled: ((data[2].value / total) * 100).toFixed(2)
    };
  };

  const totalAmount = data => {
    console.log('Data', data);
    return Object.values(data).reduce((acc, cur) => {
      acc += cur;
      return acc;
    }, 0);
  };

  const saveOrder = async orderData => {
    {
      try {
        return await post('/order', orderData);
      } catch {}
    }
  };

  const createReview = async reviewData => {
    try{
      return await post('/order/review', reviewData)
    }catch{}
  }

  const getAllBuyerOrders = async () => {
    {
      try {
        const orders = await get(`/order/all-buyer-orders`);
        return orders;
      } catch {}
    }
  };

  const getAllSellerOrders = async () => {
    {
      try {
        const orders = await get(`/order/all-seller-orders`);
        return orders;
      } catch {}
    }
  };

  const changeStatus = async (id, status) => {
    {
      try {
        const order = await get(`/order/update-status/${id}?status=${status}`);
      } catch {}
    }
  };

  const getOrderCount = async type => {
    {
      try {
        const order = await get(`/order/get-order-count/${type}`);
        return order;
      } catch {}
    }
  };

  const getOrdersByMonth = async type => {
    {
      try {
        const months = await get(`/order/orders-by-month/${type}`);
        return months;
      } catch {}
    }
  };

  const earningsAndSpendings = async type => {
    {
      try {
        const months = await get(`/order/earnings-and-spendings/${type}`);
        return months;
      } catch {}
    }
  };

  return {
    saveOrder,
    getAllBuyerOrders,
    getAllSellerOrders,
    changeStatus,
    getOrderCount,
    getOrdersByMonth,
    mapBarChartData,
    orderPercentage,
    earningsAndSpendings,
    mapLineChartData,
    mapCustomGauge,
    totalAmount,
    createReview
  };
};
