import ToggleCharts from "./ToggleCharts";

interface Slice {
  category: string;
  porcentage: number;
}

interface SummaryChartsProps {
  expenses: Slice[];
  incomes: Slice[];
}

export function SummaryCharts({ expenses, incomes }: SummaryChartsProps) {
  return <ToggleCharts expenses={expenses} incomes={incomes} />;
}
