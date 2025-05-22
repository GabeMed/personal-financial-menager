import { Dialog, Portal, Spinner } from "@chakra-ui/react";
import useCategories from "@/hooks/useCategories";
import useAddFormTransaction from "@/hooks/useAddFormTransaction";
import TransactionForm from "./TransactionForm";
import type { NewTransactionDTO } from "@/schemas/transaction";

const AddTransactionDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const { mutateAsync: saveTransaction } = useAddFormTransaction();

  const handleSubmit = async (values: NewTransactionDTO) => {
    await saveTransaction(values);
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
