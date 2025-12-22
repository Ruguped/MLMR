

import React, { useState } from 'react'
import useUserStore from '../../../store/userStore.js'
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicket, getTickets } from '../../../libs/authApi.js';
import { useToast } from '../../../store/toastStore.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



export default function Support() {
  const { user } = useUserStore();
  const {
    _id,
    username,
    phone,
    email,
    role,
    isVerified,
    currentPlan,
    verificationStatus,
    sponsorId,
    sponsorUsername,
    referredByAdmin,
    investmentAmount,
    totalInvested,
    dailyROI,
    maxReturnPercentage,
    totalEarnings,
    lastROICalculated,
    directReferrals,
    totalReferrals,
    kycStatus,
    kycRejectionReason,
    kycSubmittedAt,
    totalCommission,
    depositWallet,
    investmentWallet,
    returnsWallet,
    isActive,
    isBanned,
    referralsByPlanL1,
    referralsByPlanL2ToL7,
    network,
    transactions,
    referralCode,
    createdAt,
    updatedAt,
    __v,
    kycDocuments: {
      panCard,
      aadhaarFront,
      aadhaarBack,
      selfie
    }
  } = user;

  const toast = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);






  const schema = z.object({
    email: z.string().email("Invalid email"),
    subject: z.string().min(5, "Subject too short"),
    message: z.string().min(20, "Description too short"),
    category: z.string().min(1, "Category is required"),
    supportingDocuments: z.any().optional(),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched"
  });


  async function onSubmit(payload) {
    setIsSubmitting(true);
    try {
      console.log("supportingDocuments:", payload.supportingDocuments);
      const formData = new FormData();
      formData.append("email", payload.email);
      formData.append("subject", payload.subject);
      formData.append("message", payload.message);
      formData.append("category", payload.category);
      if (payload.supportingDocuments?.length > 0) {
        formData.append('supportingDocuments', payload.supportingDocuments[0]);
      }
      await createTicket(formData);
      toast.success("Ticket created successfully");
      reset();
      // Refresh tickets list
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  }




  const [currentPage, setCurrentPage] = useState(1);

  const { data: ticketsData, isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', currentPage],
    queryFn: async () => {
      const res = await getTickets(currentPage);
      return res.data;
    }
  });
  const tickets = ticketsData?.tickets || [];
  const pagination = ticketsData?.pagination || { currentPage: 1, totalPages: 1 };




  return <div className="dashboard_right">
    <div className="top_header_dash">
      <div className="user_profile">
        <div className="user_img"><img src="/images/user_dash_profile.svg" alt="user" height="54px" width="54px" className="round_img" /></div>
        <div className="user_profile_cnt">
          <h3>{username}</h3>
          <ul className="user_social">
            <li><a href="#"><img src="/images/user_social.svg" alt="social" /></a></li>
            <li><a href="#"><img src="/images/user_social2.svg" alt="social" /></a></li>
          </ul>
        </div>
      </div>
      <div className="profile_id_s">
        <div className="profile_id">
          <span>UID :</span>{_id}<img src="/images/uid_icon.svg" className="m-1" alt="icon" />
        </div>
        <div className="profile_id">
          <span>Referral ID :</span>{referralCode}<img src="/images/uid_icon.svg" className="m-1" alt="icon" />
        </div>
        <div className="profile_id kycstatus">
          <span>KYC Status</span><a className="text-success" href="#">KYC Verified</a>
        </div>
      </div>
    </div>
    <div className="support_section">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" aria-selected="true" role="tab">
            <img src="/images/doc_list_icon.svg" alt="icon" />
            Issue List</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-selected="false" tabIndex={-1}>
            <img src="/images/ticket_icon.svg" alt="icon" />
            Submit Ticket.</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
          <div className="issuse_list_t">
            <table>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ticketsLoading ? (
                  <tr><td colSpan="5">Loading tickets...</td></tr>
                ) : tickets.length === 0 ? (
                  <tr><td colSpan="5">No tickets found</td></tr>
                ) : (
                  tickets.map((ticket, index) => (
                    <tr key={ticket._id} className={index === tickets.length - 1 ? "border_none" : ""}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>
                        <div className="d-flex">
                          {ticket.ticketNumber}
                          <span><img src="/images/uid_icon.svg" alt="doc" /></span>
                        </div>
                      </td>
                      <td>{ticket.subject}</td>
                      <td>{ticket.status}</td>
                      <td><Link to={`/user/support/tickets/${ticket._id}`}><button className="btn">View</button></Link></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination - add after </table> */}
            <nav aria-label="Tickets pagination" className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)} disabled={pagination.currentPage === 1}>
                    Previous
                  </button>
                </li>
                <li className="page-item disabled">
                  <span className="page-link">Page {pagination.currentPage} of {pagination.totalPages}</span>
                </li>
                <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)} disabled={pagination.currentPage === pagination.totalPages}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div className="profile_form submit_ticket_form">
            <div className="issuse_list_t">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-input_bl">
                  <div className="control_input">
                    <lable>email Id</lable>
                    <input
                      {...register("email")}
                      className={errors.email ? "is-invalid" : ""}
                      type="email" placeholder="Enter your email" />
                    {errors.email && <span className="text-danger small">{errors.email.message}</span>}
                  </div>
                  <div className="control_input">
                    <lable>Category</lable>
                    <select {...register("category")}>
                      <option value="" disabled>Select Category</option>
                      <option value="technical">Technical</option>
                      <option value="billing">Billing</option>
                      <option value="account">Account</option>
                      <option value="general">General</option>
                      <option value="kyc">KYC</option>
                    </select>
                    {errors.category && <span className="text-danger small">{errors.category.message}</span>}
                  </div>
                  <div className="control_input">
                    <lable>Subject</lable>
                    <input
                      {...register("subject")}
                      className={errors.subject ? "is-invalid" : ""}
                      type="text" placeholder="Enter subject" />
                    {errors.subject && <span className="text-danger small">{errors.subject.message}</span>}
                  </div>
                </div>
                <div className="col-input_bl">
                  {/*<div className="control_input">
                  <lable>Exchange</lable>
                  <select>
                    <option>Centralized Exchange</option>
                  </select>
                </div>*/}
                  <div className="control_input">
                    <lable>Description</lable>

                    <textarea
                      {...register("message")}
                      className={errors.message ? "is-invalid" : ""}
                      rows={4} cols={54} placeholder="Type Message Here" />
                    {errors.message && <span className="text-danger small">{errors.message.message}</span>}
                  </div>
                  <div className="control_input">
                    <lable>Supporting documents (Attach)</lable>
                    <input
                      type="file" accept=".jpg,.png,.pdf"
                      {...register("supportingDocuments")} />
                    {errors.supportingDocuments && <span className="text-danger small">{errors.supportingDocuments.message}</span>}
                  </div>
                </div>
                <div className="control_input">
                  <input className="btn" type="submit"
                    value={isSubmitting ? "Submitting..." : "Submit"}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}