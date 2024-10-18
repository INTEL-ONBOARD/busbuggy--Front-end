import { useState } from "react";
import Modal from 'react-modal';

function DeleteAccount() {
  const [isDeleteConfirmationModelOpen, setDeleteConfirmationOpen] = useState(false); // state for delete confirmation modal

  const [showSuccessNotification, setShowSuccessNotification] = useState(false); // state for showing notification
  const [showFailNotification, setShowFailNotification] = useState(false); // state for showing notification

  // Handler for delete confirmation modal's proceed account deletion button
  const handleDeleteConfirmation = () => {
    console.log("considering account deletion...");
    const response = true;
    //handles notificaion type and visibility period
    setDeleteConfirmationOpen(false);
    if(response){
      console.log("Your account has been deleted");
      setShowSuccessNotification(true);    // Show the notification
      setTimeout(() => {    // Hide the notification after 3 seconds
        setShowSuccessNotification(false);
      }, 3000);
    }
    else{
      console.log("Account deletion failed");
      setShowFailNotification(true);    // Show the notification
      setTimeout(() => {    // Hide the notification after 3 seconds
        setShowFailNotification(false);
      }, 3000);
    }
  };

  const handleDeleteCancel = () => {
    console.log("Account deletion canceled");
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      {/*Success Notification that appears on successful account deletion */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg mt-20 mr-10">
          Your account has been successfully deleted.
        </div>
      )}
      {/*Fail Notification that appears on failed account deletion */}
      {showFailNotification && (
        <div className="fixed top-4 right-4 bg-red-400 text-white p-4 rounded shadow-lg mt-20 mr-10">
          Account deletion has failed, please try again.
        </div>
      )}

      <div className="bg-white/[.35] p-8 ml-12 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Delete Your Account</h1>
        <p className="text-gray-700 mb-6">
          We're sad to see you go! Deleting your account is permanent, and the following will happen if you choose to proceed:
        </p>

        <ul className="list-disc ml-5 mb-6 text-gray-700">
          <li>Your personal data (name, email, saved preferences) will be permanently removed from our systems.</li>
          <li>All your travel bookings, history, and loyalty points will be deleted and cannot be restored.</li>
          <li>You will no longer receive any promotional offers, emails, or newsletters from us.</li>
          <li>Any upcoming trips booked through our website will be canceled and refunded according to our cancellation policy.</li>
          <li>If you had a linked travel insurance plan, it will be deactivated, and you will need to contact the provider directly for further assistance.</li>
          <li>Your account will be disabled, and you will lose access to the website's features, including future bookings.</li>
        </ul>

        <p className="text-red-500 border border-orange-500 font-semibold m-6 bg-white/[.15] rounded-md p-6">
          Warning: This action cannot be undone. Once your account is deleted, all associated data will be permanently removed, and you will need to create a new account if you wish to use our services again in the future.
        </p>

        <div className="flex justify-end">
          <button className="h-10 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 mr-8"
            onClick={() => setDeleteConfirmationOpen(true)}
          >
            Delete your Account
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={isDeleteConfirmationModelOpen}
        onRequestClose={() => setDeleteConfirmationOpen(false)}
        contentLabel="Account Deletion Confirmation"
        className="flex rounded w-3/4 mx-auto mt-20 flex-col justify-center items-center"
      >
        <h2 className="m-6 text-red-500 text-3xl">Account Delete Confirmation</h2>
        <div className="bg-black/[.25] border border-gray-100 border-b-2 shadow-sm p-8 w-1/3 rounded-md">
          <h1 className="text-center text-red-500 text-3xl">Warning</h1>
          <p className="text-black m-6 rounded-md p-6 text-lg">
            Are you sure you want to delete your account?
          </p>

          <div className="felx flex-row text-center gap-6 justify-around">
          <button 
            type="button" 
            className="h-10 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 mr-8"
            onClick={handleDeleteConfirmation}
            >
            Proceed Account Deletion
          </button>
          <button 
            type="button" 
            className="w-20 mt-3 h-10 px-4 py-2 m-1 text-gray-600 transition-colors duration-300 transform bg-white rounded-md border border-gray-400 hover:text-black hover:bg-gray-100 hover:border-gray-600 focus:outline-none"
            onClick={handleDeleteCancel}
            >
              Cancel
          </button>

        </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteAccount;
