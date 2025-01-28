import { useState, useEffect } from "react";
import "../styles/Toast.css";

export const Toast = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000); // Desaparece después de 3 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
    </div>
  );
};
