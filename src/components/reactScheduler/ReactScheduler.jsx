import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./modal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Scheduler = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Meeting",
      start: new Date(2024, 8, 26, 10, 0),
      end: new Date(2024, 8, 26, 12, 0),
    },
    {
      id: 2,
      title: "Lunch",
      start: new Date(2024, 8, 27, 12, 0),
      end: new Date(2024, 8, 27, 13, 0),
    },
    {
      id: 3,
      title: "Conference",
      start: new Date(2024, 8, 28, 9, 0),
      end: new Date(2024, 8, 28, 17, 0),
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const onEventResize = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => prev.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev)));
    },
    [setEvents]
  );

  const onEventDrop = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
      const updatedEvent = { ...event, start, end };

      if (droppedOnAllDaySlot) {
        updatedEvent.allDay = true;
        updatedEvent.start = moment(start).startOf("day").toDate();
        updatedEvent.end = moment(end).endOf("day").toDate();
      } else {
        updatedEvent.allDay = false;

        if (event.allDay) {
          const defaultDuration = 2 * 60 * 60 * 1000;
          updatedEvent.end = new Date(updatedEvent.start.getTime() + defaultDuration);
        } else {
          const duration = event.end.getTime() - event.start.getTime();
          updatedEvent.end = new Date(updatedEvent.start.getTime() + duration);
        }
      }

      setEvents((prev) => prev.map((ev) => (ev.id === event.id ? updatedEvent : ev)));
    },
    [setEvents]
  );

  const handleSelectSlot = useCallback(({ start, end, slots, bounds, box }) => {
    const isAllDay = slots.length === 1;
    setSelectedSlot({ start, end, isAllDay, bounds, box });
    setShowModal(true);
  }, []);

  const handleCreateEvent = useCallback(
    (title, start, end) => {
      const { isAllDay, bounds, box } = selectedSlot;
      let newEvent = { id: events.length + 1, title, start, end, allDay: isAllDay };
      if (!isAllDay && bounds && box) {
        const daySpan = Math.ceil((box.x2 - box.x1) / bounds.width);
        if (daySpan > 1) {
          newEvent.end = new Date(start);
          newEvent.end.setDate(newEvent.end.getDate() + daySpan);
        }
      }
      setEvents((prev) => [...prev, newEvent]);
    },
    [events, selectedSlot]
  );
  return (
    <div className="h-screen p-4">
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        step={60}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        views={["week"]}
        style={{ height: "calc(100% - 60px)" }}
      />
      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateEvent}
          start={selectedSlot.start}
          end={selectedSlot.end}
        />
      )}
    </div>
  );
};

export default Scheduler;
