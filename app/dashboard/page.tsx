"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if(!auth) {
          router.push("/login")
        }
      }, [router])

    return(
        <div className="h-[100vh] w-[100%]"></div>
    )
}