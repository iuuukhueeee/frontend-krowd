import { useEffect, useRef, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  EventResizeDoneArg,
} from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/react'; // => request placed at the top
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  Container,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material
import { useSnackbar } from 'notistack5';

// @types
import { CalendarView } from '../../@types/calendar';
import {
  CalendarForm,
  CalendarStyle,
  CalendarToolbar,
} from '../../components/_dashboard/calendar';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import {
  closeModal,
  getEvents,
  openModal,
  selectEvent,
  selectRange,
  updateEvent,
} from '../../redux/slices/calendar';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';

const selectedEventSelector = (state: RootState) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export default function Calendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(
    isMobile ? 'listWeek' : 'dayGridMonth'
  );
  const selectedEvent = useSelector(selectedEventSelector);
  const { events, isOpenModal, selectedRange } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
      enqueueSnackbar('Update event success', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Page title="Calendar | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Calendar' },
          ]}
          moreLink="https://fullcalendar.io/docs/react"
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              onClick={handleAddEvent}
            >
              New Event
            </Button>
          }
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={events}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isMobile ? 'auto' : 720}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </CalendarStyle>
        </Card>

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>
            {selectedEvent ? 'Edit Event' : 'Add Event'}
          </DialogTitle>

          <CalendarForm
            event={selectedEvent || {}}
            range={selectedRange}
            onCancel={handleCloseModal}
          />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
