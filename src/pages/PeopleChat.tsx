import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Search, Plus, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatContact {
  id: string;
  name: string;
  auraColor: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  online: boolean;
}

interface DirectMessage {
  id: string;
  content: string;
  sender: "me" | "them";
  timestamp: Date;
}

const sampleContacts: ChatContact[] = [
  { id: "c1", name: "Peaceful Soul", auraColor: "152 35% 45%", lastMessage: "That meditation tip really helped 🙏", timestamp: new Date(Date.now() - 1000 * 60 * 5), unread: 2, online: true },
  { id: "c2", name: "Sunrise Seeker", auraColor: "45 70% 60%", lastMessage: "I've been journaling every morning now", timestamp: new Date(Date.now() - 1000 * 60 * 30), unread: 0, online: true },
  { id: "c3", name: "Quiet River", auraColor: "200 40% 50%", lastMessage: "Thank you for listening yesterday", timestamp: new Date(Date.now() - 1000 * 60 * 120), unread: 0, online: false },
  { id: "c4", name: "Warm Light", auraColor: "30 60% 55%", lastMessage: "Let's talk more about that book", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), unread: 1, online: false },
];

const sampleMessages: Record<string, DirectMessage[]> = {
  c1: [
    { id: "m1", content: "Hey, I tried the breathing exercise you mentioned", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    { id: "m2", content: "That's great! How did it feel?", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 8) },
    { id: "m3", content: "Really calming actually. I did it before my presentation", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 6) },
    { id: "m4", content: "That meditation tip really helped 🙏", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  ],
  c2: [
    { id: "m5", content: "Morning journaling has changed my perspective", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 35) },
    { id: "m6", content: "What do you usually write about?", sender: "me", timestamp: new Date(Date.now() - 1000 * 60 * 32) },
    { id: "m7", content: "I've been journaling every morning now", sender: "them", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  ],
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
};

const PeopleChat = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Record<string, DirectMessage[]>>(sampleMessages);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredContacts = sampleContacts.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!inputText.trim() || !activeChat) return;
    const newMsg: DirectMessage = {
      id: `m-${Date.now()}`,
      content: inputText.trim(),
      sender: "me",
      timestamp: new Date(),
    };
    setMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setInputText("");
  };

  // Chat conversation view
  if (activeChat) {
    const chatMessages = messages[activeChat.id] || [];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col">
        <div className="ambient-orb animate-pulse-soft" style={{ width: 160, height: 160, top: "5%", right: "-8%", background: `hsl(${activeChat.auraColor})` }} />

        {/* Header */}
        <div className="px-4 pt-12 pb-3 flex items-center gap-3 relative z-10" style={{ borderBottom: "1px solid hsl(var(--border) / 0.15)" }}>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveChat(null)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, hsl(${activeChat.auraColor} / 0.5), hsl(${activeChat.auraColor} / 0.2))` }}>
            <span className="text-sm font-display font-bold" style={{ color: `hsl(${activeChat.auraColor})` }}>
              {activeChat.name.split(" ").map(w => w[0]).join("")}
            </span>
            {activeChat.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "hsl(var(--healing-green))", borderColor: "hsl(var(--background))" }} />
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-sm font-semibold text-foreground">{activeChat.name}</h2>
            <p className="font-body text-[10px] text-muted-foreground">{activeChat.online ? "Online" : `Last seen ${getTimeAgo(activeChat.timestamp)}`}</p>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <MoreHorizontal size={16} className="text-muted-foreground" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative z-10" style={{ scrollbarWidth: "none" }}>
          {chatMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[75%] px-4 py-2.5 rounded-2xl"
                style={msg.sender === "me" ? {
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  borderBottomRightRadius: "6px",
                } : {
                  background: "hsl(var(--muted) / 0.6)",
                  color: "hsl(var(--foreground))",
                  borderBottomLeftRadius: "6px",
                }}
              >
                <p className="font-body text-sm leading-relaxed">{msg.content}</p>
                <p className="font-body text-[9px] mt-1 opacity-60 text-right">{getTimeAgo(msg.timestamp)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-8 pt-2 relative z-10">
          <div className="flex gap-2 items-end rounded-2xl border p-2" style={{ background: "hsl(var(--muted) / 0.3)", borderColor: "hsl(var(--border) / 0.3)" }}>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm font-body px-2 py-1.5 outline-none"
              style={{ color: "hsl(var(--foreground))" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30"
              style={{ background: "hsl(var(--primary))" }}
            >
              <Send size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Contacts list view
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-background flex flex-col">
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />

      {/* Header */}
      <div className="px-4 pt-12 pb-3 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl flex items-center justify-center glass-card">
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div className="flex-1">
            <h1 className="font-display text-lg text-foreground font-semibold">Messages</h1>
            <p className="font-body text-[10px] text-muted-foreground">Connect with your community</p>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowSearch(!showSearch)} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <Search size={16} className="text-muted-foreground" />
          </motion.button>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
              <input
                type="text"
                placeholder="Search conversations…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border pl-4 pr-4 py-2.5 text-xs font-body outline-none"
                style={{ background: "hsl(var(--muted) / 0.4)", borderColor: "hsl(var(--border) / 0.5)", color: "hsl(var(--foreground))" }}
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto relative z-10" style={{ scrollbarWidth: "none" }}>
        {filteredContacts.map((contact, i) => (
          <motion.button
            key={contact.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveChat(contact)}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b text-left"
            style={{ borderColor: "hsl(var(--border) / 0.1)" }}
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center relative flex-shrink-0" style={{ background: `linear-gradient(135deg, hsl(${contact.auraColor} / 0.5), hsl(${contact.auraColor} / 0.2))` }}>
              <span className="text-sm font-display font-bold" style={{ color: `hsl(${contact.auraColor})` }}>
                {contact.name.split(" ").map(w => w[0]).join("")}
              </span>
              {contact.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: "hsl(var(--healing-green))", borderColor: "hsl(var(--background))" }} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="font-display text-sm font-semibold text-foreground truncate">{contact.name}</h3>
                <span className="font-body text-[10px] text-muted-foreground flex-shrink-0">{getTimeAgo(contact.timestamp)}</span>
              </div>
              <p className="font-body text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
            </div>

            {/* Unread badge */}
            {contact.unread > 0 && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                {contact.unread}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PeopleChat;
