import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Calendar, Clock, MessageSquare, CheckCircle, ArrowRight, Server, Globe } from "lucide-react";

interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { x: number; y: number }; // Relative to Africa SVG
}

export default function ContactConsultation() {
  const offices: OfficeLocation[] = [
    {
      city: "Nairobi",
      country: "Kenya (East African Hub)",
      address: "Suite 1200, Delta Towers, Westlands, Nairobi",
      phone: "+254 (0) 20 894 3000",
      email: "nairobi@axiontech.corp",
      coordinates: { x: 265, y: 220 } // Coordinates on custom Africa SVG
    },
    {
      city: "Lagos",
      country: "Nigeria (West African Hub)",
      address: "Level 14, Kings Tower, Ikoyi, Lagos",
      phone: "+234 (1) 460 2200",
      email: "lagos@axiontech.corp",
      coordinates: { x: 145, y: 185 }
    },
    {
      city: "Johannesburg",
      country: "South Africa (SADC Hub)",
      address: "Axion Space, 100 Melville Road, Illovo, Johannesburg",
      phone: "+27 (0) 11 345 9000",
      email: "johannesburg@axiontech.corp",
      coordinates: { x: 235, y: 350 }
    }
  ];

  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(offices[0]);
  const [bookingState, setBookingState] = useState({
    name: "",
    email: "",
    company: "",
    date: "",
    time: "",
    notes: ""
  });
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div id="contact" className="w-full bg-black/40 border border-blue-950 rounded-xl p-6 md:p-8 relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Map & Locations */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">Pan-African Presence</span>
            <h3 className="font-display font-semibold text-2xl text-white mt-1 mb-2">
              Corporate Headquarters & Nodes
            </h3>
            <p className="text-sm text-gray-400 max-w-md mb-6">
              Connect with our enterprise architects in Lagos, Nairobi, and Johannesburg for regional-specific system assessments.
            </p>
          </div>

          {/* Map and Office Selector Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Africa Map Column */}
            <div className="md:col-span-6 flex justify-center bg-[#030610] rounded-lg p-4 border border-blue-950 relative h-64">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full text-blue-950/20 fill-current max-w-[240px]"
              >
                {/* Simulated abstract African Continent Outline */}
                <path
                  d="M110,60 L280,45 L320,130 L380,185 L320,240 L280,290 L240,360 L210,380 L180,330 L160,250 L140,210 L80,180 L50,140 L70,110 Z"
                  stroke="#0f1f45"
                  strokeWidth="1.5"
                  fill="#050b18"
                />

                {/* Connection lines between Nairobi, Lagos, Johannesburg */}
                <line
                  x1={offices[0].coordinates.x}
                  y1={offices[0].coordinates.y}
                  x2={offices[1].coordinates.x}
                  y2={offices[1].coordinates.y}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1={offices[0].coordinates.x}
                  y1={offices[0].coordinates.y}
                  x2={offices[2].coordinates.x}
                  y2={offices[2].coordinates.y}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1={offices[1].coordinates.x}
                  y1={offices[1].coordinates.y}
                  x2={offices[2].coordinates.x}
                  y2={offices[2].coordinates.y}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />

                {/* Animated office nodes on the map */}
                {offices.map((office) => {
                  const isSelected = selectedOffice.city === office.city;
                  return (
                    <g
                      key={office.city}
                      onClick={() => setSelectedOffice(office)}
                      className="cursor-pointer group"
                    >
                      {/* Pulsating outer ring */}
                      <circle
                        cx={office.coordinates.x}
                        cy={office.coordinates.y}
                        r={isSelected ? 10 : 6}
                        className={`fill-current ${
                          isSelected ? "text-gold-400 animate-pulse" : "text-blue-500/50 group-hover:text-blue-400"
                        }`}
                        opacity={isSelected ? 0.3 : 0.2}
                      />
                      {/* Main core dot */}
                      <circle
                        cx={office.coordinates.x}
                        cy={office.coordinates.y}
                        r={isSelected ? 5 : 3.5}
                        className={`fill-current ${
                          isSelected ? "text-gold-400" : "text-blue-500"
                        }`}
                      />
                      {/* Name Label */}
                      <text
                        x={office.coordinates.x + 8}
                        y={office.coordinates.y + 4}
                        fill={isSelected ? "#e2b042" : "#6b7280"}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {office.city}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Office Details Column */}
            <div className="md:col-span-6 space-y-4 font-sans">
              <div className="bg-[#050b18] border border-blue-950 p-4 rounded-lg">
                <span className="font-mono text-[9px] text-gray-500 uppercase">Selected Terminal</span>
                <h4 className="font-display font-semibold text-lg text-white mt-1">
                  {selectedOffice.city} Office
                </h4>
                <p className="text-xs text-gold-400 font-medium font-mono">{selectedOffice.country}</p>

                <div className="space-y-2.5 mt-4 text-xs text-gray-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{selectedOffice.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{selectedOffice.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="hover:text-gold-400 transition-colors">{selectedOffice.email}</span>
                  </div>
                </div>
              </div>

              {/* Pan-African Nodes list selector */}
              <div className="flex gap-2 font-mono text-[10px]">
                {offices.map((office) => (
                  <button
                    key={office.city}
                    onClick={() => setSelectedOffice(office)}
                    className={`px-2.5 py-1.5 border rounded uppercase cursor-pointer ${
                      selectedOffice.city === office.city
                        ? "bg-blue-950 border-blue-700 text-white"
                        : "bg-transparent border-gray-800 text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {office.city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Executive Booking Scheduler */}
        <div className="lg:col-span-5 bg-black/40 border border-blue-950 rounded-xl p-5 md:p-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isBooked ? (
              <motion.form
                key="booking-form"
                onSubmit={handleBook}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-display font-semibold text-base text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    Schedule Briefing
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Book a direct video conference or office visit with our regional partners.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={bookingState.name}
                    onChange={(e) => setBookingState({ ...bookingState, name: e.target.value })}
                    className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Corporate Email Address"
                    value={bookingState.email}
                    onChange={(e) => setBookingState({ ...bookingState, email: e.target.value })}
                    className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                {/* Company */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Organization Name"
                    value={bookingState.company}
                    onChange={(e) => setBookingState({ ...bookingState, company: e.target.value })}
                    className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60"
                  />
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={bookingState.date}
                      onChange={(e) => setBookingState({ ...bookingState, date: e.target.value })}
                      className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={bookingState.time}
                      onChange={(e) => setBookingState({ ...bookingState, time: e.target.value })}
                      className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60"
                    />
                  </div>
                </div>

                {/* Briefing Agenda / Notes */}
                <div>
                  <textarea
                    rows={2}
                    placeholder="Agenda / Scope of Modernization"
                    value={bookingState.notes}
                    onChange={(e) => setBookingState({ ...bookingState, notes: e.target.value })}
                    className="w-full bg-[#040814] border border-blue-950/80 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-gold-500/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs py-3 rounded uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-gold-500/10"
                >
                  Confirm Executive Request
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-6 flex flex-col items-center justify-center h-full"
              >
                <div className="w-14 h-14 bg-emerald-950/50 border border-emerald-500/30 rounded-full flex items-center justify-center mb-4 text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h5 className="font-display font-semibold text-lg text-white mb-2">Briefing Slot Reserved</h5>
                <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6">
                  Thank you, <span className="text-gold-400 font-bold">{bookingState.name}</span>. We have logged your request on behalf of <span className="text-white font-semibold">{bookingState.company}</span> for <span className="text-white font-semibold">{bookingState.date}</span> at <span className="text-white font-semibold">{bookingState.time}</span>.
                </p>

                <div className="bg-[#050b18] border border-blue-950 p-3 rounded text-left w-full text-xs text-gray-300 space-y-2">
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1">Direct Liaison channels</div>
                  <div className="flex justify-between items-center">
                    <span>Nairobi Direct:</span>
                    <a href="https://wa.me/254208943000" target="_blank" className="text-gold-400 font-bold hover:underline">WhatsApp Direct</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Corporate Liaison:</span>
                    <a href="mailto:liaison@axiontech.corp" className="text-gold-400 font-bold hover:underline">liaison@axiontech.corp</a>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="mt-6 text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Schedule Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
