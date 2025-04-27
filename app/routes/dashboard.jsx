import { Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import CategoryCard from '../components/ui/CategoryCard';
import MultiColorCircle from '../components/ui/MultiColorCircle';
import SectionList from '../components/ui/SectionList';
import StatSummary from '../components/ui/StatSummary';

export default function dashboard() {
  const sections = [
    { color: '#2f83e4', name: 'Salary', amount: 1300, percent: 50 },
    { color: '#409a93', name: 'Freelance', amount: 800, percent: 30 },
    { color: '#8856bd', name: 'Savings', amount: 300, percent: 20 },
  ];

  return (
    <div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-8">
      <div className="flex flex-col gap-8">
        <Card title="Card">
          <div className="flex gap-6 items-center">
            <MultiColorCircle
              sections={sections}
              width={200}
              height={200}
              circleRadius={90}
            >
              <div>
                <p className="text-[#afafb2] text-l mb-4">Total Income</p>
                <p className="text-xl">2,690 $</p>
              </div>
            </MultiColorCircle>
            <SectionList sections={sections} />
          </div>
        </Card>

        <Card title="My Savings">
          <p className="text-[#afafb2]">Last Month</p>
          <p className="text-2xl">20,000 $</p>
          <StatSummary income={10980} expense={20} />
        </Card>
      </div>
      <div className="flex flex-col gap-8">
        <Card title="Expense Categories">
          <div className="w-106">
            <div className="flex gap-6 items-center justify-around mb-8">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Balance</p>
                <p>2,690 $</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Spent</p>
                <p>1,000 $</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Planned</p>
                <p>500 $</p>
              </div>
            </div>
            <CategoryCard
              icon={<Trash2 size={20} />}
              color="green"
              title="Food"
              desc="2 Transactions"
              amount="450 $"
              totalAmount="600 $"
            />
            <CategoryCard
              icon={<Trash2 size={20} />}
              color="green"
              title="Food"
              desc="2 Transactions"
              amount="450 $"
              totalAmount="600 $"
            />
          </div>
        </Card>
      </div>
      <div className="flex flex-col gap-8">
        <Card title="Latest Expenses">
          <div className="w-150">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
          </div>
          <div className="w-150">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
          </div>
          <div className="w-150">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
          </div>
          <div className="w-150">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
