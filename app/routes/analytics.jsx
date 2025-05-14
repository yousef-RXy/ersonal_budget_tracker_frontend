import { redirect, useLoaderData } from "react-router";
import Summary from "../components/analytics/Summary";
import Card from "../components/ui/Card";
import MultiColorCircle from "../components/ui/MultiColorCircle";
import SectionList from "../components/ui/SectionList";
import getPie from "../utils/GetPie";

export default function dashboard() {
	const { incomeSummary, expenseSummary, incomeCategories, expenseCategories } =
		useLoaderData();

	const incomeTotal = incomeCategories
		.map((i) => i.total)
		.reduce((sum, val) => sum + val, 0);
	const incomePie = getPie(incomeCategories, incomeTotal);

	const expenseTotal = expenseCategories
		.map((i) => i.total)
		.reduce((sum, val) => sum + val, 0);
	const expensePie = getPie(expenseCategories, expenseTotal);

	return (
		<div className="bg-[#141935] min-h-full min-w-full p-8 flex justify-center gap-16">
			<div className="flex flex-col gap-8">
				<Summary
					title={"Incomes"}
					data={incomeSummary}
				/>

				<Card title="Income">
					<div className="flex gap-6 items-center">
						<MultiColorCircle
							sections={incomePie}
							width={220}
							height={220}
							circleRadius={100}
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
				<Card title="Expense">
					<div className="flex gap-6 items-center">
						<MultiColorCircle
							sections={expensePie}
							width={220}
							height={220}
							circleRadius={100}
						>
							<div>
								<p className="text-[#afafb2] text-l mb-4">Total Expense</p>
								<p className="text-xl">{expenseTotal} $</p>
							</div>
						</MultiColorCircle>
						<SectionList sections={expensePie} />
					</div>
				</Card>

				<Summary
					title={"Expenses"}
					data={expenseSummary}
				/>
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
			"http://localhost:8765/income/summary",
			"http://localhost:8765/expense/summary",
			"http://localhost:8765/income/pie",
			"http://localhost:8765/expense/pie",
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

		const [incomeSummary, expenseSummary, incomeCategories, expenseCategories] =
			res;

		return {
			incomeSummary,
			expenseSummary,
			incomeCategories,
			expenseCategories,
		};
	} catch (error) {}
}
