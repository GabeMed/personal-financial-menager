import React from "react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Pencil, Trash2, X } from "lucide-react";
import type { TransactionDTO } from "@/types";
import useDeleteTransaction from "@/hooks/useDeleteTransaction";
import AddTransactionDialog from "@/components/AddTransactionDialog";

interface Props {
  transactions: TransactionDTO[];
  isLoading: boolean;
  onAdd: () => void;
}

const TransactionList = ({ transactions, isLoading, onAdd }: Props) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");

  const del = useDeleteTransaction();
  const { open: delOpen, onOpen: openDel, onClose: closeDel } = useDisclosure();
  const {
    open: editOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure();

  const [current, setCurrent] = React.useState<TransactionDTO | null>(null);

  if (isLoading)
    return (
      <Box textAlign="center" mt={4}>
        <Spinner />
      </Box>
    );

  return (
    <Box>
      <Flex justify="space-between" mb={3} mt={2}>
        <Text fontSize="lg" fontWeight="bold">
          Transactions
        </Text>
        <Button size="sm" colorScheme="teal" onClick={onAdd}>
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
            <Box key={tx.id} bg={cardBg} p={3} rounded="md" shadow="sm">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text>{tx.description}</Text>
                  <Text
                    color={tx.type === "income" ? "green.400" : "red.400"}
                    fontWeight="bold"
                  >
                    {tx.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(tx.created_at).toLocaleDateString("pt-BR")} •{" "}
                    {tx.category.name}
                  </Text>
                </Box>

                <Flex gap={2}>
                  <IconButton
                    aria-label="Edit"
                    size="xs"
                    onClick={() => {
                      setCurrent(tx);
                      openEdit();
                    }}
                  >
                    <Pencil size={14} />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    size="xs"
                    onClick={() => {
                      setCurrent(tx);
                      openDel();
                    }}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}

      <Dialog.Root open={delOpen} onOpenChange={closeDel}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="md" alignContent="center" p={6} rounded="md">
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Close"
                  position="absolute"
                  top={3}
                  right={3}
                  size="sm"
                >
                  <X size={14} />
                </IconButton>
              </Dialog.CloseTrigger>{" "}
              <Dialog.Title>Delete transaction</Dialog.Title>
              <Dialog.Description mb={4}>
                Are you sure you wanna delete “{current?.description}”?
              </Dialog.Description>
              <Flex justify="flex-end" gap={3}>
                <Button variant="ghost" onClick={closeDel}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (current) del.mutate(current.id);
                    closeDel();
                  }}
                >
                  Delete
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {current && (
        <AddTransactionDialog
          isOpen={editOpen}
          onClose={closeEdit}
          initial={current}
        />
      )}
    </Box>
  );
};

export default TransactionList;
