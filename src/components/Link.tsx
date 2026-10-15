import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigate } from '../router';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

/** An in-app link: a real anchor for crawlers and new tabs, client-side for plain clicks. */
export default function Link({ to, onClick, target, ...props }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (target && target !== '_self') return;

    const url = new URL(to, window.location.href);
    if (url.origin !== window.location.origin) return;

    const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
    // Fragment links on the current page are handled natively by the browser.
    if (samePage && url.hash) return;

    event.preventDefault();
    navigate(to);
  };

  return <a {...props} href={to} target={target} onClick={handleClick} />;
}
