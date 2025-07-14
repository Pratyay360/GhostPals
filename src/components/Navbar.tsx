import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle/themeToggle";

export default function Navbar() {
    return(
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container h-14 flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink className="font-bold" asChild>
                  <Link href="/" >
                      Ghost Pals
                  </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList className="hidden md:flex">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                  <Link href="/calculate">
                      Calculate
                  </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>
    );
}
