import {
  Button,
  Field,
  HStack,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NewTransactionSchema,
  type NewTransactionDTO,
} from "@/schemas/transaction";
import { type CategoryDTO, type TransactionDTO } from "@/types/index";
import { useMemo } from "react";

interface Props {
  categories: CategoryDTO[];
  onSubmit: (values: NewTransactionDTO) => Promise<void>;
  onCancel: () => void;
  initial?: TransactionDTO;
}

const TransactionForm = ({
  categories,
  onSubmit,
  onCancel,
  initial,
}: Props) => {
  const defaultValues = useMemo<NewTransactionDTO>(
    () => ({
      type: initial?.type ?? "expense",
      category_id: initial?.category.id ?? categories[0]?.id ?? null,
      description: initial?.description ?? "",
      amount: initial?.amount ?? 0,
      newCategoryName: "",
    }),
    [categories]
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewTransactionDTO>({
    resolver: zodResolver(NewTransactionSchema),
    defaultValues,
  });

  const wantsNew = watch("category_id") === null;

  async function internalSubmit(values: NewTransactionDTO) {
    await onSubmit(values);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(internalSubmit)}>
      <Stack gap="4">
        <Field.Root invalid={!!errors.description}>
          <Field.Label>Description</Field.Label>
          <Input {...register("description")} />
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.amount}>
          <Field.Label htmlFor="amount">Value</Field.Label>
          <Input
            id="amount"
            type="number"
            step="0.5"
            {...register("amount", { valueAsNumber: true })}
          />
          <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Type</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field {...register("type")}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.category_id}>
          <Field.Label>Category</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              {...register("category_id", {
                setValueAs: (v) => (v === "new" ? null : Number(v)),
              })}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
              <option value="new">+ New…</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {wantsNew && (
          <Field.Root invalid={!!errors.newCategoryName}>
            <Field.Label>New category name</Field.Label>
            <Input {...register("newCategoryName")} />
            <Field.ErrorText>{errors.newCategoryName?.message}</Field.ErrorText>
          </Field.Root>
        )}

        <HStack justify="flex-end">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            loading={isSubmitting}
            data-testid="submit-btn"
          >
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};

export default TransactionForm;
