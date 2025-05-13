import { Utensils, HandCoins, CloudCog, PiggyBank, Bus } from 'lucide-react';

function Icon({ category }) {
  let icon;

  switch (category) {
    case 'salary':
      icon = <HandCoins size={20} />;
      break;
    case 'freelance':
      icon = <CloudCog size={20} />;
      break;
    case 'savings':
      icon = <PiggyBank size={20} />;
      break;
    case 'food':
      icon = <Utensils size={20} />;
      break;
    case 'transport':
      icon = <Bus size={20} />;
      break;

    default:
      break;
  }

  return <>{icon}</>;
}

export default Icon;
