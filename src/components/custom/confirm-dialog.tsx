"use client";

import { useModalLayer2 } from "@/hooks";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui";

export const ConfirmDialog = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { confirmDialog },
  } = useModalLayer2();

  const isModalOpen = isOpen && type === "confirm";

  const [isContinue, setIsContinue] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const onContinue = async () => {
    setIsContinue(true);
    if (confirmDialog?.onConfirm) await confirmDialog.onConfirm();
    setIsContinue(false);
    handleClose();
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {confirmDialog?.title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {confirmDialog?.description ||
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mt-0" onClick={handleClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              onContinue();
            }}
            disabled={isContinue}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
