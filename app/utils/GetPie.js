export default function getPie(sections, total) {
  return sections.map(item => {
    const key = item.category.toLowerCase();
    const amount = item.total;
    const percent = Math.round((amount / total) * 100);

    return {
      color: colorMap[key],
      name:
        item.category.charAt(0).toUpperCase() +
        item.category.slice(1).toLowerCase(),
      amount,
      percent,
    };
  });
}

export const colorMap = {
  salary: '#2f83e4',
  freelance: '#409a93',
  savings: '#8856bd',
  food: '#8856bd',
  transport: '#409a93',
};
