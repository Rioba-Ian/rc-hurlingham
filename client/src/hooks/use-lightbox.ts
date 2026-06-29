import { useState, useEffect } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
}

/**
 * A custom hook to manage the state and behavior of a lightbox modal.
 * Handles state, Escape keypress closing, and scroll locking.
 */
export function useLightbox() {
  const [selectedImage, setSelectedImage] = useState<LightboxImage | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Lock body scroll when the lightbox is open
  useEffect(() => {
    if (!selectedImage) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [selectedImage]);

  const open = (src: string, alt: string) => setSelectedImage({ src, alt });
  const close = () => setSelectedImage(null);

  return {
    selectedImage,
    isOpen: !!selectedImage,
    open,
    close,
  };
}
