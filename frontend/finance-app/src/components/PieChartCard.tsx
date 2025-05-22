import { Box, Spinner, Text } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

interface Slice {
  category: string;
  porcentage: number; // 0–100
}

const COLORS = ["#38B2AC", "#ED8936", "#63B3ED", "#E53E3E", "#718096"];

const PieChartCard = ({
  data,
  isLoading,
}: {
  data: Slice[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Box
        bg="gray.700"
        p={6}
        rounded="2xl"
        shadow="lg"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box
        bg="gray.700"
        p={6}
        rounded="2xl"
        shadow="lg"
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="sm" color="gray.400">
          No expenses registered
        </Text>
      </Box>
    );
  }

  return (
    <Box bg="gray.700" p={4} rounded="2xl" shadow="lg">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="pct"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
            <Label value="Expenses (%)" position="center" fill="#CBD5E0" />
          </Pie>
          <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartCard;
