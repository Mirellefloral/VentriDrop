import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import DashboardLayout from './DashboardLayout';

const AUTO_REPLIES = {
  seller: [
    "Hello! Welcome to our store 🌿 How can I help you today?",
    "Thank you for your message! We'll get back to you shortly.",
    "Your order is being processed. Expected delivery within 2-3 hours.",
    "Payment confirmed! ✅ Your order has been dispatched.",
    "Thank you for shopping with us! Please rate your experience ⭐"
  ]
};

export default function MessagesPage({ role }) {
  const { user, messages, sendMessage, addNotification } = useApp();
  const [activeConv, setActiveConv] = useState(messages[0] || null);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv, messages]);

  const currentConv = messages.find(c => c.id === activeConv?.id) || messages[0];
  const myId = user?.id || (role === 'buyer' ? 'b1' : role === 'seller' ? 's1' : 'r1');

  const handleSend = async () => {
    if (!input.trim() || !currentConv) return;
    const msg = input.trim();
    setInput('');
    sendMessage(currentConv.id, msg, myId);

    // Auto-reply if buyer is messaging seller
    if (role === 'buyer') {
      setTyping(true);
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
      setTyping(false);
      const replies = AUTO_REPLIES.seller;
      const reply = replies[Math.floor(Math.random() * replies.length)];
      sendMessage(currentConv.id, reply, currentConv.otherParty.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* Conversations list */}
        <div style={{
          width: 280, borderRight: '1px solid var(--border)',
          background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', flexShrink: 0
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18 }}>💬 Messages</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                No conversations yet
              </div>
            ) : messages.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                style={{
                  padding: '14px 16px', cursor: 'pointer',
                  background: activeConv?.id === conv.id ? 'rgba(0,195,123,0.08)' : 'transparent',
                  borderLeft: activeConv?.id === conv.id ? '3px solid var(--brand-primary)' : '3px solid transparent',
                  transition: 'var(--transition)', display: 'flex', gap: 12, alignItems: 'center'
                }}
              >
                <div className="avatar" style={{ width: 44, height: 44 }}>{conv.otherParty.avatar || '👤'}</div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{conv.otherParty.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.messages[conv.messages.length - 1]?.text || 'No messages'}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  {conv.messages[conv.messages.length - 1]?.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {currentConv ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Chat header */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="avatar" style={{ width: 40, height: 40 }}>{currentConv.otherParty.avatar}</div>
              <div>
                <div style={{ fontWeight: 700 }}>{currentConv.otherParty.name}</div>
                <div style={{ fontSize: 12, color: 'var(--brand-primary)' }}>
                  {currentConv.otherParty.role === 'seller' ? '🏪 Seller' : currentConv.otherParty.role === 'rider' ? '🏍️ Rider' : '🛒 Buyer'} · Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {currentConv.messages.map(msg => {
                const isMine = msg.senderId === myId;
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                    <div className={`msg-bubble ${isMine ? 'sent' : msg.isAuto ? 'auto-reply' : 'received'}`}>
                      {msg.isAuto && !isMine && (
                        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4, opacity: 0.7 }}>🤖 Auto-reply</div>
                      )}
                      {msg.text}
                      <div className="msg-time">{msg.time}</div>
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div className="avatar" style={{ width: 28, height: 28, fontSize: '0.9em' }}>{currentConv.otherParty.avatar}</div>
                  <div className="msg-bubble received" style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)', animation: `bounce 1.2s infinite`, animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <textarea
                className="input"
                rows={1}
                style={{ resize: 'none', flex: 1, maxHeight: 120 }}
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="btn btn-primary"
                onClick={handleSend}
                disabled={!input.trim()}
                style={{ borderRadius: 12, padding: '11px 18px' }}
              >
                ➤
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-state" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="empty-icon">💬</div>
            <h3>No conversation selected</h3>
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
