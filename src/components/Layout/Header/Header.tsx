import { Link } from 'react-router-dom';
import HomeLogo from '@/assets/icons/navigation/ic_home_logo.svg';

const Header = () => {
    return (
        <header>
            {/* 상단 네비게이션 바 레이아웃 및 스타일 설정함 */}
            <nav className="grid h-20 w-full grid-cols-3 items-center justify-between">
                
                {/* 좌측 로고 및 타이틀 영역 메인 페이지로 이동 */}
                <div className='flex justify-start'>
                    <Link to="/" className="flex items-center pt-2 gap-[7px] sm:pl-8 md:pl-16 lg:pl-32">
                        <img src={HomeLogo} alt="Home Logo Icon"/>
                        <span className="font-mono antialiased text-[27px] font-medium tracking-[-3px] text-brand-500">
                        API Wiki
                    </span>
                    </Link>
                </div>
                

                {/* 중앙 메뉴 */}
                <div className="flex justify-self-center sm:gap-12 md:gap-16 lg:gap-36 whitespace-nowrap font-sans text-xl font-medium tracking-[-1px] text-[#0D3C61] pr-2">
                    <Link to="/bookmark">Bookmark</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/about">About Us</Link>
                </div>

                {/* 우측 로그인 버튼 영역*/}
                <div className="flex justify-self-end whitespace-nowrap pr-4 sm:pr-8 md:pr-16 lg:pr-32 font-sans text-xl font-medium tracking-[-1px] text-[#0D3C61]">
                    <span>Login</span>
                </div>
            </nav>
        </header>
    );
};

export default Header;