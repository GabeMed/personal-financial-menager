import { Text, Card, Spinner } from "@chakra-ui/react";

interface BalanceCardProps {
  value: number;
  isLoading: boolean;
}

export function BalanceCard({ value, isLoading }: BalanceCardProps) {
  if (isLoading) return <Spinner size="lg" />;
  return (
    <Card.Root borderRadius="2xl">
      <Card.Body>
        <Text fontSize="sm" color="gray.400">
          Balance
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
