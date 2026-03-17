export const getSeason = (date: Date): 'spring' | 'summer' | 'fall' | 'winter' => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

export const getCurrentMonth = (): number => {
  return new Date().getMonth();
};

export const isInBloom = (bloomMonths: number[]): boolean => {
  const currentMonth = getCurrentMonth();
  return bloomMonths.includes(currentMonth);
};

export const getBloomingSoonSpecies = (species: any[]): any[] => {
  const currentMonth = getCurrentMonth();
  const nextMonth = (currentMonth + 1) % 12;
  
  return species.filter(s => 
    s.bloomMonths.includes(nextMonth) && !s.bloomMonths.includes(currentMonth)
  );
};

export const getSeasonName = (season: 'spring' | 'summer' | 'fall' | 'winter'): string => {
  const names = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter'
  };
  return names[season];
};

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
