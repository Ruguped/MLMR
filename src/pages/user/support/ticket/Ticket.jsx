import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getIndividualTicket, sendTicketMessage,closeIndividualTicket,reopenIndividualTicket } from '../../../../libs/authApi.js';
import useUserStore from '../../../../store/userStore.js';
import { useToast } from '../../../../store/toastStore.js';

export default function Ticket() {
  const { id } = useParams();
  const { user } = useUserStore();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isReopening, setIsReopening] = useState(false);

  const { data: ticketData, isLoading, isError } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const res = await getIndividualTicket(id);
      return res.data;
    }
  });

  const ticket = ticketData?.ticket || {};
  const messages = ticket?.messages || [];

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      await sendTicketMessage(id, { message: newMessage });
      toast.success('Message sent!');
      setNewMessage('');
      // Refetch ticket to get updated messages
      queryClient.invalidateQueries({
        queryKey: ['ticket', id]
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  }

  async function handleCloseTicket(){
    setIsClosing(true);
    try {
      await closeIndividualTicket(id);
      toast.success('Ticket closed!');
      // Refetch ticket to get updated status
      queryClient.invalidateQueries({
        queryKey: ['ticket', id]
      });
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('Failed to close ticket');
    } finally {
      setIsClosing(false);
    }
  }

  async function handleReopenTicket(){
    setIsReopening(true);
    try {
      await reopenIndividualTicket(id);
      toast.success('Ticket reopened!');
      // Refetch ticket to get updated status
      queryClient.invalidateQueries({
        queryKey: ['ticket', id]
      });
    } catch (error) {
      console.error('Error reopening ticket:', error);
      toast.error('Failed to reopen ticket');
    } finally {
      setIsReopening(false);
    }
  }

  if (isLoading) {
    return <div className="dashboard_right"><h3>Loading...</h3></div>;
  }

  if (isError) {
    return <div className="dashboard_right"><h3>Error loading ticket</h3></div>;
  }

  return <div className="dashboard_right">
    <div className="support_section">
      <div className="top_heading_cnt">
        <div className="cnt_left_s">
          <h3>{ticket.ticketNumber} <img src="/images/file_dock.svg" alt="icon" />&nbsp;</h3>
        </div>
        <div className="notification_icon">
          <img src="/images/refersh_icon.svg" alt="setting" />
        </div>
      </div>
      <div className="ticket_block">
        {messages.map((msg, index) => (
          <div key={index} className={`ticket_support_team ${msg.sender === 'user' ? 'right_side' : ''}`}>
            <h5>{msg.sender === 'user' ? user?.username || 'You' : 'Support Team:'}</h5>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Send Message - only if ticket is open or in-progress */}
      {(ticket.status === 'open' || ticket.status === 'in-progress') && (
        <div className="profile_form mt-3">
          <form onSubmit={handleSendMessage}>
            <div className="control_input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                placeholder="Type your message..."
              />
            </div>
            <button className="btn" type="submit" disabled={isSending || !newMessage.trim()}>
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            <button className="btn" onClick={handleCloseTicket} disabled={isClosing}>
              {isClosing ? 'Closing...' : 'Close Ticket'}
            </button>
          </form>
        </div>
      )}

      {ticket.status === 'closed' && (
        <div className="ticket_resolved">
          <h4>This ticket has been resolved</h4>
          <button className="btn" onClick={handleReopenTicket} disabled={isReopening}>Reopen</button>

        </div>
      )}
    </div>
  </div>;``
}