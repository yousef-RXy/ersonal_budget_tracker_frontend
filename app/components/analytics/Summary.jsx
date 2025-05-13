import Card from '../ui/Card';

function Summary({ title, data }) {
  const list = Object.entries(data).map(([label, value]) => ({ label, value }));

  return (
    <Card title={`What is my total ${title}?`}>
      <div className="w-106">
        <div className="flex flex-col gap-6 items-center  justify-between ">
          <div className="flex gap-6 justify-around w-full">
            {list.slice(3).map(d => (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">{d.label}</p>
                <p>{d.value} $</p>
              </div>
            ))}
          </div>
          <div className="flex gap-6 justify-around w-full">
            {list.slice(0, 3).map(d => (
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">{d.label}</p>
                <p>{d.value} $</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Summary;
