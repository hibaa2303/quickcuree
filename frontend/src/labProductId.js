export const getLabProductId = (name) => `lab-${String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
