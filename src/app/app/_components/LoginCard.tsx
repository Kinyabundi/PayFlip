"use client";

import { useAuthenticate, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { FormEvent, useCallback, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext";


export const LogInCard = () => {
  const [email, setEmail] = useState<string>("");
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [],
  );

  const { isAuthenticated, login } = useAuth(); 
  const { authenticate } = useAuthenticate();


  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await login(email);
  };

  // const login = (evt: FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();
  //   authenticate({ type: "email", email });
  // };

  const { status } = useSignerStatus();
  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";
  // [!endregion authenticating]

  return (
    <Card>
      {isAwaitingEmail ? (
        <div className="text-[18px] font-semibold">Check your email!</div>
      ) : (
        <form className="flex flex-col  gap-8 w-full max-w-xs" onSubmit={handleSubmit}>
          <div className="text-[18px] font-semibold mb-4">
              Login
          </div>
          <div className="flex flex-col justify-between gap-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={onEmailChange}
            />
            <Button type="submit">Log in</Button>
          </div>
        </form>
      )}
    </Card>
  );
};