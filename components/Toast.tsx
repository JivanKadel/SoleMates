"use client";
import React, { useEffect, useState } from "react";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

type ToastProps = {
  title: string;
  desc?: string;
  onClose?: () => void;
  unmountMs?: number; // animation time
  autoCloseMs?: number; // auto close time (default 500ms)
  position?: Position;
  className?: string;
  type?: "info" | "success" | "error";
};

export default function Toast({
  title,
  desc,
  onClose,
  unmountMs = 500,
  autoCloseMs = 4000,
  position = "bottom-right",
  className,
  type = "info",
}: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // fade-in animation
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setVisible(false);

    setTimeout(() => {
      onClose?.();
    }, unmountMs);
  };

  // auto close
  useEffect(() => {
    const auto = setTimeout(() => handleClose(), autoCloseMs);
    return () => clearTimeout(auto);
  }, []);

  // position styles
  const posStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 9999,
    margin: 16,
    ...(position.includes("bottom") ? { bottom: 0 } : { top: 0 }),
    ...(position.includes("right") ? { right: 0 } : { left: 0 }),
  };

  // type colors
  const colorMap = {
    success: "#16a34a",
    error: "#ef4444",
    info: "#2563eb",
  };
  const borderColor = colorMap[type];

  return (
    <div style={posStyle} className={className}>
      <div
        role="status"
        aria-live="polite"
        style={{
          minWidth: 280,
          maxWidth: 420,
          background: "white",
          color: "#111827",
          borderRadius: 10,
          borderLeft: `5px solid ${borderColor}`,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
          padding: 14,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          transition: `transform ${unmountMs}ms ease, opacity ${unmountMs}ms ease`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          pointerEvents: closing ? "none" : "auto",
          marginBottom: 12,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: borderColor,
            color: "white",
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          {type === "success" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <polyline
                points="88 136 112 160 168 104"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </svg>
          )}
          {type === "error" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <rect
                x="40"
                y="40"
                width="176"
                height="176"
                rx="8"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="160"
                y1="96"
                x2="96"
                y2="160"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="96"
                y1="96"
                x2="160"
                y2="160"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </svg>
          )}
          {type === "info" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <path
                d="M120,120a8,8,0,0,1,8,8v40a8,8,0,0,0,8,8"
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <circle
                cx="124"
                cy="84"
                r="12"
                stroke="currentColor"
                fill="currentColor"
              />
            </svg>
          )}
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm break-words">{title}</div>
          {desc && (
            <div className="text-gray-600 text-xs mt-1 leading-snug break-words">
              {desc}
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          aria-label="Dismiss"
          onClick={handleClose}
          className="
            ml-2 
            w-8 h-8 
            flex items-center justify-center 
            rounded-md 
            hover:bg-gray-200 
            transition-colors
            cursor-pointer
          "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <rect
              x="40"
              y="40"
              width="176"
              height="176"
              rx="8"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <line
              x1="160"
              y1="96"
              x2="96"
              y2="160"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
            <line
              x1="96"
              y1="96"
              x2="160"
              y2="160"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
