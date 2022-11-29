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
