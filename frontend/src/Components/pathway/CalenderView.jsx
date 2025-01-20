import { React, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlarmIcon from "@mui/icons-material/Alarm";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CalenderPage() {
  // Default value will be month view calender
  const [currentView, setCurrentView] = useState("dayGridMonth");

  return (
    <div className="w-full flex items-center justify-center m-auto">
      <div className="Card w-full max-w-6xl border-2 border-pink-900 mt-10">
        <header>
          <div className="flex justify-between items-center mt-2">
            <span className="Heading text-3xl flex items-center gap-2 justify-center font-bold text-white">
              <AlarmIcon className="!text-4xl" />
              Learning Schedule
            </span>
            <div className="Buttons flex gap-2">
              <Button
                variant="contained"
                className="!flex !justify-center !items-center !text-xl"
              >
                <CalendarMonthIcon />
                Month
              </Button>
              <Button
                variant="contained"
                className="!flex !justify-center !items-center !text-xl"
              >
                <ViewWeekIcon />
                Week
              </Button>
              <Button
                variant="contained"
                className="!flex !justify-center !items-center !text-xl"
              >
                <ViewDayIcon />
                Day
              </Button>
              <Button
                variant="contained"
                className="!flex !justify-center !items-center !text-xl"
              >
                <FormatListNumberedIcon />
                List
              </Button>
            </div>
          </div>
        </header>

        <CardContent className="!text-white !flex !flex-col !items-center !justify-center border-2 border-yellow-300">
          <FullCalendar
            customButtons={{
              dayGridMonth: {
                text: "Month",
                click: () => {
                  setCurrentView("dayGridMonth");
                },
                style: {
                  backgroundColor: "red !important",
                  border: "none",
                  color: "white",
                  fontSize: "1.5rem",
                  padding: "0.5rem",
                },
              },
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView={currentView}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,list",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            // events={events}
            // eventClick={handleEventClick}
            // eventDrop={handleEventDrop}
            // dateClick={handleDateClick}
            // eventContent={renderEventContent}
            // customButtons={customButtons}
            height="auto"
            aspectRatio={1.8}
          />
        </CardContent>
      </div>
    </div>
  );
}

export default CalenderPage;
