import { Box, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import useSummary from "@/hooks/useSummary";
import useTransactions from "@/hooks/useTransactions";
import useCategories from "@/hooks/useCategories";
import TransactionList from "@/components/TransactionList";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import { BalanceCard } from "@/components/layout/BalanceCard";
import { SummaryCharts } from "@/components/charts/SummaryCharts";

const DashboardPage = () => {
  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: transactions, isLoading: transactionLoading } =
    useTransactions();
  const { data: categories = [] } = useCategories();
  const { open, onOpen, onClose } = useDisclosure();

  const categoryNames = Object.fromEntries(
    categories.map((c) => [String(c.id), c.name])
  );

  const expenseSlices = summary?.expense_porcentage_by_category
    ? Object.entries(summary.expense_porcentage_by_category).map(
        ([id, porcentage]) => ({
          category: categoryNames[id],
          porcentage,
        })
      )
    : [];

  const incomeSlices = summary?.income_porcentage_by_category
    ? Object.entries(summary.income_porcentage_by_category).map(
        ([id, porcentage]) => ({
          category: categoryNames[id],
          porcentage,
        })
      )
    : [];

  return (
    <Box p={6}>
      <Heading size="xl" mb={6}>
        Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={8}>
        <BalanceCard
          value={summary ? summary.balance : 0}
          isLoading={summaryLoading}
        ></BalanceCard>

        <SummaryCharts expenses={expenseSlices} incomes={incomeSlices} />
      </SimpleGrid>

      <TransactionList
        transactions={transactions ?? []}
        isLoading={transactionLoading}
        onAdd={onOpen}
      />

      <AddTransactionDialog isOpen={open} onClose={onClose} />
    </Box>
  );
};

export default DashboardPage;
