import {
  AlertTriangle,
  ArrowRight,
  Check,
  Globe,
  Mail,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Menu,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = typeof LucideIcon;

export const Icons = {
  logo: Command,
  close: X,
  menu: Menu,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  miniQrCode: ({ ...props }: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clip-path="url(#clip0_188_727)">
    <path d="M14.25 18.75H12.75V17.25H14.25V18.75ZM12.75 13.5H11.25V17.25H12.75V13.5ZM18.75 12H17.25V15H18.75V12ZM17.25 10.5H15.75V12H17.25V10.5ZM8.25 12H6.75V13.5H8.25V12ZM6.75 10.5H5.25V12H6.75V10.5ZM12 6.75H13.5V5.25H12V6.75ZM6.375 6.375V8.625H8.625V6.375H6.375ZM9.75 9.75H5.25V5.25H9.75V9.75ZM6.375 15.375V17.625H8.625V15.375H6.375ZM9.75 18.75H5.25V14.25H9.75V18.75ZM15.375 6.375V8.625H17.625V6.375H15.375ZM18.75 9.75H14.25V5.25H18.75V9.75ZM17.25 17.25V15H14.25V16.5H15.75V18.75H18.75V17.25H17.25ZM15.75 12H12.75V13.5H15.75V12ZM12.75 10.5H8.25V12H9.75V13.5H11.25V12H12.75V10.5ZM13.5 9.75V8.25H12V6.75H10.5V9.75H13.5ZM8.0625 6.9375H6.9375V8.0625H8.0625V6.9375ZM8.0625 15.9375H6.9375V17.0625H8.0625V15.9375ZM17.0625 6.9375H15.9375V8.0625H17.0625V6.9375Z" fill="currentColor"/>
      <path d="M23 1H1V23H23V1Z" stroke="currentColor" stroke-width="2"/>
      </g>
      <defs>
      <clipPath id="clip0_188_727">
      <rect width="24" height="24" fill="transparent"/>
      </clipPath>
      </defs>
    </svg>
  ),
  miniCopy: ({ ...props }: LucideProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* <g clip-path="url(#clip0_188_720)">
    <path d="M15.3598 4.56006H5.27979V16.0801H6.71979V6.00006H15.3598V4.56006ZM18.9598 7.44006H8.15979V20.4001H18.9598V7.44006ZM17.5198 18.9601H9.59979V8.88006H17.5198V18.9601Z" fill="#0F0C00"/>
    <path d="M23.0399 1.91992H1.91992V23.0399H23.0399V1.91992Z" stroke="#0F0C00" stroke-width="2"/>
    </g> */}
    <g clip-path="url(#clip1_188_720)">
    <path d="M14.3998 3.6001H4.31982V15.1201H5.75982V5.0401H14.3998V3.6001ZM17.9998 6.4801H7.19982V19.4401H17.9998V6.4801ZM16.5598 18.0001H8.63982V7.9201H16.5598V18.0001Z" fill="currentColor"/>
    <path d="M22.08 0.959961H0.959961V22.08H22.08V0.959961Z" stroke="currentColor" stroke-width="2"/>
    </g>
    <defs>
    <clipPath id="clip0_188_720">
    <rect width="23.04" height="23.04" fill="white" transform="translate(0.959961 0.959961)"/>
    </clipPath>
    <clipPath id="clip1_188_720">
    <rect width="23.04" height="23.04" fill="transparent"/>
    </clipPath>
    </defs>
    </svg>
  ),
  shield: ({ ...props }: LucideProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="currentColor"/>
    </svg>
  ),
  zcashQrCode: ({ ...props }: LucideProps) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C0 9.86741 9.86741 0 22 0C34.1326 0 44 9.86741 44 22C44 34.1326 34.1326 44 22 44C9.86741 44 0 34.1326 0 22ZM29.8475 11.7904V15.1384L20.5358 27.7681H29.8475V32.2088H23.8447V35.8885H20.1553V32.2088H14.1525V28.8607L23.4544 16.2311H14.1525V11.7904H20.1553V8.10089H23.8447V11.7904H29.8475Z" fill="currentColor" />
    </svg>
  ),
  zcashQrCodeGradient: ({ ...props }: LucideProps) => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="qrCodeLinearGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffe479"/>
          <stop offset="100%" stop-color="#f4b728"/>
        </linearGradient>
      </defs>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 22C0 9.86741 9.86741 0 22 0C34.1326 0 44 9.86741 44 22C44 34.1326 34.1326 44 22 44C9.86741 44 0 34.1326 0 22ZM29.8475 11.7904V15.1384L20.5358 27.7681H29.8475V32.2088H23.8447V35.8885H20.1553V32.2088H14.1525V28.8607L23.4544 16.2311H14.1525V11.7904H20.1553V8.10089H23.8447V11.7904H29.8475Z" fill="url(#qrCodeLinearGradient)" />
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  globe: Globe,
  mail: Mail,
}
