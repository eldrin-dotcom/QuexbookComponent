import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

import { 

  ChevronRight, 

  X, 

  Sparkles, 

  FileText, 

  Loader2, 

  CheckCircle2, 

  AlertCircle,

  CalendarDays,

  ArrowRight

} from 'lucide-react';



// --- Interfaces ---

interface DayData {

  day: string;

  topic: string;

  prepared: boolean;

  missingItems?: string[]; 

  date: string; 

}



interface SubjectData {

  id: string;

  name: string;

  gradeLevel: string;

  days: DayData[];

}



interface WeekData {

  weekOf: string;

  subjects: SubjectData[];

}



// --- Mock Data ---

const initialMockWeekData: WeekData = {

  weekOf: '2026-07-14',

  subjects: [

    {

      id: 'sub-math-11',

      name: 'General Mathematics',

      gradeLevel: 'Grade 11',

      days: [

        { day: 'Monday', date: '2026-07-13', topic: 'Rational Functions', prepared: true },

        { day: 'Wednesday', date: '2026-07-15', topic: 'Rational Functions', prepared: false, missingItems: ['Activity Sheet', 'PPT'] },

        { day: 'Friday', date: '2026-07-17', topic: 'Exponential Functions', prepared: false, missingItems: ['Lesson Plan', 'Assessment', 'PPT'] },

      ]

    },

    {

      id: 'sub-sci-11',

      name: 'General Science',

      gradeLevel: 'Grade 11',

      days: [

        { day: 'Tuesday', date: '2026-07-14', topic: 'Waves and Sound', prepared: true },

        { day: 'Thursday', date: '2026-07-16', topic: 'Waves and Sound', prepared: true },

      ]

    }

  ]

};



// --- Theme Constants ---

const theme = {

  orange: '#F38100',

  blue: '#0B9ECC',

};



// --- Helper Components ---



const ProgressRing = ({ radius, stroke, progress, color }: { radius: number, stroke: number, progress: number, color: string }) => {

  const normalizedRadius = radius - stroke * 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;



  return (

    <div className="relative inline-flex items-center justify-center">

      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">

        <circle

          className="stroke-slate-200 dark:stroke-slate-800"

          fill="transparent"

          strokeWidth={stroke}

          r={normalizedRadius}

          cx={radius}

          cy={radius}

        />

        <circle

          stroke={color}

          fill="transparent"

          strokeWidth={stroke}

          strokeDasharray={circumference + ' ' + circumference}

          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.75s cubic-bezier(0.4, 0, 0.2, 1)' }}

          r={normalizedRadius}

          cx={radius}

          cy={radius}

          strokeLinecap="round"

        />

      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center">

        <span className="text-sm font-bold text-slate-800 dark:text-[#FFFAF5]">{Math.round(progress)}%</span>

      </div>

    </div>

  );

};



// --- AI Generation Logic ---

const generateDocumentContent = async (subject: string, gradeLevel: string, topic: string, documentType: string): Promise<string> => {

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve(`## ${documentType}\n**Subject:** ${subject} (${gradeLevel})\n**Topic:** ${topic}\n\n### Overview\nThis document outlines the core concepts and activities designed to engage students in understanding ${topic}. \n\n### Objectives\n- Understand primary principles.\n- Apply knowledge to practical scenarios.\n\n### Instructions\n1. Begin with a 10-minute introduction.\n2. Divide students into groups for collaborative work.\n3. Conclude with a formative assessment.`);

    }, 2500); // Simulate network delay

  });

};



const AIPanel = ({ 

  activeTask,

  onClose,

  onComplete

}: { 

  activeTask: { subject: SubjectData, day: DayData, missingItem: string },

  onClose: () => void,

  onComplete: (subjectId: string, date: string, missingItem: string) => void

}) => {

  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);



  const { subject, day, missingItem } = activeTask;



  // Reset state when active task changes

  useEffect(() => {

    setGeneratedContent(null);

    setIsGenerating(false);

  }, [activeTask]);



  const handleGenerate = async () => {

    setIsGenerating(true);

    const result = await generateDocumentContent(subject.name, subject.gradeLevel, day.topic, missingItem);

    setGeneratedContent(result);

    setIsGenerating(false);

    

    setTimeout(() => {

        if(contentRef.current) contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }, 100);

  };



  return (

    <div className="h-full flex flex-col bg-white/60 dark:bg-[#121212]/80 backdrop-blur-xl border-l border-slate-200/60 dark:border-white/10 shadow-0.5l overflow-hidden animate-in slide-in-from-right-8 duration-300">

      {/* Panel Header */}

      <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-transparent">

        <div>

            <h3 className="text-[15px] font-bold text-slate-800 dark:text-white flex items-center gap-2">

                <Sparkles size={16} style={{ color: theme.blue }} />

                QuBo Assistant

            </h3>

            <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">Generating for {day.day}</p>

        </div>

        <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 transition-colors">

          <X size={18} />

        </button>

      </div>



      {/* Panel Body */}

      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar relative">

        <div className="mb-6">

            <h4 className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Context</h4>

            <div className="bg-slate-100/50 dark:bg-white/5 p-3 rounded-lg border border-slate-200/50 dark:border-white/5 space-y-2 text-[13px]">

                <div className="flex justify-between"><span className="text-slate-500">Subject:</span> <span className="font-medium text-slate-800 dark:text-slate-200">{subject.name}</span></div>

                <div className="flex justify-between"><span className="text-slate-500">Topic:</span> <span className="font-medium text-slate-800 dark:text-slate-200">{day.topic}</span></div>

                <div className="flex justify-between"><span className="text-slate-500">Target:</span> <span className="font-bold" style={{ color: theme.orange }}>{missingItem}</span></div>

            </div>

        </div>



        {!generatedContent && !isGenerating ? (

          <div className="flex flex-col items-center justify-center text-center mt-10 gap-4">

            <div className="w-px6 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">

                <Sparkles size={28} style={{ color: theme.blue }} />

            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-[200px]">

              Instantly draft your <strong className="text-slate-900 dark:text-white">{missingItem}</strong> using QuexBook AI.

            </p>

            <button 

              onClick={handleGenerate}

              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-[8px] font-bold text-sm transition-all shadow-md hover:shadow-lg text-white hover:-translate-y-0.5 active:translate-y-0"

              style={{ backgroundColor: theme.blue }}

            >

              Generate Draft

            </button>

          </div>

        ) : isGenerating ? (

          <div className="flex flex-col items-center justify-center mt-16 gap-4">

              <Loader2 size={32} className="animate-spin" style={{ color: theme.orange }} />

              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 animate-pulse">Analyzing curriculum & drafting...</p>

          </div>

        ) : (

          <div ref={contentRef} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50">

                  <CheckCircle2 size={18} />

                  <span className="text-sm font-bold">Draft Generated Successfully</span>

              </div>

              

              <div className="bg-white dark:bg-[#0A0A0A] p-4 rounded-lg border border-slate-200 dark:border-white/10 shadow-inner text-sm text-slate-800 dark:text-slate-200">

                  <div className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">

                     {generatedContent}

                  </div>

              </div>

          </div>

        )}

      </div>



      {/* Panel Footer */}

      {generatedContent && !isGenerating && (

         <div className="p-4 border-t border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-black/20 flex gap-3 animate-in slide-in-from-bottom-2">

             <button 

               onClick={() => setGeneratedContent(null)}

               className="flex-1 py-2.5 text-[13px] font-medium bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 rounded-[8px] transition-colors text-slate-700 dark:text-slate-200"

             >

                 Discard

             </button>

             <button 

               onClick={() => onComplete(subject.id, day.date, missingItem)}

               className="flex-[2] py-2.5 text-[13px] font-bold text-white rounded-[8px] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"

               style={{ backgroundColor: theme.orange }}

             >

                 <FileText size={16} /> Save to Library

             </button>

         </div>

      )}

    </div>

  );

};





export default function WeeklyPrepProgress({ isDarkMode = false }: { isDarkMode?: boolean }) {

  // --- Central State ---

  const [weekData, setWeekData] = useState<WeekData>(initialMockWeekData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  

  // Side Panel State for AI Generator

  const [activeTask, setActiveTask] = useState<{subject: SubjectData, day: DayData, missingItem: string} | null>(null);



  // --- Derived State & Calculations ---

  const { totalDays, preparedDays, overallPercentage, nextAction } = useMemo(() => {

    let total = 0;

    let prepared = 0;

    let nextUnpreparedDay: { subject: SubjectData, day: DayData, missingItem: string } | null = null;



    weekData.subjects.forEach(subject => {

      subject.days.forEach(day => {

        total++;

        if (day.prepared) {

          prepared++;

        } else {

          // Find the earliest unprepared day

          if (!nextUnpreparedDay || new Date(day.date) < new Date(nextUnpreparedDay.day.date)) {

            nextUnpreparedDay = { subject, day, missingItem: day.missingItems?.[0] || 'Material' };

          }

        }

      });

    });



    return {

      totalDays: total,

      preparedDays: prepared,

      overallPercentage: total > 0 ? (prepared / total) * 100 : 0,

      nextAction: nextUnpreparedDay

    };

  }, [weekData]);



  // --- Handlers ---

  const handleOpenModal = useCallback((taskToOpen?: typeof nextAction) => {

    setIsModalOpen(true);

    if (taskToOpen) {

        // Allow modal transition to finish before sliding in panel

        setTimeout(() => setActiveTask(taskToOpen), 150);

    }

  }, []);



  const handleCloseModal = useCallback(() => {

    setIsModalOpen(false);

    setTimeout(() => setActiveTask(null), 300); // Clear state after fade out

  }, []);



  const handleTaskComplete = useCallback((subjectId: string, date: string, resolvedItem: string) => {

    setWeekData(prevData => {

      const newData = { ...prevData };

      const subjectIndex = newData.subjects.findIndex(s => s.id === subjectId);

      

      if (subjectIndex > -1) {

        const newSubjects = [...newData.subjects];

        const newDays = [...newSubjects[subjectIndex].days];

        const dayIndex = newDays.findIndex(d => d.date === date);

        

        if (dayIndex > -1) {

          const currentDay = { ...newDays[dayIndex] };

          if (currentDay.missingItems) {

            currentDay.missingItems = currentDay.missingItems.filter(i => i !== resolvedItem);

            if (currentDay.missingItems.length === 0) {

              currentDay.prepared = true;

              currentDay.missingItems = undefined;

            }

          }

          newDays[dayIndex] = currentDay;

          newSubjects[subjectIndex] = { ...newSubjects[subjectIndex], days: newDays };

          newData.subjects = newSubjects;

        }

      }

      return newData;

    });

    

    // Close panel

    setActiveTask(null);

  }, []);



  return (

    <div className={isDarkMode ? 'dark w-full flex justify-center' : 'w-full flex justify-center'}>

      {/* --- Dashboard Summary Card --- */}

      <section 

        className="w-full max-w-6xl rounded-[16px] p-5 flex flex-col md:flex-row items-center justify-between mb-5 gap-6 shadow-sm border bg-white/60 dark:bg-[#121212]/60 backdrop-blur-xl border-slate-200/80 dark:border-white/10 transition-colors"

        aria-label="Weekly Preparation Overview"

      >

        {/* Progress & Title */}

        <div className="flex items-center gap-5 shrink-0 w-full md:w-auto">

          <ProgressRing 

            radius={32} 

            stroke={5} 

            progress={overallPercentage} 

            color={overallPercentage === 100 ? theme.blue : theme.orange} 

          />

          <div className="flex flex-col">

            <h2 className="text-[18px] font-bold text-slate-800 dark:text-[#FFFAF5] tracking-tight">Weekly Prep Progress</h2>

            <p className="text-[14px] mt-0.5 font-medium text-slate-500 dark:text-[#A0A0A0]">

              {preparedDays} of {totalDays} class days fully prepared

            </p>

          </div>

        </div>



       {/* Smart Alert Area */}

        <div className="flex-grow w-full md:w-auto">

          {nextAction ? (

            <button 

              onClick={() => handleOpenModal(nextAction)}

              className="w-full text-left flex items-center justify-between p-4 rounded-[12px] bg-orange-50/60 dark:bg-[#F38100]/10 backdrop-blur-md border border-orange-200/50 dark:border-[#F38100]/20 hover:bg-orange-100/60 dark:hover:bg-[#F38100]/20 transition-all duration-200 group focus:outline-none shadow-sm hover:shadow"

            >

              <div>

                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1 flex items-center gap-1.5" style={{ color: theme.orange }}>

                    <AlertCircle size={14} strokeWidth={2.5} />

                    Action Required for {nextAction.day.day}

                  </p>

                  <p className="text-[14px] text-slate-700 dark:text-slate-300">

                    Missing <span className="font-semibold text-slate-900 dark:text-white">{nextAction.missingItem}</span> for {nextAction.subject.name}.

                  </p>

              </div>

              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-black/20 shadow-sm text-orange-500 group-hover:translate-x-1 transition-transform">

                  <ArrowRight size={16} />

              </div>

            </button>

          ) : (

            <div className="w-full text-left flex items-center justify-between p-4 rounded-[12px] bg-blue-50/60 dark:bg-[#0B9ECC]/10 backdrop-blur-md border border-blue-200/50 dark:border-[#0B9ECC]/20 shadow-sm">

               <div>

                  <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1 flex items-center gap-1.5" style={{ color: theme.blue }}>

                    <CheckCircle2 size={14} strokeWidth={2.5} />

                    All Caught Up

                  </p>

                  <p className="text-[14px] text-slate-700 dark:text-slate-300">

                    You are fully prepared for the week ahead!

                  </p>

               </div>

            </div>

          )}

        </div>



        {/* Action CTA */}

        <div className="shrink-0 w-full md:w-auto flex justify-end">

          <button

            onClick={() => handleOpenModal()}

            className="w-full md:w-auto px-6 py-3 rounded-[10px] text-[14px] font-bold transition-all bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 shadow-sm hover:shadow flex items-center justify-center gap-2"

          >

            <CalendarDays size={18} className="text-slate-500 dark:text-slate-400" />

            View Full Week

          </button>

        </div>

      </section>



      {/* --- Weekly Overview Modal --- */}

      {isModalOpen && (

        <div 

            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 dark:bg-black/70 backdrop-blur-[3px] animate-in fade-in duration-200"

            role="dialog"

            aria-modal="true"

            aria-labelledby="modal-title"

        >

          <div 

            className="relative w-full max-w-6xl h-[90vh] sm:h-[85vh] flex rounded-[16px] shadow-0.5xl overflow-hidden border bg-[#F8FAFC] dark:bg-[#0A0A0A] border-slate-300/50 dark:border-white/10"

            onClick={(e) => e.stopPropagation()}

          >

            

            {/* Left/Main Column: Weekly Grid */}

            <div className={`flex-1 flex flex-col transition-all duration-300 ${activeTask ? 'hidden lg:flex' : 'flex'}`}>

                {/* Modal Header */}

                <div className="flex items-center justify-between p-6 pb-5 bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-white/10 z-10">

                    <div>

                        <h2 id="modal-title" className="text-[20px] font-bold text-slate-900 dark:text-white">

                            Week of {new Date(weekData.weekOf).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

                        </h2>

                        <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">

                            Review and generate your missing lesson materials.

                        </p>

                    </div>

                    

                    {!activeTask && (

                        <button 

                            onClick={handleCloseModal}

                            className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600 dark:text-slate-300"

                            aria-label="Close modal"

                        >

                            <X size={20} />

                        </button>

                    )}

                </div>



                {/* Swimlane Content */}

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/50 dark:bg-transparent">

                    <div className="space-y-6">

                        {weekData.subjects.map(subject => (

                            <div key={subject.id} className="bg-white dark:bg-[#121212] rounded-[12px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">

                                {/* Subject Header */}

                                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">

                                    <div className="flex flex-col">

                                        <h3 className="text-[15px] font-bold text-slate-800 dark:text-white">{subject.name}</h3>

                                        <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">{subject.gradeLevel}</span>

                                    </div>

                                    <div className="text-[12px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">

                                        {subject.days.filter(d => d.prepared).length} / {subject.days.length} Days Ready

                                    </div>

                                </div>



                                {/* Days Horizontal List (Swimlane) */}

                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                                    {subject.days.map((day, index) => {

                                        // Determine if this day card is currently active in the AI panel

                                        const isActive = activeTask?.subject.id === subject.id && activeTask?.day.date === day.date;

                                        

                                        return (

                                            <div 

                                                key={index}

                                                className={`

                                                    relative flex flex-col p-4 rounded-[10px] border transition-all duration-200

                                                    ${day.prepared 

                                                        ? 'bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/10 shadow-sm' 

                                                        : isActive 

                                                            ? 'bg-orange-50/50 dark:bg-[#F38100]/10 border-[#F38100] shadow-[0_0_0_1px_rgba(243,129,0,1)]' 

                                                            : 'bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-500/50 shadow-sm hover:shadow'

                                                    }

                                                `}

                                            >

                                                <div className="flex justify-between items-start mb-2">

                                                    <span className="font-bold text-[15px] text-slate-800 dark:text-white">{day.day}</span>

                                                    {day.prepared ? (

                                                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#0B9ECC] bg-[#0B9ECC]/10 px-2 py-0.5 rounded-full">

                                                            <CheckCircle2 size={12} /> Ready

                                                        </span>

                                                    ) : (

                                                        <span className="text-[11px] font-bold text-[#F38100] bg-[#F38100]/10 px-2 py-0.5 rounded-full">

                                                            Prep Needed

                                                        </span>

                                                    )}

                                                </div>

                                                

                                                <div className="text-[13px] text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-2">

                                                    Topic: <span className="font-medium text-slate-800 dark:text-slate-300">{day.topic}</span>

                                                </div>



                                                {!day.prepared && day.missingItems && (

                                                    <div className="mt-auto border-t border-slate-100 dark:border-white/5 pt-3">

                                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Missing Items</p>

                                                        <div className="space-y-1.5">

                                                            {day.missingItems.map((item, i) => (

                                                                <div key={i} className="flex items-center justify-between group">

                                                                    <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">

                                                                        <div className="w-px.5 h-1.5 rounded-full bg-orange-400" />

                                                                        {item}

                                                                    </span>

                                                                    <button

                                                                        onClick={() => setActiveTask({ subject, day, missingItem: item })}

                                                                        className={`

                                                                            text-[11px] font-bold px-2.5 py-1 rounded-md transition-all

                                                                            ${isActive && activeTask?.missingItem === item

                                                                                ? 'bg-orange-500 text-white shadow-md'

                                                                                : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20'

                                                                            }

                                                                        `}

                                                                    >

                                                                        Resolve

                                                                    </button>

                                                                </div>

                                                            ))}

                                                        </div>

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    })}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>



            {/* Right Column: AI Generator Panel (Conditional) */}

            {activeTask && (

                <div className="w-full lg:w-[400px] shrink-0 border-l border-slate-200 dark:border-white/10 z-20">

                    <AIPanel 

                        activeTask={activeTask} 

                        onClose={() => setActiveTask(null)} 

                        onComplete={handleTaskComplete}

                    />

                </div>

            )}

            

          </div>

          {/* Backdrop Click Area */}

          <div className="absolute inset-0 -z-10" onClick={handleCloseModal} />

        </div>

      )}

      

      {/* Global styles for scoped components */}

      <style dangerouslySetInnerHTML={{__html: `

        .custom-scrollbar::-webkit-scrollbar {

          width: 6px;

        }

        .custom-scrollbar::-webkit-scrollbar-track {

          background: transparent;

        }

        .custom-scrollbar::-webkit-scrollbar-thumb {

          background: rgba(150, 150, 150, 0.2);

          border-radius: 10px;

        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {

          background-color: rgba(150, 150, 150, 0.4);

        }

        @media (prefers-color-scheme: dark) {

          .custom-scrollbar::-webkit-scrollbar-thumb {

             background-color: rgba(255, 255, 255, 0.1);

          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {

             background-color: rgba(255, 255, 255, 0.2);

          }

        }

      `}} />

    </div>

  );

} 

