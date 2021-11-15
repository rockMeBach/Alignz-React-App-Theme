import React from "react";

const OTPVerification = () => {
  const closeModal = () => {
      
    document.getElementById("staticBackdropLive").style.display = "none";
  };

  return (
    <div>
      <div
        class="modal fade show blur"
        id="staticBackdropLive"
        style={{ display: "block" }}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-modal="true"
        role="dialog"
        onDoubleClick={(e) => e.preventDefault()}
      >
        <div class="modal-dialog">
          <div
            class="modal-content"
            style={{ width: "max-content", padding: "0.5rem 1.5rem" }}
          >
            <div class="modal-header"></div>
            <div class="modal-body" style={{ margin: "0" }}></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OTPVerification;
