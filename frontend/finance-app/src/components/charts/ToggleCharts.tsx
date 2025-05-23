// src/components/charts/ChartCarouselCard.tsx
import { useState } from "react";
import { Box, IconButton, HStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PieChartCard from "./PieChartCard";

interface Slice {
  category: string;
  porcentage: number;
  color?: string;
}

interface ChartCarouselCardProps {
  expenses: Slice[];
  incomes: Slice[];
}

const ToggleCharts = ({ expenses, incomes }: ChartCarouselCardProps) => {
  const [active, setActive] = useState<0 | 1>(0);
  const data = active === 0 ? expenses : incomes;
  const title = active === 0 ? "Expenses" : "Incomes";

  const prev = () => setActive(active === 0 ? 1 : ((active - 1) as 0 | 1));
  const next = () => setActive(active === 1 ? 0 : ((active + 1) as 0 | 1));

  return (
    <Box
      bg="gray.700"
      p={4}
      rounded="2xl"
      shadow="lg"
      position="relative"
      height="fit"
    >
      <IconButton
        aria-label="Anterior"
        position="absolute"
        top="50%"
        left={2}
        transform="translateY(-50%)"
        onClick={prev}
        size="sm"
        variant="ghost"
      >
        <ChevronLeft size={20} />
      </IconButton>
      <IconButton
        aria-label="Próximo"
        position="absolute"
        top="50%"
        right={2}
        transform="translateY(-50%)"
        onClick={next}
        size="sm"
        variant="ghost"
      >
        <ChevronRight size={20} />
      </IconButton>

      <PieChartCard title={title} data={data} />

      <HStack justify="center" gap={2} mt={3}>
        {[0, 1].map((i) => (
          <Box
            key={i}
            w={3}
            h={3}
            rounded="full"
            bg={i === active ? "white" : "gray.500"}
            cursor="pointer"
            onClick={() => setActive(i as 0 | 1)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default ToggleCharts;
