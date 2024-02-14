import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  }
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

 
  return (
    <div>
      <Button onClick={handleOpenModal}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <CreateCabinForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
