"use client";

export default function Spinner({ text = "Načítání..." }: { text?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div className="spinner" />
      <p>{text}</p>

      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #ccc;
          border-top: 4px solid #028090;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}