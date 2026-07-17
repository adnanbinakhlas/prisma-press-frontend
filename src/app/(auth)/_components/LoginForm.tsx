"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconLogin2,
  IconMail,
} from "@tabler/icons-react";
import { useState } from "react";
import { loginAction } from "../_actions/loginAction";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={loginAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <div className="relative">
          <IconMail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <IconLock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
      </div>

      <Button className="w-full gap-2">
        <IconLogin2 size={18} />
        Sign In
      </Button>
    </form>
  );
}
