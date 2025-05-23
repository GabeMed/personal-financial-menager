import { Dialog, Portal, Button, Flex } from "@chakra-ui/react";
import { type TransactionDTO } from "@/types";

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  transaction?: TransactionDTO;
}

const DeleteTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
}: DeleteTransactionDialogProps) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      placement="center"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="md" p={6} rounded="md">
            <Dialog.Title>Delete transaction</Dialog.Title>
            <Dialog.Description mb={4}>
              Are you sure you want to delete “{transaction?.description}”?
            </Dialog.Description>

            <Flex justify="flex-end" gap={3}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm}>
                Delete
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteTransactionDialog;
