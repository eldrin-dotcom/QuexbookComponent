import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Users, 
  UserCircle,
  BookOpen,
  Library,
  Sparkles,
  BarChart2,
  ClipboardCheck,
  Sun,
  Menu,
  X
} from 'lucide-react';
import WeeklyPrepProgress from './WeeklyPrepProgress';

const Cloud = ({ className }: { className?: string }) => (
  <div className={`absolute text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] ${className}`}>
    <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M160,216H72a56,56,0,0,1-16.14-109.63,64,64,0,0,1,123.51-14.86A48,48,0,0,1,160,216Z" />
    </svg>
  </div>
);

const Bird = ({ className, delay = "0s", duration = "4s" }: { className?: string, delay?: string, duration?: string }) => (
  <div className={`absolute text-[#6B7280]/30 ${className}`}>
    <div className="w-full h-full" style={{ animation: `birdHover ${duration} ease-in-out infinite`, animationDelay: delay }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c4 -6 6 -6 10 0 4 -6 6 -6 10 0" />
      </svg>
    </div>
  </div>
);

const Header = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`w-full py-4 relative z-20 transition-colors duration-300 ${isDarkMode ? 'border-b border-transparent bg-[#0F0F0F]' : 'bg-transparent'}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between w-full">
        {/* Left side: Logo + Search */}
        <div className="flex items-center gap-6 md:gap-10 w-full md:w-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Custom SVG approximating the QuexBook logo */}
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
              <path d="M16 25.5L5 20L16 14.5L27 20L16 25.5Z" fill="#0B9ECC"/>
              <path d="M5 20V23L16 28.5L27 23V20L16 25.5L5 20Z" fill="#087A9E"/>
              <path d="M16 21.5L5 16L16 10.5L27 16L16 21.5Z" fill="#FFC107"/>
              <path d="M5 16V19L16 24.5L27 19V16L16 21.5L5 16Z" fill="#F5A623"/>
              <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="#F38100"/>
              <path d="M12 13.5V17.5C12 17.5 16 19.5 20 17.5V13.5" stroke="#F38100" strokeWidth="2" fill="none"/>
            </svg>
            <span className={`text-[22px] font-bold tracking-tight ${isDarkMode ? 'text-[#FFFAF5]' : 'text-[#0F172A]'}`}>QuexBook Studies</span>
          </div>

          {/* Search Bar - Precisely styled and positioned */}
          <div className={`hidden md:flex items-center rounded-lg px-4 py-2 w-[350px] lg:w-[420px] border transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
            <Search className={`w-4 h-4 mr-2.5 ${isDarkMode ? 'text-[#B8B8B8]' : 'text-gray-400'}`} strokeWidth={2} />
            <input 
              type="text" 
              placeholder="Search..." 
              className={`bg-transparent border-none outline-none w-full text-[14px] ${isDarkMode ? 'text-[#FFFAF5] placeholder:text-[#B8B8B8]' : 'text-gray-900 placeholder:text-gray-500'}`}
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#B8B8B8] hover:text-[#FFFAF5]' : 'text-gray-500 hover:text-gray-900'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-7 shrink-0">
          <button className={`relative transition-colors ${isDarkMode ? 'text-[#B8B8B8] hover:text-[#FFFAF5]' : 'text-gray-600 hover:text-gray-900'}`}>
            <Bell className="w-[22px] h-[22px]" strokeWidth={1.75} />
          </button>
          
          {/* User Profile Pill */}
          <div className={`flex items-center gap-3 py-1.5 px-3 rounded-full border cursor-pointer transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#C11252] flex items-center justify-center text-white font-medium text-sm">
                J
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFC107] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 20H22V22H2V20ZM12 3L16 11L21 6L19 18H5L3 6L8 11L12 3Z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className={`text-sm font-semibold leading-tight ${isDarkMode ? 'text-[#FFFAF5]' : 'text-gray-900'}`}>John Eldrin Rosales</span>
              <span className={`text-[11px] leading-tight ${isDarkMode ? 'text-[#B8B8B8]' : 'text-[#829AB1]'}`}>Educator</span>
            </div>
            <ChevronDown className={`w-4 h-4 ml-1 ${isDarkMode ? 'text-[#B8B8B8]' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-12 px-4 text-center relative z-10 transition-colors duration-300">
      <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDarkMode ? 'text-[#FFFAF5]' : 'text-gray-900'}`}>
        Welcome back, <span className="text-[#F38100]">John Eldrin Rosales</span>!
      </h1>
      <p className={`text-lg mb-8 ${isDarkMode ? 'text-[#B8B8B8]' : 'text-gray-500'}`}>What would you like to do today?</p>
      
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className={`flex items-center gap-2 border rounded-full py-2 px-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-gray-800' : 'bg-white border-gray-200'}`}>
          <Users className="w-4 h-4 text-[#0B9ECC]" />
          <span className={`font-medium ${isDarkMode ? 'text-[#FFFAF5]' : 'text-gray-800'}`}><span className="font-bold">2</span> Classes</span>
        </div>
        <div className={`flex items-center gap-2 border rounded-full py-2 px-6 shadow-sm transition-colors ${isDarkMode ? 'bg-[#1A1A1A] border-gray-800' : 'bg-white border-gray-200'}`}>
          <UserCircle className="w-4 h-4 text-emerald-500" />
          <span className={`font-medium ${isDarkMode ? 'text-[#FFFAF5]' : 'text-gray-800'}`}><span className="font-bold">3</span> Students</span>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  cardBgClass: string;
  lightBgClass: string;
  isNew?: boolean;
  isDarkMode: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  iconBgColor, 
  cardBgClass,
  lightBgClass,
  isNew,
  isDarkMode
}) => {
  return (
    <div className={`p-5 md:p-6 rounded-[12px] border transition-all cursor-pointer relative overflow-hidden group ${isDarkMode ? `border-gray-800/50 hover:border-gray-600 ${cardBgClass}` : `border-transparent shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.1)] ${lightBgClass}`}`}>
      {/* Subtle hover gradient effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
      
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 shrink-0 rounded-[10px] flex items-center justify-center shadow-md ${iconBgColor}`}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-0.5">
            <h3 className={`text-lg font-bold truncate pr-2 ${isDarkMode ? 'text-[#FFFAF5]' : 'text-gray-900'}`}>{title}</h3>
            {isNew && (
              <span className="shrink-0 bg-[#9D4EDD] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                New
              </span>
            )}
          </div>
          <p className={`text-sm leading-snug line-clamp-2 ${isDarkMode ? 'text-[#B8B8B8]' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Set to false by default to showcase the new light mode requested
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const features = [
    {
      title: "My Classes",
      description: "Manage your classes and students",
      icon: <Users className="w-6 h-6 text-white" />,
      iconBgColor: "bg-indigo-400",
      cardBgClass: "bg-[#161324] hover:bg-[#1a162b]",
      lightBgClass: "bg-[#F3EDFF]", // Soft purple
    },
    {
      title: "Subjects",
      description: "Browse ready-made lessons and assign to your class",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      iconBgColor: "bg-[#0B9ECC]",
      cardBgClass: "bg-[#111c24] hover:bg-[#14222c]",
      lightBgClass: "bg-[#E6F4FF]", // Soft blue
      isNew: true,
    },
    {
      title: "My Library",
      description: "Your saved AI-generated lessons, exams, and materials",
      icon: <Library className="w-6 h-6 text-white" />,
      iconBgColor: "bg-[#F38100]",
      cardBgClass: "bg-[#1c1611] hover:bg-[#241c14]",
      lightBgClass: "bg-[#FFF4E5]", // Soft orange
      isNew: true,
    },
    {
      title: "AI Tools",
      description: "Generate exams, quizzes, and rubrics with AI",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      iconBgColor: "bg-[#9D4EDD]",
      cardBgClass: "bg-[#181324] hover:bg-[#1e172e]",
      lightBgClass: "bg-[#F3EDFF]", // Soft purple
      isNew: true,
    },
    {
      title: "Gradebook",
      description: "Auto-graded results ready for you to review",
      icon: <BarChart2 className="w-6 h-6 text-white" />,
      iconBgColor: "bg-emerald-400",
      cardBgClass: "bg-[#112018] hover:bg-[#15271d]",
      lightBgClass: "bg-[#E8F8F0]", // Soft green
    },
    {
      title: "Attendance",
      description: "Quick tap attendance with auto SF2 reports",
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
      iconBgColor: "bg-pink-400",
      cardBgClass: "bg-[#1e1318] hover:bg-[#25171e]",
      lightBgClass: "bg-[#FFE8F0]", // Soft pink
    }
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FCFBF8]'}`}>
      
      <style>
        {`
          @keyframes birdHover {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fallingMeteor {
            0% {
              opacity: 0;
              transform: rotate(45deg) translateX(-100px);
            }
            5% {
              opacity: 1;
            }
            15% {
              opacity: 0;
              transform: rotate(45deg) translateX(1500px);
            }
            100% {
              opacity: 0;
              transform: rotate(45deg) translateX(1500px);
            }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
          .animate-meteor {
            animation: fallingMeteor linear infinite;
            opacity: 0;
          }
          .animate-twinkle {
            animation: twinkle ease-in-out infinite;
          }
        `}
      </style>

      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDarkMode ? (
          <>
            {/* Dark Mode Stars & Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F38100]/5 blur-[120px]"></div>
            <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0B9ECC]/5 blur-[150px]"></div>
            
            {/* Twinkling Stars (Increased quantity) */}
            <div className="absolute top-[15%] left-[25%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
            <div className="absolute top-[45%] left-[15%] w-[3px] h-[3px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            <div className="absolute top-[25%] right-[30%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
            <div className="absolute top-[65%] right-[20%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}></div>
            <div className="absolute top-[10%] right-[10%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            <div className="absolute top-[80%] left-[30%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.5s', animationDelay: '0.2s' }}></div>
            <div className="absolute top-[50%] right-[45%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3s', animationDelay: '1.2s' }}></div>
            <div className="absolute top-[85%] right-[15%] w-[2.5px] h-[2.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4s', animationDelay: '0.8s' }}></div>
            <div className="absolute top-[35%] left-[45%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.2s', animationDelay: '2.5s' }}></div>
            <div className="absolute top-[20%] left-[60%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '2.8s', animationDelay: '1.8s' }}></div>
            
            {/* Additional Stars for density */}
            <div className="absolute top-[8%] left-[8%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4s', animationDelay: '0.7s' }}></div>
            <div className="absolute top-[12%] right-[45%] w-[1px] h-[1px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.5s', animationDelay: '1.1s' }}></div>
            <div className="absolute top-[38%] left-[85%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '5.5s', animationDelay: '0.4s' }}></div>
            <div className="absolute top-[62%] left-[5%] w-[2.5px] h-[2.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.2s', animationDelay: '2.8s' }}></div>
            <div className="absolute top-[92%] right-[35%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.8s', animationDelay: '1.6s' }}></div>
            <div className="absolute top-[28%] left-[75%] w-[1px] h-[1px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.8s', animationDelay: '0.9s' }}></div>
            <div className="absolute top-[55%] right-[75%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.1s', animationDelay: '2.3s' }}></div>
            <div className="absolute top-[72%] left-[45%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '5.2s', animationDelay: '1.4s' }}></div>
            <div className="absolute top-[42%] right-[8%] w-[2.5px] h-[2.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.9s', animationDelay: '0.1s' }}></div>
            <div className="absolute top-[88%] left-[22%] w-[1px] h-[1px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.5s', animationDelay: '3.0s' }}></div>
            <div className="absolute top-[5%] right-[25%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '6s', animationDelay: '1.2s' }}></div>
            <div className="absolute top-[95%] left-[65%] w-[1.5px] h-[1.5px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.1s', animationDelay: '0.6s' }}></div>
            <div className="absolute top-[33%] left-[12%] w-[1px] h-[1px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.7s', animationDelay: '2.2s' }}></div>
            <div className="absolute top-[48%] right-[25%] w-[2px] h-[2px] bg-white rounded-full animate-twinkle" style={{ animationDuration: '5.3s', animationDelay: '1.9s' }}></div>

            {/* Subtle Static Lines */}
            <div className="absolute top-[30%] left-[30%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45"></div>
            <div className="absolute top-[20%] right-[40%] w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45"></div>

            {/* 7 Very Slow Falling Meteors (Top-Left -> Bottom-Right) */}
            <div className="absolute top-[-5%] left-[10%] w-[60px] h-[1px] bg-gradient-to-r from-transparent to-white rounded-full animate-meteor" style={{ animationDuration: '60s', animationDelay: '1s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2.5px] h-[2.5px] bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]"></div>
            </div>
            <div className="absolute top-[10%] left-[-10%] w-[45px] h-[1px] bg-gradient-to-r from-transparent to-white/70 rounded-full animate-meteor" style={{ animationDuration: '55s', animationDelay: '5s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.6)]"></div>
            </div>
            <div className="absolute top-[40%] left-[-5%] w-[80px] h-[1px] bg-gradient-to-r from-transparent to-white rounded-full animate-meteor" style={{ animationDuration: '75s', animationDelay: '12s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.9)]"></div>
            </div>
            <div className="absolute top-[-10%] left-[40%] w-[50px] h-[1px] bg-gradient-to-r from-transparent to-white/80 rounded-full animate-meteor" style={{ animationDuration: '65s', animationDelay: '18s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_1px_rgba(255,255,255,0.7)]"></div>
            </div>
            <div className="absolute top-[-5%] left-[70%] w-[60px] h-[1px] bg-gradient-to-r from-transparent to-white/90 rounded-full animate-meteor" style={{ animationDuration: '80s', animationDelay: '2s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2.5px] h-[2.5px] bg-white rounded-full shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]"></div>
            </div>
            <div className="absolute top-[20%] left-[-15%] w-[40px] h-[1px] bg-gradient-to-r from-transparent to-white/50 rounded-full animate-meteor" style={{ animationDuration: '50s', animationDelay: '8s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_1px_rgba(255,255,255,0.4)]"></div>
            </div>
            <div className="absolute top-[60%] left-[-10%] w-[55px] h-[1px] bg-gradient-to-r from-transparent to-white/75 rounded-full animate-meteor" style={{ animationDuration: '70s', animationDelay: '15s' }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_5px_2px_rgba(255,255,255,0.6)]"></div>
            </div>
          </>
        ) : (
          <>
            {/* Light Mode Clouds & Birds */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#F38100]/3 blur-[120px]"></div>
            <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-[#0B9ECC]/3 blur-[100px]"></div>
            
            {/* Clouds */}
            <Cloud className="w-32 h-32 top-[10%] left-[5%] opacity-90" />
            <Cloud className="w-48 h-48 top-[15%] right-[15%] opacity-90" />
            <Cloud className="w-24 h-24 top-[35%] left-[25%] opacity-70" />
            <Cloud className="w-40 h-40 top-[5%] right-[40%] opacity-60" />
            <Cloud className="w-20 h-20 top-[40%] right-[10%] opacity-80" />

            {/* Birds */}
            <Bird className="w-4 h-4 top-[12%] left-[22%] -rotate-12" delay="0s" duration="4s" />
            <Bird className="w-3 h-3 top-[14%] left-[24%] -rotate-12" delay="1s" duration="3.5s" />
            <Bird className="w-5 h-5 top-[8%] right-[35%] rotate-6" delay="0.5s" duration="5s" />
            <Bird className="w-4 h-4 top-[22%] right-[25%] rotate-12" delay="2s" duration="4.5s" />
          </>
        )}
      </div>

      <Header isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 max-w-[1200px] pb-20 relative z-10">
        <HeroSection isDarkMode={isDarkMode} />
        <WeeklyPrepProgress isDarkMode={isDarkMode} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 w-full mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconBgColor={feature.iconBgColor}
              cardBgClass={feature.cardBgClass}
              lightBgClass={feature.lightBgClass}
              isNew={feature.isNew}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </main>

      {/* Theme Toggle Button (Floating) */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors z-50 group ${isDarkMode ? 'bg-[#1A1A1A] border border-gray-700 text-[#F38100] hover:bg-gray-800' : 'bg-white border border-gray-200 text-[#F38100] hover:bg-gray-50 shadow-xl'}`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Sun className="w-6 h-6 text-[#F38100]" /> // Ensure sun stays visible in light mode
        )}
        
        {/* Dashed outer ring */}
        <div className={`absolute inset-[-4px] border border-dashed rounded-full animate-spin-slow ${isDarkMode ? 'border-[#F38100]/50' : 'border-[#F38100]/40'}`}></div>
      </button>

      {/* Side orange accent line (Hidden in light mode for a cleaner look) */}
      {isDarkMode && (
        <div className="fixed top-0 right-0 bottom-0 w-1 bg-[#F38100] z-50 hidden md:block opacity-80"></div>
      )}
    </div>
  );
}