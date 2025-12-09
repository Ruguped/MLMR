import React, { useState } from "react";

export function Faq() {
  // 1. We track WHICH item is open by its index number.
  // Default is 0 (first item), use -1 if you want all closed initially.
  const [openIndex, setOpenIndex] = useState(0);

  // 2. This function handles the logic.
  const toggle = (index) => {
    // If you click the one that is already open, close it (-1).
    // Otherwise, open the new one.
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq_section">
      <div className="container">
        <h2>Frequently Asked Questions</h2>
        
        {/* We keep the ID 'faq' to keep the designer happy, though React doesn't need it */}
        <div className="accordion" id="faq">

          {/* --- ITEM 1 --- */}
          {/* LOGIC: Is openIndex 0? If yes, add "open" class. If no, just "item" */}
          <div className={`item ${openIndex === 0 ? "open" : ""}`}>
            <div
              className="summary"
              onClick={() => toggle(0)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === 0}
            >
              <div className="title">How fast will I receive INR?</div>
              <div className="icon">
                {/* Keeping your SVG/FontAwesome structure exactly as provided */}
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="panel">
              <p>
                UX design stands for User Experience design. It is the process of designing digital or physical products
                that are easy to use, intuitive, and enjoyable for the user.
                Typical INR payout times depend on the payment rail and bank checks.
              </p>
            </div>
          </div>

          {/* --- ITEM 2 --- */}
          <div className={`item ${openIndex === 1 ? "open" : ""}`}>
            <div
              className="summary"
              onClick={() => toggle(1)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === 1}
            >
              <div className="title">Which network is supported?</div>
              <div className="icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="panel">
              <p>We support multiple networks. Replace this paragraph with your supported net list and details.</p>
            </div>
          </div>

          {/* --- ITEM 3 --- */}
          <div className={`item ${openIndex === 2 ? "open" : ""}`}>
            <div
              className="summary"
              onClick={() => toggle(2)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === 2}
            >
              <div className="title">Minimum amount?</div>
              <div className="icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="panel">
              <p>Minimum amount details go here.</p>
            </div>
          </div>

          {/* --- ITEM 4 --- */}
          <div className={`item ${openIndex === 3 ? "open" : ""}`}>
            <div
              className="summary"
              onClick={() => toggle(3)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === 3}
            >
              <div className="title">Is my information safe?</div>
              <div className="icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="panel">
              <p>Yes. Add your data protection and security policy summary here so users feel confident.</p>
            </div>
          </div>

          {/* --- ITEM 5 --- */}
          <div className={`item ${openIndex === 4 ? "open" : ""}`}>
            <div
              className="summary"
              onClick={() => toggle(4)}
              tabIndex={0}
              role="button"
              aria-expanded={openIndex === 4}
            >
              <div className="title">Do you offer special rates for high volume?</div>
              <div className="icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
            <div className="panel">
              <p>Yes — describe your volume discounts and contact channel here.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}