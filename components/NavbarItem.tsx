
interface NavbarItemProps {
    label: string;
}



const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 teansition">
      {label}
    </div>
  );
}

export default NavbarItem