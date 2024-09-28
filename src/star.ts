export const star = (rating: number): number => {
  if (rating < 1 || 5 < rating) {
    throw new Error(`invalid star rating: ${rating}`);
  }
  return (rating - 1) / 5 + 0.1;
};

export const toStar = (mass: number): number => {
  if (mass <= 0.1) {
    return 1;
  } else if (mass >= 0.9) {
    return 5;
  } else {
    return Math.round(((mass - 0.1) * 5 + 1) * 100) / 100;
  }
};
