import { pieChartoptions } from './constants';

export const serializeQuery = (params, prefix = '') => {
  const query = Object.keys(params).map(key => {
    const value = params[key];

    if (params.constructor === Array) key = `${prefix}[]`;
    else if (params.constructor === Object) key = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === 'object') return serializeQuery(value, key);
    else if (value) return `${key}=${encodeURIComponent(value)}`;
  });

  return [].concat
    .apply(
      [],
      query.filter(q => q)
    )
    .join('&');
};

export const isEmpty = object => !Object.keys(object).length;

export const toTitleCase = phrase => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const objPropsToLowerCase = obj => {
  const lowerCaseObject = Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

  return lowerCaseObject;
};

/**
 * @param {pieChartoptions} options
 *
 */
export const setPiarChartdata = (options, data, title) => {
  options.series[0].data = data;
  options.title.text = title

  return options;
};

export const setCircleGaugeData = (options, data, title) => {
  const gaugeData = [
    {
      value: data.Completed,
      name: 'Completed',
      title: {
        offsetCenter: ['0%', '-30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%']
      }
    },
    {
      value: data.InProgress,
      name: 'In-Progress',
      title: {
        offsetCenter: ['0%', '0%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%']
      }
    },
    {
      value: data.Cancelled,
      name: 'Cancel',
      title: {
        offsetCenter: ['0%', '30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%']
      }
    }
  ];
  options.series[0].data = gaugeData;
  options.title.text = title

  return options;
};
