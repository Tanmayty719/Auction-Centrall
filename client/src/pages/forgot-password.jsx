const ForgotPasswordNotice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 px-4">

      <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.15)] p-10 max-w-xl text-center">

        <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-6">
          UPCOMING FEATURE
        </div>

        <h1 className="text-4xl font-extrabold text-[#0b132b] mb-4">
          Forgot Password
        </h1>

        <p className="text-slate-600 text-lg leading-relaxed">
          Please create a new account.
          <br />
          Forgot password functionality is not available right now.
        </p>

      </div>

    </div>
  );
};

export default ForgotPasswordNotice;