type SVGAttributes = Partial<React.SVGProps<SVGSVGElement>>;
type ComponentAttributes = React.RefAttributes<SVGSVGElement> & SVGAttributes;
interface LucideProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  className?: string;
}

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.FC<LucideProps>;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  url: string;
  ogImage: string;
  links: {
    illodev: string;
    github: string;
  };
};
