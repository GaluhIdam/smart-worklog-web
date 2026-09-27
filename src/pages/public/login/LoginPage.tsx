import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import type { ValidationErrorResponse } from "../../../common/response/ValidationErrorResponse";
import { authService } from "../../../services/Auth.service";
import { type LoginFormData, loginSchema } from "./validation/auth.schema";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, authenticated, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  if (loading) {
    return null;
  }

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
        remember: data.remember,
      });
      login(response.data);
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationErrorResponse>(error)) {
        setErrorMessage("Invalid email or password.");
        return;
      }
      setErrorMessage("Unable to sign in. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950 shadow-lg">
                  S
                </div>

                <span className="text-lg font-semibold tracking-tight text-white">Smart WorkLog</span>
              </div>

              <div className="mt-24 max-w-xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Modern business platform
                </div>

                <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                  Everything your business needs,
                  <span className="text-slate-400"> in one workspace.</span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                  Manage your operations, customers, inventory and team from one secure and intelligent platform.
                </p>

                <div className="mt-10 space-y-4">
                  {["Centralized business operations", "Real-time insights and reporting", "Secure team collaboration"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>© 2026 Smart Worklog. All rights reserved.</span>
              <div className="flex gap-5">
                <a href="/privacy" className="hover:text-slate-300">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-slate-300">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-10 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white">S</div>
                <span className="text-lg font-semibold tracking-tight">Smart Worklog</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <LockKeyhole className="h-5 w-5 text-slate-700" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to your workspace to continue.</p>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-1.5 bg-red-100 font-medium text-red-500 px-3 py-1.5 rounded-md mb-5">
                <AlertCircle size={16} strokeWidth={2} /> <span>{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  {...register("email")}
                  className={`h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 ${
                    errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/5" : "border-slate-200"
                  }`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password")}
                    className={`h-12 w-full rounded-xl border bg-white px-3.5 pr-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-950 focus:ring-4 focus:ring-slate-950/5 ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500/5" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
                  />
                  <span className="text-sm text-slate-600">Keep me signed in</span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/10 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-slate-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-slate-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
