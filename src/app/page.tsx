"use client";
import { useState } from "react";

function Page() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-zinc-700 p-4">
        <form
          className="flex gap-x-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            console.log(prompt);

            try {
              const res = await fetch("api/generate", {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              console.log(data);

              setImage(data.url);
            } catch (error) {
              console.log(error);
            }

            setLoading(false);
            setPrompt("");
          }}
        >
          <input
            type="text"
            placeholder="Write your prompt"
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-zinc-950 text-white px-3 py-2 my-2 flex-grow"
            value={prompt}
          />

          <button
            className="bg-sky-950 text-white px-3 py-2 my-2 disabled:opacity-50 
          disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading" : "Generate"}{" "}
          </button>
        </form>
        {image && <img src={image} alt="Generate Image" />}
      </div>
    </div>
  );
}

export default Page;
