export const evaluatePasswordStrength = (password) => {
  if (!password) {
    return { percentage: 0, width: '0%', label: '', color: '#94a3b8', barColor: '#e5e7eb' };
  }

  if (password.length < 8) {
    const base = Math.round((password.length / 8) * 38);
    let bonus = 0;
    if (/[a-z]/.test(password)) bonus += 2;
    if (/[A-Z]/.test(password)) bonus += 3;
    if (/[0-9]/.test(password)) bonus += 4;
    if (/[^A-Za-z0-9]/.test(password)) bonus += 4;
    const percentage = Math.min(48, Math.max(10, base + bonus));
    return { percentage, width: `${percentage}%`, label: 'Contraseña insegura', color: '#ef4444', barColor: '#ef4444' };
  }

  if (password.length >= 14) {
    return { percentage: 100, width: '100%', label: 'Contraseña muy segura', color: '#10b981', barColor: '#10b981' };
  }

  let score = 60;
  let typesCount = 0;
  if (/[a-z]/.test(password)) typesCount++;
  if (/[A-Z]/.test(password)) typesCount++;
  if (/[0-9]/.test(password)) typesCount++;
  if (/[^A-Za-z0-9]/.test(password)) typesCount++;
  if (typesCount >= 2) score += 15;
  if (typesCount >= 3) score += 15;
  if (typesCount >= 4) score += 10;
  score += (password.length - 8) * 6;

  const percentage = Math.min(100, score);
  if (percentage < 75) {
    return { percentage, width: `${percentage}%`, label: 'Contraseña media', color: '#F39C12', barColor: '#ea8207' };
  }

  return {
    percentage,
    width: `${percentage}%`,
    label: percentage === 100 ? 'Contraseña muy segura' : 'Contraseña fuerte',
    color: '#10b981',
    barColor: '#10b981',
  };
};
