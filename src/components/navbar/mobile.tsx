"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  GithubIcon,
  HamburgerIcon,
} from "lucide-react";
import { marketingConfig } from "@/config/marketing.config";
import { siteConfig } from "@/config/site.config";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggler from "@/components/theme/toggler";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SidebarItem } from "@/types";
import { docsConfig } from "@/config/docs.config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block md:hidden size-8">
        <HamburgerIcon className="mx-1" />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="w-full text-left mb-2">
            <Link href="/">
              <h1 className="text-lg md:text-xl font-bold">
                {siteConfig.name}
              </h1>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col">
          {marketingConfig.map((item) => (
            <NavItemComponent
              key={item.title}
              title={item.title}
              href={item.href ?? ""}
              setOpen={setOpen}
            />
          ))}
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col">
          {docsConfig.map((item) => (
            <MobileSidebarItem key={item.title} item={item} setOpen={setOpen} />
          ))}
        </div>
        <Separator className="my-2" />
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full" asChild>
            <a href={siteConfig.socials.github} target="_blank">
              <GithubIcon />
            </a>
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full" asChild>
            <a href={siteConfig.socials.x} target="_blank">
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--foreground)"
                className="size-3"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </a>
          </Button>
          <ThemeToggler />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const NavItemComponent = ({
  title,
  href,
  setOpen,
}: {
  title: string;
  href: string;
  setOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const active =
    pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      href={href}
      className={cn(
        "relative py-1 cursor-pointer",
        "transition-all duration-200 ease-out"
      )}
      onClick={() => setOpen(false)}
    >
      <span
        className={cn(
          "relative z-10 mix-blend-difference text-background dark:text-foreground/70",
          active ? "text-background dark:text-foreground font-semibold" : ""
        )}
      >
        {title}
      </span>
    </Link>
  );
};

const MobileSidebarItem = ({
  item,
  setOpen,
}: {
  item: SidebarItem;
  setOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const external = item.href && item.external ? true : false;
  const isActive = pathname === item.href;

  const activeClass = isActive ? "text-foreground" : "text-muted-foreground";
  const renderContent = () => {
    return external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 w-full"
        onClick={() => setOpen(false)}
      >
        {item.icon && <item.icon size={16} strokeWidth={1.4} />}
        {item.title}
      </a>
    ) : item.href ? (
      <Link
        href={item.href}
        className="flex items-center gap-2 w-full"
        onClick={() => setOpen(false)}
      >
        {item.icon && <item.icon size={16} strokeWidth={1.4} />}
        {item.title}
      </Link>
    ) : (
      <div className="flex items-center gap-2 w-full">
        {item.icon && <item.icon size={16} strokeWidth={1.4} />}
        <span>{item.title}</span>
      </div>
    );
  };

  if (item.items && item.items.length > 0) {
    return (
      <div className="w-full flex flex-col">
        <h1
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "p-0 justify-between gap-2 w-full rounded-lg bg-transparent hover:bg-transparent",
            activeClass
          )}
        >
          {item.title}
        </h1>
        <div className="flex flex-col pl-2">
          {item.items.map((i) => (
            <MobileSidebarItem key={i.title} item={i} setOpen={setOpen} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "p-0 justify-between gap-2 w-full rounded-lg bg-transparent hover:bg-transparent",
        activeClass
      )}
    >
      {renderContent()}
    </div>
  );
};
