"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { loginAction, type LoginState } from "@/app/dashboard/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Signing in…
        </>
      ) : (
        <>
          Sign in to dashboard <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

export default function LoginForm({ configured }: { configured: boolean }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <form action={formAction} className="space-y-5">
      {!configured && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <p className="font-semibold">Admin access is not configured.</p>
          <p className="mt-1 leading-relaxed">
            Add <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px] dark:bg-amber-500/20">ADMIN_PASSWORD</code>{" "}
            to <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px] dark:bg-amber-500/20">.env.local</code>{" "}
            (and to your Vercel environment variables), then restart the server.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
          Admin password
        </label>
        <div className="relative">
          <Lock
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-amber-500/60"
            placeholder="Enter your password"
          />
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-muted-foreground">
        This area is for AUZBIZ staff. Sessions expire after 7 days.
      </p>
    </form>
  );
}
