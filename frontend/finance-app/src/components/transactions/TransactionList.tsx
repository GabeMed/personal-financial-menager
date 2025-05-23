import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useTransactions from "@/hooks/useTransactions";
import useDeleteTransaction from "@/hooks/useDeleteTransaction";
import { type TransactionDTO } from "@/types";
import TransactionCard from "@/components/transactions/TransactionCard";
import AddEditTransactionDialog from "@/components/transactions/AddEditTransactionDialog";
import DeleteTransactionDialog from "@/components/transactions/DeleteTransactionDialog";

export default function TransactionList() {
  const { data: transactions = [], isLoading } = useTransactions();
  const deleteMutation = useDeleteTransaction();

  const createDisclosure = useDisclosure();
  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const [current, setCurrent] = useState<TransactionDTO | null>(null);

  const handleEdit = (tx: TransactionDTO) => {
    setCurrent(tx);
    editDisclosure.onOpen();
  };

  const handleDelete = (tx: TransactionDTO) => {
    setCurrent(tx);
    deleteDisclosure.onOpen();
  };

  const confirmDelete = async () => {
    if (current) {
      await deleteMutation.mutateAsync(current.id);
      deleteDisclosure.onClose();
    }
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Transactions
        </Text>
        <Button size="sm" onClick={createDisclosure.onOpen}>
          + New
        </Button>
      </Flex>

      {transactions.length === 0 ? (
        <Text fontSize="sm" color="gray.400">
          No transaction registered
        </Text>
      ) : (
        <Stack gap={2}>
          {transactions.map((tx) => (
            <TransactionCard
              key={tx.id}
              transaction={tx}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      )}

      <AddEditTransactionDialog
        mode="create"
        isOpen={createDisclosure.open}
        onClose={createDisclosure.onClose}
      />
      <AddEditTransactionDialog
        mode="edit"
        isOpen={editDisclosure.open}
        onClose={editDisclosure.onClose}
        initial={current!}
      />
      <DeleteTransactionDialog
        isOpen={deleteDisclosure.open}
        onClose={deleteDisclosure.onClose}
        onConfirm={confirmDelete}
        transaction={current!}
      />
    </Box>
  );
}
