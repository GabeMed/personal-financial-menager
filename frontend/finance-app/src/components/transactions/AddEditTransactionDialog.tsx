import { Dialog, Portal, Spinner, Box, Text } from "@chakra-ui/react";
import { type TransactionDTO } from "@/types";
import useAddFormTransaction from "@/hooks/useAddFormTransaction";
import useUpdateTransaction from "@/hooks/useUpdateTransaction";
import TransactionForm from "./TransactionForm";
import { type NewTransactionDTO } from "@/schemas/transaction";
import useCategories from "@/hooks/useCategories";
import { useCallback } from "react";

interface AddEditTransactionDialogProps {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose(): void;
  initial?: TransactionDTO;
}

const AddEditTransactionDialog = ({
  mode,
  isOpen,
  onClose,
  initial,
}: AddEditTransactionDialogProps) => {
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const saveMutation = useAddFormTransaction();
  const updateMutation = useUpdateTransaction();

  const handleSubmit = useCallback(
    async (values: NewTransactionDTO) => {
      if (mode === "create") {
        await saveMutation.mutateAsync(values);
      } else if (initial) {
        await updateMutation.mutateAsync({ id: initial.id, body: values });
      }
      onClose();
    },
    [mode, saveMutation, updateMutation, initial, onClose]
  );

  const loading = catsLoading;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      placement="center"
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                {mode === "create" ? "New transaction" : "Edit transaction"}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {loading ? (
                <Box py={6} textAlign="center">
                  <Spinner />
                  <Text mt={2} color="gray.400">
                    Loading ...
                  </Text>
                </Box>
              ) : (
                <TransactionForm
                  categories={categories}
                  initial={initial}
                  onSubmit={handleSubmit}
                  onCancel={onClose}
                />
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddEditTransactionDialog;
