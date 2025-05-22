import { Dialog, Portal, Spinner } from "@chakra-ui/react";
import useCategories from "@/hooks/useCategories";
import useAddFormTransaction from "@/hooks/useAddFormTransaction";
import useUpdateTransaction from "@/hooks/useUpdateTransaction";
import TransactionForm from "./TransactionForm";
import type { NewTransactionDTO } from "@/schemas/transaction";
import type { TransactionDTO } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initial?: TransactionDTO;
}

const AddTransactionDialog = ({ isOpen, onClose, initial }: Props) => {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const { mutateAsync: saveTransaction } = useAddFormTransaction();
  const { mutateAsync: updateTransaction } = useUpdateTransaction();

  const handleSubmit = async (values: NewTransactionDTO) => {
    await saveTransaction(values);
    if (initial) {
      await updateTransaction({ id: initial.id, body: values });
    } else {
      await saveTransaction(values);
    }
    onClose();
  };

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
              <Dialog.Title>New transaction</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {isLoadingCategories ? (
                <Spinner />
              ) : (
                <TransactionForm
                  categories={categories}
                  onSubmit={handleSubmit}
                  onCancel={onClose}
                  initial={initial}
                />
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddTransactionDialog;
