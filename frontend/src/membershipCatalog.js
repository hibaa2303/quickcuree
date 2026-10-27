export const MEMBERSHIP_CATALOG = [
  { id: 'membership-silver', tier: 'silver', name: 'Silver Membership', price: 99, period: 'month' },
  { id: 'membership-gold', tier: 'gold', name: 'Gold Membership', price: 199, period: 'month' },
  { id: 'membership-platinum', tier: 'platinum', name: 'Platinum Membership', price: 299, period: 'month' },
];

export const membershipPrice = (tier) => MEMBERSHIP_CATALOG.find((plan) => plan.tier === tier)?.price || 0;
