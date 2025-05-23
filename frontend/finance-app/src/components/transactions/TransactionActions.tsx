import { Flex, IconButton, Text, Stack, Box } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { type TransactionDTO } from "@/types";

interface TransactionActionsProps {
  transaction: TransactionDTO;
  onEdit(transaction: TransactionDTO): void;
  onDelete(transaction: TransactionDTO): void;
}

export function TransactionActions({
  transaction,
  onEdit,
  onDelete,
}: TransactionActionsProps) {
  if (!transaction) {
    return (
      <Text fontSize="sm" color="gray.400">
        No transaction registered
      </Text>
    );
  }

  return (
    <Stack gap={2}>
      <Box key={transaction.id} p={3}>
        <Flex gap={2}>
          <IconButton
            aria-label="Edit"
            size="xs"
            onClick={() => onEdit(transaction)}
          >
            <Pencil size={14} />
          </IconButton>
          <IconButton
            aria-label="Delete"
            size="xs"
            onClick={() => onDelete(transaction)}
          >
            <Trash2 size={14} />
          </IconButton>
        </Flex>
      </Box>
    </Stack>
  );
}
