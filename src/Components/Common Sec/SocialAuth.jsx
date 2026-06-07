"use client";

import { useState } from "react";
import { Button, toast } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SocialAuth() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const handleSocialSignIn = async (provider) => {
    if (provider === "google") setIsGoogleLoading(true);
    if (provider === "github") setIsGithubLoading(true);

    try {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/", // লগইন সফল হওয়ার পর যেখানে রিডাইরেক্ট হবে
      });
    } catch (err) {
      console.error(err);
      toast("Social Authentication Failed", {
        description: `Could not sign in with ${provider}. Please try again.`,
        variant: "flat",
        color: "danger",
        indicator: <FiAlertCircle />,
      });
    } finally {
      setIsGoogleLoading(false);
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Google Button */}
      <Button
        variant="bordered"
        size="lg"
        radius="xl"
        isLoading={isGoogleLoading}
        onPress={() => handleSocialSignIn("google")}
        className="w-full border-gray-200 text-gray-700 font-medium hover:bg-gray-50 bg-white"
        startContent={!isGoogleLoading && <FcGoogle className="text-xl" />}
      >
        Continue with Google
      </Button>

      {/* GitHub Button */}
      <Button
        variant="bordered"
        size="lg"
        radius="xl"
        isLoading={isGithubLoading}
        onPress={() => handleSocialSignIn("github")}
        className="w-full border-gray-200 text-gray-700 font-medium hover:bg-gray-50 bg-white"
        startContent={!isGithubLoading && <FaGithub className="text-xl text-black" />}
      >
        Continue with GitHub
      </Button>
    </div>
  );
}