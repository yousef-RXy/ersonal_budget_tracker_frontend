import { Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import CategoryCard from '../components/ui/CategoryCard';
import EditRemoveButtons from '../components/ui/EditRemoveButtons';

export default function myBudget() {
  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const handleRemove = () => {
    console.log('Remove clicked');
  };

  return (
    <div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-8">
      <div className="flex flex-col gap-8">
        <Card title="My Income">
          <div className="flex items-center">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              titleColor="green"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
            <EditRemoveButtons onEdit={handleEdit} onRemove={handleRemove} />
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-8">
        <Card title="My Expenses">
          <div className="flex items-center">
            <CategoryCard
              icon={<Trash2 size={20} />}
              title="30 $"
              desc="2 pizza + pop corn + Ice cream chocolate"
              amount="Remaining: 450 $"
              totalAmount="Total limit: 600 S"
            />
            <EditRemoveButtons onEdit={handleEdit} onRemove={handleRemove} />
          </div>
        </Card>
      </div>
    </div>
  );
}
