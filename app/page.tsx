"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if(!auth) {
      router.push("/login")
    } else {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="dark:bg-black">
    </div>
  );
}
