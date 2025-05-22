import { Box, Button, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { TransactionDTO } from "@/types";

const TransactionList = ({
  transactions,
  isLoading,
  onAdd,
}: {
  transactions: TransactionDTO[];
  isLoading: boolean;
  onAdd: () => void;
}) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");

  if (isLoading) {
    return (
      <Box mt={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" mb={3} mt={2}>
        <Text fontSize="lg" fontWeight="bold">
          Transactions
        </Text>
        <Button size="sm" colorScheme="teal" onClick={onAdd}>
          + Add
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
              <Flex justify="space-between">
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
              </Flex>
              <Text fontSize="xs" color="gray.500">
                {new Date(tx.created_at).toLocaleDateString("pt-BR")} •{" "}
                {tx.category.name}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TransactionList;
