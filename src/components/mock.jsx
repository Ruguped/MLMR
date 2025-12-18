// // src/pages/Login.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginApi, registerApi } from "../libs/authApi";
// import useAuthStore from "../store/authStore";
// export default function Login({}) {
//   const navigate = useNavigate();
//   const loginStore = useAuthStore();
//   // Login handler (used by both email/mobile login forms)
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData(e.target);
//     const payload = {
//       email: form.get("email") || undefined,
//       phone: form.get("phone") || undefined,
//       username: form.get("username") || undefined,
//       password: form.get("password"),
//     };
//     try {
//       const res = await loginApi(payload);
//       const { token } = res.data;
//       console.log("Login response:", res.data);
//       if (token) {
//         loginStore.login(token);
//         navigate("/", { replace: true });
//       } else {
//         alert(res.data?.error || "Login succeeded but no token returned");
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || err.message || "Login failed";
//       alert(msg);
//     }
//   };
//   // Register handler
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData(e.target);
//     const payload = {
//       email: form.get("reg_email") || undefined,
//       phone: form.get("reg_phone") || undefined,
//       username: form.get("reg_username"),
//       password: form.get("reg_password"),
//       referralCode: form.get("referralCode") || undefined,
//     };
//     try {
//       const res = await registerApi(payload);
//       if (res.data?.requiresVerification) {
//         alert(
//           res.data.message ||
//             "Registered. Please verify OTP. userId: " + (res.data.userId || "")
//         );
//       } else {
//         alert(res.data.message || "Registered successfully");
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || err.message || "Register failed";
//       alert(msg);
//     }
//   };
//   return (
//     <div className="loginlightbox">
//       <div className="container">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="row g-0">
//               {/* Left Section */}
//               <div className="col-md-6 text-center">
//                 <div className="login_vector">
//                   <img src="/images/forex_login_vector.png" alt="Login" />
//                 </div>
//               </div>
//               {/* Right Section */}
//               <div className="col-md-6 border_lft">
//                 <div className="login_right">
//                   <div className="d-flex justify-content-center pt-4">
//                     <ul className="nav nav-pills nav-login-tabs" id="loginSignupTabs" role="tablist">
//                       <li className="nav-item" role="presentation">
//                         <button className="nav-link active" id="login-tab" data-bs-toggle="pill" data-bs-target="#login" type="button">Login</button>
//                       </li>
//                       <li className="nav-item" role="presentation">
//                         <button className="nav-link" id="signup-tab" data-bs-toggle="pill" data-bs-target="#signup" type="button">Sign in</button>
//                       </li>
//                     </ul>
//                     <Link to="/">
//                       <button type="button" className="btn-close" />
//                     </Link>
//                   </div>
//                   <div className="methods_h">
//                     <h5>SHOW ALL METHODS</h5>
//                   </div>
//                   <div className="email_mobile_form">
//                     <div className="tab-content" id="loginSignupTabsContent">
//                       {/* LOGIN TAB */}
//                       <div className="tab-pane fade show active" id="login">
//                         <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs" role="tablist">
//                           <li className="nav-item">
//                             <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login">Mobile</button>
//                           </li>
//                           <li className="nav-item">
//                             <button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login">Email</button>
//                           </li>
//                         </ul>
//                         <div className="tab-content">
//                           {/* Mobile login */}
//                           <div className="tab-pane fade show active" id="mobile-login">
//                             {/* action is progressive fallback; JS onSubmit handles SPA flow */}
//                             <form
//                               action="http://192.168.1.5:3750/api/user/login"
//                               method="post"
//                               onSubmit={handleLoginSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="phone" type="text" className="form-control mb-3" placeholder="Enter Mobile Number" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
//                               <button type="submit" className="btn btn-login w-100">Login</button>
//                               <div className="divider">Or Continue With</div>
//                               <button type="button" className="btn btn-google w-100"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width={20} className="me-2" />Sign In With Google</button>
//                             </form>
//                           </div>
//                           {/* Email login */}
//                           <div className="tab-pane fade" id="email-login">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/login"
//                               method="post"
//                               onSubmit={handleLoginSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="email" type="email" className="form-control mb-3" placeholder="Enter Email" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
//                               <button type="submit" className="btn btn-login w-100">Login</button>
//                               <div className="divider">Or Continue With</div>
//                               <button type="button" className="btn btn-google w-100"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width={20} className="me-2" />Sign In With Google</button>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                       {/* SIGNUP TAB */}
//                       <div className="tab-pane fade" id="signup">
//                         <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs_2" role="tablist">
//                           <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login_2">Mobile</button></li>
//                           <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login_2">Email</button></li>
//                         </ul>
//                         <div className="tab-content">
//                           {/* Mobile signup */}
//                           <div className="tab-pane fade show active" id="mobile-login_2">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/register"
//                               method="post"
//                               onSubmit={handleRegisterSubmit}
//                             >
//                               <div className="form_input padding_space">
//                                 <input name="reg_phone" type="text" className="form-control mb-3" placeholder="Enter Mobile Number" />
//                                 <div className="getotp">
//                                   <button type="button">Get Otp</button>
//                                 </div>
//                               </div>
//                               {/* USERNAME - required by backend */}
//                               <div className="form_input">
//                                 <input name="reg_username" type="text" className="form-control mb-3" placeholder="Choose a username" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="reg_otp" type="text" className="form-control mb-3" placeholder="Enter Otp" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="reg_password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <div className="selectoption">
//                                   <label>Choose country of residence</label>
//                                   <select>
//                                     <option>India</option>
//                                     <option>Japan</option>
//                                   </select>
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <input name="referralCode" type="text" className="form-control mb-2" placeholder="enter referral/promo code" />
//                               </div>
//                               <div className="form_input">
//                                 <div className="checkbox mb-2">
//                                   <input type="checkbox" />
//                                   <span>I have read and agree to the <a href="#">user agreement</a> and <a href="#">privacy policy</a></span>
//                                 </div>
//                               </div>
//                               <button type="submit" className="btn btn-login w-100">Sing In</button>
//                             </form>
//                           </div>
//                           {/* Email signup */}
//                           <div className="tab-pane fade" id="email-login_2">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/register"
//                               method="post"
//                               onSubmit={handleRegisterSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="reg_email" type="email" className="form-control mb-3" placeholder="Enter Email" />
//                               </div>
//                               {/* USERNAME - required by backend */}
//                               <div className="form_input">
//                                 <input name="reg_username" type="text" className="form-control mb-3" placeholder="Choose a username" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="reg_password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <div className="selectoption">
//                                   <label>Choose country of residence</label>
//                                   <select>
//                                     <option>India</option>
//                                     <option>Japan</option>
//                                   </select>
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <input name="referralCode" type="text" className="form-control mb-2" placeholder="enter referral/promo code" />
//                               </div>
//                               <div className="form_input">
//                                 <div className="checkbox mb-2">
//                                   <input type="checkbox" />
//                                   <span>I have read and agree to the <a href="#">user agreement</a> and <a href="#">privacy policy</a></span>
//                                 </div>
//                               </div>
//                               <button type="submit" className="btn btn-login w-100">Sign In</button>
//                             </form>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";// // src/pages/Login.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginApi, registerApi } from "../libs/authApi";
// import useAuthStore from "../store/authStore";

// export default function Login({}) {
//   const navigate = useNavigate();
//   const loginStore = useAuthStore();

//   // Login handler (used by both email/mobile login forms)
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData(e.target);

//     const payload = {
//       email: form.get("email") || undefined,
//       phone: form.get("phone") || undefined,
//       username: form.get("username") || undefined,
//       password: form.get("password"),
//     };

//     try {
//       const res = await loginApi(payload);
//       const { token } = res.data;
//       console.log("Login response:", res.data);
//       if (token) {
//         loginStore.login(token);
//         navigate("/", { replace: true });
//       } else {
//         alert(res.data?.error || "Login succeeded but no token returned");
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || err.message || "Login failed";
//       alert(msg);
//     }
//   };

//   // Register handler
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData(e.target);

//     const payload = {
//       email: form.get("reg_email") || undefined,
//       phone: form.get("reg_phone") || undefined,
//       username: form.get("reg_username"),
//       password: form.get("reg_password"),
//       referralCode: form.get("referralCode") || undefined,
//     };

//     try {
//       const res = await registerApi(payload);
//       if (res.data?.requiresVerification) {
//         alert(
//           res.data.message ||
//             "Registered. Please verify OTP. userId: " + (res.data.userId || "")
//         );
//       } else {
//         alert(res.data.message || "Registered successfully");
//       }
//     } catch (err) {
//       const msg = err.response?.data?.error || err.message || "Register failed";
//       alert(msg);
//     }
//   };

//   return (
//     <div className="loginlightbox">
//       <div className="container">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="row g-0">
//               {/* Left Section */}
//               <div className="col-md-6 text-center">
//                 <div className="login_vector">
//                   <img src="/images/forex_login_vector.png" alt="Login" />
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="col-md-6 border_lft">
//                 <div className="login_right">
//                   <div className="d-flex justify-content-center pt-4">
//                     <ul className="nav nav-pills nav-login-tabs" id="loginSignupTabs" role="tablist">
//                       <li className="nav-item" role="presentation">
//                         <button className="nav-link active" id="login-tab" data-bs-toggle="pill" data-bs-target="#login" type="button">Login</button>
//                       </li>
//                       <li className="nav-item" role="presentation">
//                         <button className="nav-link" id="signup-tab" data-bs-toggle="pill" data-bs-target="#signup" type="button">Sign in</button>
//                       </li>
//                     </ul>
//                     <Link to="/">
//                       <button type="button" className="btn-close" />
//                     </Link>
//                   </div>

//                   <div className="methods_h">
//                     <h5>SHOW ALL METHODS</h5>
//                   </div>

//                   <div className="email_mobile_form">
//                     <div className="tab-content" id="loginSignupTabsContent">

//                       {/* LOGIN TAB */}
//                       <div className="tab-pane fade show active" id="login">
//                         <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs" role="tablist">
//                           <li className="nav-item">
//                             <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login">Mobile</button>
//                           </li>
//                           <li className="nav-item">
//                             <button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login">Email</button>
//                           </li>
//                         </ul>

//                         <div className="tab-content">
//                           {/* Mobile login */}
//                           <div className="tab-pane fade show active" id="mobile-login">
//                             {/* action is progressive fallback; JS onSubmit handles SPA flow */}
//                             <form
//                               action="http://192.168.1.5:3750/api/user/login"
//                               method="post"
//                               onSubmit={handleLoginSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="phone" type="text" className="form-control mb-3" placeholder="Enter Mobile Number" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
//                               <button type="submit" className="btn btn-login w-100">Login</button>
//                               <div className="divider">Or Continue With</div>
//                               <button type="button" className="btn btn-google w-100"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width={20} className="me-2" />Sign In With Google</button>
//                             </form>
//                           </div>

//                           {/* Email login */}
//                           <div className="tab-pane fade" id="email-login">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/login"
//                               method="post"
//                               onSubmit={handleLoginSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="email" type="email" className="form-control mb-3" placeholder="Enter Email" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="text-end mb-3 forgetpassword"><a href="#" className="text-warning small">Forget Password ?</a></div>
//                               <button type="submit" className="btn btn-login w-100">Login</button>
//                               <div className="divider">Or Continue With</div>
//                               <button type="button" className="btn btn-google w-100"><img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width={20} className="me-2" />Sign In With Google</button>
//                             </form>
//                           </div>
//                         </div>
//                       </div>

//                       {/* SIGNUP TAB */}
//                       <div className="tab-pane fade" id="signup">
//                         <ul className="nav emailtabs sub-tabs mb-3" id="loginMethodTabs_2" role="tablist">
//                           <li className="nav-item"><button className="nav-link active" data-bs-toggle="tab" data-bs-target="#mobile-login_2">Mobile</button></li>
//                           <li className="nav-item"><button className="nav-link" data-bs-toggle="tab" data-bs-target="#email-login_2">Email</button></li>
//                         </ul>

//                         <div className="tab-content">
//                           {/* Mobile signup */}
//                           <div className="tab-pane fade show active" id="mobile-login_2">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/register"
//                               method="post"
//                               onSubmit={handleRegisterSubmit}
//                             >
//                               <div className="form_input padding_space">
//                                 <input name="reg_phone" type="text" className="form-control mb-3" placeholder="Enter Mobile Number" />
//                                 <div className="getotp">
//                                   <button type="button">Get Otp</button>
//                                 </div>
//                               </div>

//                               {/* USERNAME - required by backend */}
//                               <div className="form_input">
//                                 <input name="reg_username" type="text" className="form-control mb-3" placeholder="Choose a username" />
//                               </div>

//                               <div className="form_input">
//                                 <input name="reg_otp" type="text" className="form-control mb-3" placeholder="Enter Otp" />
//                               </div>
//                               <div className="form_input">
//                                 <input name="reg_password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <div className="selectoption">
//                                   <label>Choose country of residence</label>
//                                   <select>
//                                     <option>India</option>
//                                     <option>Japan</option>
//                                   </select>
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <input name="referralCode" type="text" className="form-control mb-2" placeholder="enter referral/promo code" />
//                               </div>
//                               <div className="form_input">
//                                 <div className="checkbox mb-2">
//                                   <input type="checkbox" />
//                                   <span>I have read and agree to the <a href="#">user agreement</a> and <a href="#">privacy policy</a></span>
//                                 </div>
//                               </div>
//                               <button type="submit" className="btn btn-login w-100">Sing In</button>
//                             </form>
//                           </div>

//                           {/* Email signup */}
//                           <div className="tab-pane fade" id="email-login_2">
//                             <form
//                               action="http://192.168.1.5:3750/api/user/register"
//                               method="post"
//                               onSubmit={handleRegisterSubmit}
//                             >
//                               <div className="form_input">
//                                 <input name="reg_email" type="email" className="form-control mb-3" placeholder="Enter Email" />
//                               </div>

//                               {/* USERNAME - required by backend */}
//                               <div className="form_input">
//                                 <input name="reg_username" type="text" className="form-control mb-3" placeholder="Choose a username" />
//                               </div>

//                               <div className="form_input">
//                                 <input name="reg_password" type="password" className="form-control mb-2" placeholder="Enter Password" />
//                                 <div className="hide_vector">
//                                   <img src="/images/hide_vector.svg" alt="eye" />
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <div className="selectoption">
//                                   <label>Choose country of residence</label>
//                                   <select>
//                                     <option>India</option>
//                                     <option>Japan</option>
//                                   </select>
//                                 </div>
//                               </div>
//                               <div className="form_input">
//                                 <input name="referralCode" type="text" className="form-control mb-2" placeholder="enter referral/promo code" />
//                               </div>
//                               <div className="form_input">
//                                 <div className="checkbox mb-2">
//                                   <input type="checkbox" />
//                                   <span>I have read and agree to the <a href="#">user agreement</a> and <a href="#">privacy policy</a></span>
//                                 </div>
//                               </div>
//                               <button type="submit" className="btn btn-login w-100">Sign In</button>
//                             </form>
//                           </div>

//                         </div>
//                       </div>

//                     </div>
//                   </div>

//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
