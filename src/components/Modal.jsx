export default function Modal({
  openModal,
  onOpenModal,
  onDeletePost,
  onDeleteReplyPost,
}) {
  function handleCloseModal() {
    onOpenModal(false);
  }

  function handleDeleteModal() {
    openModal.parentId
      ? onDeleteReplyPost(openModal.parentId, openModal.id)
      : onDeletePost(openModal.id);
    onOpenModal({ openModal: false, id: "", parentId: null });
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <h3 className="modal__title">Delete Comment</h3>
        <p className="modal__description">
          Are you sure you want to delete this comment? This will remove the
          comment and can&lsquo;t be undone
        </p>
        <div className="modal__buttons">
          <button
            className="modal__deny modal__button"
            onClick={handleCloseModal}
          >
            No, Cancel
          </button>
          <button
            className="modal__accept modal__button"
            onClick={handleDeleteModal}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
