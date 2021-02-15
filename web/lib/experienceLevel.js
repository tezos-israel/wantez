export function getLevelClassName(experienceLevel) {
  switch (experienceLevel) {
    case 'beginner':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'pro':
      return 'bg-purple-600';
  }
}
