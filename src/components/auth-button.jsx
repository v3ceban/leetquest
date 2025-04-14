"use client";

import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn, signOut } from "next-auth/react";
import {
  FaGithub,
  FaGoogle,
  FaRightFromBracket,
  FaRightToBracket,
} from "react-icons/fa6";
import { Loading } from "@/components/ui/spinner";
import { usePathname, useSearchParams } from "next/navigation";
import { providers } from "@/lib/auth";

export const AuthButton = ({
  session,
  className,
  variant,
  size,
  children,
  primary = false,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(pathname === "/login" && primary);

  const handleLogin = (provider) => {
    if (providers.includes(loading)) return;
    setLoading(provider);
    const redirectUrl = ["/login", "/"].includes(pathname)
      ? "/dashboard"
      : `${pathname}?${searchParams.toString()}`;
    signIn(provider.toLowerCase(), { redirectTo: redirectUrl });
  };

  const handleLogout = () => {
    if (loading === "logout") return;
    setLoading("logout");
    signOut({ redirectTo: "/" });
  };

  if (session) {
    return (
      <LogoutButton
        className={className}
        loading={loading}
        variant={variant}
        size={size}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className} variant={variant} size={size}>
          {children ? (
            children
          ) : (
            <>
              <FaRightToBracket className="mr-1" />
              Login
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Login</DialogTitle>
          <DialogDescription className="text-base text-foreground">
            Please login with your Goolge or GitHub account.
          </DialogDescription>
        </DialogHeader>
        <main className="grid grid-cols-2 gap-4 justify-center items-center h-full">
          {providers.map((provider) => (
            <Button key={provider} onClick={() => handleLogin(provider)}>
              {loading === provider ? (
                <Loading />
              ) : (
                <>
                  {provider === "Google" ? (
                    <FaGoogle className="mr-1" />
                  ) : (
                    <FaGithub className="mr-1" />
                  )}
                  {provider}
                </>
              )}
            </Button>
          ))}
        </main>
      </DialogContent>
    </Dialog>
  );
};

AuthButton.propTypes = {
  session: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string,
  primary: PropTypes.bool,
};

const LogoutButton = ({ className, loading, variant, size, onLogout }) => {
  return (
    <Button
      className={className}
      onClick={onLogout}
      variant={variant}
      size={size}
    >
      {loading === "logout" ? (
        <Loading />
      ) : (
        <>
          <FaRightFromBracket className="mr-1" /> {"Logout"}
        </>
      )}
    </Button>
  );
};

LogoutButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onLogout: PropTypes.func,
};
