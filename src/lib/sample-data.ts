// SAMPLE DATA — all values below are fictional placeholders for the UI prototype.
// Replace with real data once a backend is connected.

export const student = {
  name: "Aarav Sharma",
  rollNo: "MSOT/CSE/2023/047",
  program: "B.Tech Computer Science",
  year: "2nd Year",
  email: "aarav.sharma@example.edu",
  joined: "Aug 2023",
  points: 1240,
};

export type ClubCategory = "Tech" | "Entrepreneurship" | "Cultural" | "Sports";

export const clubs = [
  { id: "codecraft", name: "CodeCraft", category: "Tech" as ClubCategory, members: 186, lead: "Riya Menon", desc: "Coding sprints, open-source contributions, and weekly dev talks.", joined: true },
  { id: "robotics", name: "RoboNexus", category: "Tech" as ClubCategory, members: 94, lead: "Kabir Das", desc: "Build bots, drones and IoT prototypes in the maker lab.", joined: false },
  { id: "ecell", name: "E-Cell MSOT", category: "Entrepreneurship" as ClubCategory, members: 142, lead: "Sneha Iyer", desc: "Startup bootcamps, pitch nights and founder mentorship.", joined: true },
  { id: "finance", name: "Finvest Circle", category: "Entrepreneurship" as ClubCategory, members: 78, lead: "Arjun Rao", desc: "Markets, case competitions and business strategy.", joined: false },
  { id: "rhythm", name: "Rhythm & Rhymes", category: "Cultural" as ClubCategory, members: 120, lead: "Ananya Bose", desc: "Music, dance and the stage — performances all year.", joined: false },
  { id: "lit", name: "Literati", category: "Cultural" as ClubCategory, members: 65, lead: "Ishaan Gupta", desc: "Debates, poetry slams and the campus magazine.", joined: true },
  { id: "athletics", name: "Velocity Athletics", category: "Sports" as ClubCategory, members: 110, lead: "Meera Pillai", desc: "Track, field and fitness training sessions.", joined: false },
  { id: "cricket", name: "Strikers Cricket", category: "Sports" as ClubCategory, members: 58, lead: "Rohan Sen", desc: "Inter-college tournaments and weekend nets.", joined: false },
];

export type CalendarItem = { date: string; title: string; club: string; type: "Activity" | "Deadline" | "Event" };

export const calendarItems: CalendarItem[] = [
  { date: "2026-10-21", title: "Git & GitHub Workshop", club: "CodeCraft", type: "Activity" },
  { date: "2026-10-23", title: "Pitch Deck Submission", club: "E-Cell MSOT", type: "Deadline" },
  { date: "2026-10-24", title: "Club Day — Open House", club: "All Clubs", type: "Event" },
  { date: "2026-10-28", title: "Poetry Slam Night", club: "Literati", type: "Activity" },
  { date: "2026-10-30", title: "Hackathon Team Registration", club: "CodeCraft", type: "Deadline" },
  { date: "2026-11-02", title: "Inter-club Relay", club: "Velocity Athletics", type: "Activity" },
  { date: "2026-11-07", title: "Club Day — Showcase", club: "All Clubs", type: "Event" },
  { date: "2026-11-12", title: "Conference Abstract Due", club: "Research Cell", type: "Deadline" },
];

export const announcements = [
  { title: "Hackathon 2026 registrations open", body: "Teams of 2–4. Register before Oct 30.", time: "2h ago" },
  { title: "Club Day venue moved to Main Auditorium", body: "Due to renovation of Block C.", time: "Yesterday" },
  { title: "Gambade auditions schedule released", body: "Check the Events page for slots.", time: "2 days ago" },
];

export const participation = [
  { activity: "Startup Pitch Night", club: "E-Cell MSOT", date: "2026-10-10", role: "Presenter", status: "Attended" },
  { activity: "React Bootcamp Day 2", club: "CodeCraft", date: "2026-10-05", role: "Participant", status: "Attended" },
  { activity: "Debate: AI in Education", club: "Literati", date: "2026-09-28", role: "Speaker", status: "Attended" },
  { activity: "Open-source Sprint", club: "CodeCraft", date: "2026-09-20", role: "Participant", status: "Missed" },
  { activity: "Founders Fireside", club: "E-Cell MSOT", date: "2026-09-12", role: "Volunteer", status: "Attended" },
];

export type Submission = { id: string; title: string; club: string; kind: "Assignment" | "Presentation"; due: string; status: "Pending" | "Submitted" | "Reviewed" };

export const submissions: Submission[] = [
  { id: "s1", title: "Pitch Deck: Campus Startup Idea", club: "E-Cell MSOT", kind: "Presentation", due: "2026-10-23", status: "Pending" },
  { id: "s2", title: "REST API Mini-project", club: "CodeCraft", kind: "Assignment", due: "2026-10-26", status: "Pending" },
  { id: "s3", title: "Book Review: Sapiens", club: "Literati", kind: "Assignment", due: "2026-10-15", status: "Submitted" },
  { id: "s4", title: "Market Analysis Slides", club: "E-Cell MSOT", kind: "Presentation", due: "2026-10-02", status: "Reviewed" },
];

export const events = [
  { id: "hackathon", name: "Hackathon", tagline: "36 hours. One problem. Your code.", date: "Nov 14–15, 2026", venue: "Innovation Lab", seats: "120 teams", tag: "Tech" },
  { id: "gambade", name: "Gambade", tagline: "The annual cultural extravaganza.", date: "Dec 5–7, 2026", venue: "Main Auditorium", seats: "Open to all", tag: "Cultural" },
  { id: "crossroad", name: "Cross Road", tagline: "Inter-college sports & strategy meet.", date: "Jan 16–18, 2027", venue: "MSOT Grounds", seats: "24 colleges", tag: "Sports" },
  { id: "conference", name: "International Conference", tagline: "Research, ideas, and global voices.", date: "Feb 20–21, 2027", venue: "Convention Hall", seats: "300 delegates", tag: "Academic" },
];

export const certificates = [
  { title: "Winner — Startup Pitch Night", issuer: "E-Cell MSOT", date: "Oct 2026", kind: "Achievement" },
  { title: "React Bootcamp Completion", issuer: "CodeCraft", date: "Oct 2026", kind: "Certificate" },
  { title: "Best Speaker — AI Debate", issuer: "Literati", date: "Sep 2026", kind: "Achievement" },
  { title: "Volunteer — Founders Fireside", issuer: "E-Cell MSOT", date: "Sep 2026", kind: "Certificate" },
];
