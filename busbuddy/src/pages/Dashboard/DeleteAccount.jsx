function DeleteAccount() {




    return(
      <>
      <div className="bg-white/[.35] p-8 ml-12">

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
          <button className="h-10 px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-red-600 transition duration-300 mr-8">
            Proceed Account Deletion
          </button>
        </div>
      </div>
      </>
    );
  }
  
  export default DeleteAccount;
  