import { useState } from "react";
import { Habit } from "@/types/app";
import { useApp } from "@/context/AppContext";
import { ChevronDown, ChevronUp } from "lucide-react";

interface HabitGridProps {
  habit: Habit;
}

export function HabitGrid({ habit }: HabitGridProps) {
  const { toggleHabitDay } = useApp();
  const [showFullYear, setShowFullYear] = useState(false);
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  
  const isCompleted = (date: Date) => 
    habit.completedDays.includes(formatDate(date));

  const handleToggle = (date: Date) => {
    toggleHabitDay(habit.id, formatDate(date));
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  
  const getMonthName = (month: number) => {
    return new Date(currentYear, month).toLocaleString('default', { month: 'short' });
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderMonthGrid = (month: number) => {
    const daysInMonth = getDaysInMonth(currentYear, month);
    const firstDay = getFirstDayOfMonth(currentYear, month);
    
    // Create array with empty slots for alignment + actual days
    const cells: (Date | null)[] = [];
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      cells.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(currentYear, month, day));
    }

    // Pad to complete last row
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return (
      <div key={month} className="mb-3 last:mb-0">
        {showFullYear && (
          <div className="text-xs font-medium text-muted-foreground mb-1.5">
            {getMonthName(month)}
          </div>
        )}
        <div 
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: 'repeat(7, 14px)' }}
        >
          {cells.map((date, i) => {
            if (!date) {
              return <div key={`empty-${i}`} className="w-[14px] h-[14px]" />;
            }
            
            const completed = isCompleted(date);
            const isToday = formatDate(date) === formatDate(today);
            
            return (
              <button
                key={i}
                onClick={() => handleToggle(date)}
                className={`
                  w-[14px] h-[14px] rounded-sm transition-colors duration-150
                  ${completed 
                    ? "bg-habit-filled" 
                    : "bg-habit-empty hover:bg-accent"
                  }
                  ${isToday ? "ring-1 ring-primary ring-offset-1" : ""}
                `}
                title={date.toLocaleDateString()}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground text-sm">{habit.name}</h3>
        <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted rounded-full">
          {habit.frequency}
        </span>
      </div>
      
      {/* Grid wrapper for consistent width */}
      <div className="inline-block">
        {/* Week day labels - same grid structure */}
        <div 
          className="grid gap-[3px] mb-1"
          style={{ gridTemplateColumns: 'repeat(7, 14px)' }}
        >
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className="w-[14px] h-[14px] flex items-center justify-center text-[10px] text-muted-foreground font-medium"
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Scrollable container */}
        <div className={`${showFullYear ? "max-h-60 overflow-y-auto" : ""}`}>
          {showFullYear ? (
            Array.from({ length: 12 }, (_, i) => i).map(month => renderMonthGrid(month))
          ) : (
            renderMonthGrid(currentMonth)
          )}
        </div>
      </div>
      
      {/* Year toggle */}
      <button
        onClick={() => setShowFullYear(!showFullYear)}
        className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5"
      >
        {showFullYear ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Show current month
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            View full year
          </>
        )}
      </button>
    </div>
  );
}
