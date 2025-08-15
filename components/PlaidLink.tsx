import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ExtendedPlaidLinkProps extends PlaidLinkProps {
  className?: string;
}

const PlaidLink = ({ user, variant, className }: ExtendedPlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        const data = await createLinkToken(user);
        if (data?.linkToken) {
          setToken(data.linkToken);
        } else {
          setError("Failed to initialize bank connection");
        }
      } catch (err) {
        console.error("Error getting link token:", err);
        setError("Failed to initialize bank connection");
      }
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });

        // Force a refresh and redirect
        router.refresh();
        router.push("/");
      } catch (err) {
        console.error("Error connecting bank:", err);
        setError("Failed to connect bank account");
      }
    },
    [user, router]
  );

  const onExit = useCallback(() => {
    // Optional: Handle user exit
    console.log("User exited Plaid Link flow");
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onExit,
    onEvent: (eventName) => {
      console.log("Plaid Link event:", eventName);
    },
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-2 px-4">{error}</p>}
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className={cn("plaidlink-primary", className)}
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => open()}
          variant="ghost"
          className={cn(
            "plaidlink-ghost flex items-center gap-2 w-full",
            className
          )}
        >
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      ) : (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className={cn("plaidlink-default flex items-center gap-2", className)}
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
