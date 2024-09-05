import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

interface UserMenuInterface {}

const UserMenu: React.FC<UserMenuInterface> = ({}) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/"

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const MenuIcon = isHomePage ? <MenuOutlinedIcon fontSize="small" htmlColor="white" /> : <MenuOutlinedIcon fontSize="small" htmlColor="black" />;


  return (
    <div className="relative">
      <div onClick={toggleOpen} className="flex flex-row items-center gap-3">
        <div
          role="button"
          aria-label="Open menu"  
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md "
        >
          {MenuIcon}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-14 z-10 w-40 overflow-hidden rounded-xl bg-white text-sm shadow-md"
          >
            <div className="z-10 flex cursor-pointer flex-col">
              <Link href={"/about"}>
                <div className="px-4 py-3 font-semibold transition hover:bg-neutral-100">
                  About
                </div>
              </Link>
              <Link href={"/blog"}>
                <div className="px-4 py-3 font-semibold transition hover:bg-neutral-100">
                  Blog
                </div>
              </Link>
              <Link href={"/contact"}>
                <div className="px-4 py-3 font-semibold transition hover:bg-neutral-100">
                  Contact
                </div>
              </Link>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
