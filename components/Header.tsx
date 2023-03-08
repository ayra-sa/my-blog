import Link from "next/link"
import { SocialIcon } from "react-social-icons"

const Header = () => {
  return (
    <header className="flex items-center max-w-7xl justify-between px-5 py-5 mx-auto">
      <div className="font-bold text-lg">
        <Link href="/">arya.blog</Link>
      </div>
      <div className="flex gap-x-3">
        <SocialIcon
          style={{
            width: 30,
            height: 30
          }}
          bgColor="gray" 
          url="https://twitter.com/_raryasa"
        />
        <SocialIcon
          style={{
            width: 30,
            height: 30
          }}
          bgColor="gray" 
          url="https://www.facebook.com/riz.saputra21"
        />
      </div>
    </header>
  )
}

export default Header