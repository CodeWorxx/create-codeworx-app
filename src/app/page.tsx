import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-white p-2 text-black">
      <Image src="/logo.png" alt="..." height={400} width={400} />

      <p>
        Edit <code>src/app/page.tsx</code> and save to reload.
      </p>
    </main>
  );
};

export default Page;
