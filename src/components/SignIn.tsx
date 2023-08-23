import Link from 'next/link';
import { Icons } from './Icons';
import UserAuthForm from './UserAuthForm';

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[w-400px]">
      <div className="flex flex-col space-y-3 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="font-semibold text-3xl tracking-tight">Welcome Back!</h1>

        {/* Sign in */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm mt-3 text-zinc-700">
          New to Stoic Hub?{' '}
          <Link
            href="/sign-up"
            className="text-sm rounded-lg transition-all bg-slate-700/10 hover:bg-slate-700/20 p-1 hover:p-[7px] no-underline shadow-md"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
