const MEMBERSHIPS = Object.freeze({
  'membership-silver': Object.freeze({ id: 'membership-silver', tier: 'Silver', name: 'Silver Membership', price: 99, period: 'month' }),
  'membership-gold': Object.freeze({ id: 'membership-gold', tier: 'Gold', name: 'Gold Membership', price: 199, period: 'month' }),
  'membership-platinum': Object.freeze({ id: 'membership-platinum', tier: 'Platinum', name: 'Platinum Membership', price: 299, period: 'month' }),
});

const LAB_TESTS = Object.freeze([
  ['Comprehensive Gold Full Body', 1999],
  ['Comprehensive Silver Full Body', 1599],
  ['Comprehensive Platinum Full Body', 3399],
  ['Basic Health Checkup', 999],
  ['Advanced Health Checkup', 4499],
  ['Heart Care Checkup', 2999],
  ['Diabetes Care Checkup', 2499],
  ['Women Wellness Checkup', 3499],
  ['Senior Citizen Checkup', 3999],
  ['Kidney Health Checkup', 1299],
  ['Liver Health Checkup', 999],
  ['Thyroid Health Checkup', 799],
  ['Bone Health Checkup', 1499],
  ['Lung Health Checkup', 1999],
  ['Cardiac Health Checkup', 2499],
  ['Good Health Smart Package', 399],
].map(([name, price]) => {
  const id = `lab-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return Object.freeze({ id, name, price, type: 'labTest' });
}));

const LAB_TESTS_BY_ID = Object.freeze(Object.fromEntries(LAB_TESTS.map((test) => [test.id, test])));

module.exports = { MEMBERSHIPS, LAB_TESTS, LAB_TESTS_BY_ID };
