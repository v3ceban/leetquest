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
import { Icon } from "@/components/icon";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Spinner } from "@/components/ui/spinner";
import {
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { providers } from "@/lib/auth";

export const AuthButton = ({
  session,
  className,
  variant,
  size,
  children,
  auto,
}) => {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(auto && pathname === auto);

  const handleLogin = (provider) => {
    if (providers.includes(loading)) return;
    setLoading(provider);
    signIn(provider.toLowerCase(), { redirectTo: "/dashboard" });
  };

  const handleLogout = () => {
    if (loading === "logout") return;
    setLoading("logout");
    signOut({ redirectTo: "/" });
  };

  if (session) {
    return (
      <LogoutButton
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
              <Icon icon={faRightToBracket} />
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
                  <Icon icon={provider === "Google" ? faGoogle : faGithub} />
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
  auto: PropTypes.bool,
  children: PropTypes.string,
};

const Loading = () => {
  return (
    <>
      <Spinner className="mr-1 fill-dark inline-block" />
      Loading...
    </>
  );
};

const LogoutButton = ({ loading, variant, size, onLogout }) => {
  return (
    <Button onClick={onLogout} variant={variant} size={size}>
      {loading === "logout" ? (
        <Loading />
      ) : (
        <>
          <Icon icon={faRightFromBracket} /> {"Logout"}
        </>
      )}
    </Button>
  );
};

LogoutButton.propTypes = {
  loading: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onLogout: PropTypes.func,
};
