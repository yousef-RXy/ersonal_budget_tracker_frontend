import Card from '../components/ui/Card';

export default function dashboard() {
  return (
    <div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-8">
      <div className="flex flex-col gap-8">
        <Card title="What is my total expenses?">
          <div className="w-106">
            <div className="flex gap-6 items-center justify-around mb-8">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Last Year</p>
                <p>20,000 $</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Last Month</p>
                <p>3,020 $</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[#afafb2] text-xl">Last Week</p>
                <p>430 $</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
