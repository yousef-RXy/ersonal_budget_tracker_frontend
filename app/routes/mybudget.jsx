import { CirclePlus } from 'lucide-react';
import Card from '../components/ui/Card';
import CategoryCard from '../components/ui/CategoryCard';
import EditRemoveButtons from '../components/ui/EditRemoveButtons';
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router';
import Icon from '../components/ui/Icon';
import { colorMap } from '../utils/GetPie';
import { useState } from 'react';
import ModalForm from '../components/ui/ModalForm';
import { useEffect } from 'react';

export default function myBudget() {
  const { income: incomeList, expense: expenseList } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [income, setIncome] = useState(incomeList);
  const [expense, setExpense] = useState(expenseList);

  console.log(income);

  useEffect(() => {
    if (navigation.state === 'idle') {
      if (actionData?.error) {
        const { id, isUpdate, type } = modalData;

        const setList = type === 'income' ? setIncome : setExpense;

        setList(prev =>
          isUpdate
            ? prev
            : prev.filter(item => !item.id?.toString().startsWith('temp-'))
        );
      } else {
        setModalOpen(false);
      }
    }
  }, [navigation.state, actionData]);

  const handleAdd = type => {
    setModalData({
      isUpdate: false,
      type,
    });
    setModalOpen(true);
  };

  const handleEdit = (item, type) => {
    setModalData({
      ...item,
      isUpdate: true,
      type,
    });
    setModalOpen(true);
  };

  const handleOptimisticSubmit = data => {
    const isUpdate = data.isUpdate === 'true';
    const isIncome = data.type === 'income';

    const list = isIncome ? income : expense;
    const setList = isIncome ? setIncome : setExpense;

    const updatedItem = {
      ...data,
      id: isUpdate ? Number(data.id) : `temp-${Date.now()}`,
      amount: parseFloat(data.amount),
      date: new Date().toISOString().split('T')[0],
      category: data.category,
      name: data.name,
    };

    console.log(updatedItem);

    setList(prev => {
      if (isUpdate) {
        return prev.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        );
      } else {
        return [...prev, updatedItem];
      }
    });
  };

  const handleRemoveIncome = async id => {
    const userId = localStorage.getItem('id');
    const jwt = localStorage.getItem('jwt');
    const res = await fetch(`http://localhost:8765/income/${id}`, {
      method: 'DELETE',
      headers: {
        'User-Id': userId,
        authorization: `Bearer ${jwt}`,
      },
    });

    if (res.ok) {
      const isRemoved = 'true' === (await res.text());
      if (isRemoved) {
        setIncome(prev => prev.filter(i => i.id !== id));
        return;
      }
    }
    //error
  };

  const handleRemoveExpense = async id => {
    const userId = localStorage.getItem('id');
    const jwt = localStorage.getItem('jwt');
    const res = await fetch(`http://localhost:8765/expense/${id}`, {
      method: 'DELETE',
      headers: {
        'User-Id': userId,
        authorization: `Bearer ${jwt}`,
      },
    });

    if (res.ok) {
      const isRemoved = 'true' === (await res.text());
      if (isRemoved) {
        setExpense(prev => prev.filter(i => i.id !== id));
        return;
      }
    }
    //error
  };

  return (
    <div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-8">
      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultValues={modalData}
        error={actionData?.error}
        onOptimisticSubmit={handleOptimisticSubmit}
      />
      <div className="flex flex-col gap-8">
        <Card
          title="My Income"
          icon={
            <CirclePlus
              size={40}
              color="green"
              onClick={() => handleAdd('income')}
            />
          }
        >
          {income.map(i => (
            <div key={i.id} className="flex items-center">
              <CategoryCard
                icon={<Icon category={i.category} />}
                title={i.name}
                color={colorMap[i.category.toLowerCase()]}
                desc={i.date}
                amount={`${i.amount} $`}
                totalAmount={i.category}
              />
              <EditRemoveButtons
                onEdit={() => handleEdit(i, 'income')}
                onRemove={handleRemoveIncome.bind(this, i.id)}
              />
            </div>
          ))}
        </Card>
      </div>

      <div className="flex flex-col gap-8">
        <Card
          title="My Expenses"
          icon={
            <CirclePlus
              size={40}
              color="#861b2e"
              onClick={() => handleAdd('expense')}
            />
          }
        >
          {expense.map(i => (
            <div className="flex items-center">
              <CategoryCard
                icon={<Icon category={i.category} />}
                title={i.name}
                color={colorMap[i.category.toLowerCase()]}
                desc={i.date}
                amount={`${i.amount} $`}
                totalAmount={i.category}
              />
              <EditRemoveButtons
                onEdit={() => handleEdit(i, 'expense')}
                onRemove={handleRemoveExpense.bind(this, i.id)}
              />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
export async function clientLoader() {
  const id = localStorage.getItem('id');
  const jwt = localStorage.getItem('jwt');

  try {
    const urls = [
      'http://localhost:8765/income',
      'http://localhost:8765/expense',
    ];

    const res = await Promise.all(
      urls.map(url =>
        fetch(url, {
          headers: {
            'User-Id': id,
            authorization: `Bearer ${jwt}`,
          },
        }).then(res => res.json())
      )
    );

    const [income, expense] = res;

    return {
      income,
      expense,
    };
  } catch (error) {}
}

export async function clientAction({ request }) {
  const data = Object.fromEntries(await request.formData());
  const { isUpdate, type, isRepeated, ...rest } = data;
  const userId = localStorage.getItem('id');
  const jwt = localStorage.getItem('jwt');

  const url =
    `http://localhost:8765/${type}` +
    (isUpdate === 'true' ? `/${data.id}` : '');
  const method = isUpdate === 'true' ? 'PUT' : 'POST';

  rest.userId = userId;
  if (isRepeated === 'on') rest.repetitionPeriod = 'Monthly';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(rest),
    });

    if (res.ok) {
      const result = await res.text();
      if (result === 'true') {
        return redirect('/my-budget');
      }
    }

    return { error: 'Failed to save the data. Please try again.' };
  } catch (err) {
    return { error: 'Something went wrong. Please try again later.' };
  }
}
