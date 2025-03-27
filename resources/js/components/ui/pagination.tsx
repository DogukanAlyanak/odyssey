import { Link } from '@inertiajs/react';
import React from 'react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  className?: string;
}

export function Pagination({ links, className }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (links.length <= 3) return null;

  return (
    <div className={cn('flex items-center justify-center space-x-1', className)}>
      {links.map((link, i) => {
        const isCurrentPage = link.active;
        const isDisabled = !link.url;
        const isPrevious = i === 0;
        const isNext = i === links.length - 1;

        // Don't show the 'Next &raquo;' or '&laquo; Previous' text
        if (isPrevious || isNext) {
          const label = isPrevious ? '←' : '→';

          return (
            <PaginationLink
              key={i}
              href={link.url}
              isDisabled={isDisabled}
              isActive={isCurrentPage}
            >
              {label}
            </PaginationLink>
          );
        }

        return (
          <PaginationLink
            key={i}
            href={link.url}
            isDisabled={isDisabled}
            isActive={isCurrentPage}
          >
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
          </PaginationLink>
        );
      })}
    </div>
  );
}

interface PaginationLinkProps {
  href: string | null;
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}

function PaginationLink({ href, children, isActive, isDisabled }: PaginationLinkProps) {
  const className = cn(
    'inline-flex h-8 w-8 items-center justify-center rounded text-sm',
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800',
    isDisabled && 'pointer-events-none opacity-50',
  );

  if (isDisabled || !href) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
