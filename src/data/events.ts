export interface EventItem {
  id: number
  title: string
  location: string
  time: string
  attendees: number
  tag: string | null
}

export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Rooftop Social",
    location: "Koramangala · Bengaluru",
    time: "Tonight · 9 PM",
    attendees: 42,
    tag: "HOT",
  },
  {
    id: 2,
    title: "Sunrise HIIT Run",
    location: "Cubbon Park",
    time: "Tomorrow · 6 AM",
    attendees: 18,
    tag: null,
  },
  {
    id: 3,
    title: "Open Mic Night",
    location: "Indiranagar · Bengaluru",
    time: "Sat · 8 PM",
    attendees: 67,
    tag: "TRENDING",
  },
  {
    id: 4,
    title: "Vintage Flea Market",
    location: "Church Street",
    time: "Sun · 11 AM",
    attendees: 104,
    tag: null,
  },
  {
    id: 5,
    title: "Late Night DJ Set",
    location: "HSR Layout · Bengaluru",
    time: "Fri · 11 PM",
    attendees: 89,
    tag: "HOT",
  },
  {
    id: 6,
    title: "Board Game Brunch",
    location: "Jayanagar · Bengaluru",
    time: "Sun · 10 AM",
    attendees: 22,
    tag: null,
  },
]
