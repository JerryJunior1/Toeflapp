import Link from "next/link";

export default function Login() {
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-center relative py-12 px-4 md:px-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-tertiary-container opacity-[0.03] rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-headline text-[32px] font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-[18px] text-on-surface-variant">Continue your preparation journey.</p>
        </div>

        <div className="card rounded-xl overflow-hidden">
          <div className="p-8 md:p-10 space-y-6">
            <form className="space-y-6">
              <div>
                <label className="block text-[14px] font-medium text-on-surface mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@university.edu"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-surface-variant rounded-md bg-surface text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[16px]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[14px] font-medium text-on-surface" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-[12px] font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-surface-variant rounded-md bg-surface text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[16px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-white bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-[14px] font-medium transition-colors"
              >
                Log In
              </button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-surface-variant"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface px-4 text-[12px] font-semibold text-on-surface-variant">
                  or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center w-full py-2.5 px-4 border border-surface-variant rounded-md shadow-sm bg-surface text-[14px] font-medium text-on-surface hover:bg-surface-container-low transition-colors group">
                <span className="material-symbols-outlined text-[18px] mr-2 text-on-surface-variant group-hover:text-on-surface">login</span>
                <span>Google</span>
              </button>
              <button className="flex justify-center items-center w-full py-2.5 px-4 border border-surface-variant rounded-md shadow-sm bg-surface text-[14px] font-medium text-on-surface hover:bg-surface-container-low transition-colors group">
                <span className="material-symbols-outlined text-[18px] mr-2 text-on-surface-variant group-hover:text-on-surface">file_download</span>
                <span>Apple</span>
              </button>
            </div>
          </div>

          <div className="px-8 py-6 bg-surface-container-low border-t border-surface-variant text-center">
            <p className="text-[14px] text-on-surface-variant">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-primary hover:text-primary-container transition-colors ml-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
           <Link href="/" className="text-[14px] text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Return to Home
           </Link>
        </div>
      </div>
    </main>
  );
}
