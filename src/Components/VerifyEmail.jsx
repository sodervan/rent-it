const VerifyEmail = () => {
  return (
    <>
      <div className="pt-24 w-full h-screen flex items-center flex-col gap-3 px-6">
        <div>
          <img
            src="https://res.cloudinary.com/dmlgns85e/image/upload/v1727951271/Vector_hhqepo.png"
            alt="#"
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Verify Your Email Address</p>
        </div>
        <div>
          <p className="text-center">
            We’ve sent a verification link to [user's email address]. Please
            check your inbox and click the link to verify your email.
          </p>
        </div>
        <button className="px-3 py-2 bg-secondaryPurple text-primaryPurple rounded-lg">
          Resend verification link
        </button>
      </div>
    </>
  );
};
export default VerifyEmail;
