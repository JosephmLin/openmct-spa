const propOr = (val, prop, obj) => (obj[prop] ? obj[prop] : val);

export { propOr };
