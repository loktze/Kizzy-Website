// src/components/Portal.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    let el = document.getElementById('portal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'portal';
      // Apply fixed positioning and high z-index to ensure it's on top
      el.style.position = 'fixed';
      el.style.top = '0';
      el.style.left = '0';
      el.style.width = '100%';
      el.style.height = '100%';
      el.style.pointerEvents = 'none'; // Allow clicks to pass through unless overridden
      el.style.zIndex = '9999'; // Ensure it's on top of other elements
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.padding = '1rem'; // Optional: Add padding if needed
      document.body.appendChild(el);
    }
    setPortalElement(el);
  }, []);

  if (!mounted || !portalElement) return null;

  return createPortal(children, portalElement);
};

export default Portal;
