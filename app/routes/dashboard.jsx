import { Utensils } from "lucide-react";
import Card from "../components/ui/Card";
import CategoryCard from "../components/ui/CategoryCard";
import MultiColorCircle from "../components/ui/MultiColorCircle";
import SectionList from "../components/ui/SectionList";
import { redirect, useLoaderData } from "react-router";
import getPie, { colorMap } from "../utils/GetPie";
import Icon from "../components/ui/Icon";

export default function dashboard() {
	const { incomeCategories, expenseCategories, balance } = useLoaderData();

	const incomeTotal = incomeCategories
		.map((i) => i.total)
		.reduce((sum, val) => sum + val, 0);
	const incomePie = getPie(incomeCategories, incomeTotal);

	const expense = [
		{
			id: 1,
			name: "Grocery Shoppig",
			amount: 1500,
			category: "food",
			date: "2025-05-13",
			repetitionPeriod: "Weekly",
		},
	];
	return (
		<div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-8">
			<div className="flex flex-col gap-8">
				<Card title="Balance">
					<p className="text-4xl text-center w-full">{balance} $</p>
				</Card>

				<Card title="Income">
					<div className="flex gap-6 items-center">
						<MultiColorCircle
							sections={incomePie}
							width={200}
							height={200}
							circleRadius={90}
						>
							<div>
								<p className="text-[#afafb2] text-l mb-4">Total Income</p>
								<p className="text-xl">{incomeTotal} $</p>
							</div>
						</MultiColorCircle>
						<SectionList sections={incomePie} />
					</div>
				</Card>
			</div>
			<div className="flex flex-col gap-8">
				<Card title="Expense Categories">
					<div className="w-106">
						{expenseCategories.map((e) => (
							<CategoryCard
								key={e.category}
								icon={<Icon category={e.category} />}
								color={colorMap[e.category.toLowerCase()]}
								title={e.category}
								amount={`${e.total} $`}
								minWidth="200px"
							/>
						))}
					</div>
				</Card>
			</div>
			<div className="flex flex-col gap-8">
				<Card title="Latest Expenses">
					{expense.map((i) => (
						<div className="flex items-center">
							<CategoryCard
								icon={<Icon category={i.category} />}
								title={i.name}
								color={colorMap[i.category.toLowerCase()]}
								desc={i.date}
								amount={`${i.amount} $`}
								totalAmount={i.category}
							/>
						</div>
					))}
				</Card>
			</div>
		</div>
	);
}

export async function clientLoader() {
	const id = localStorage.getItem("id");
	const jwt = localStorage.getItem("jwt");

	if (!id) throw redirect("/auth");

	try {
		const urls = [
			"http://localhost:8765/income/pie",
			"http://localhost:8765/expense/pie",
			"http://localhost:8765/auth/balance",
		];

		const res = await Promise.all(
			urls.map((url) =>
				fetch(url, {
					headers: {
						"User-Id": id,
						authorization: `Bearer ${jwt}`,
					},
				}).then((res) => res.json())
			)
		);

		const [incomeCategories, expenseCategories, balance] = res;

		return {
			incomeCategories,
			expenseCategories,
			balance,
		};
	} catch (error) {}
}
