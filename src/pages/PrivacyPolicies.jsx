import PolicyBgLogo from "../assets/CB_Logo/YT circle.png";

const policies = [
  "We may collect personal information from students, parents, guardians, or website visitors, including names, phone numbers, email addresses, birthdates, addresses, emergency contact details, and other information needed for enrollment or communication.",
  "We collect personal information to manage class enrollment, maintain student records, communicate updates, process billing, handle emergencies, and provide a better dance learning experience.",
  "We collect personal information only when it is voluntarily provided through forms, inquiries, registrations, or other direct interactions. By submitting information, you consent to its collection and use under this policy.",
  "Collected data may be stored securely on password-protected systems, cloud storage platforms, communication tools, or other authorized business systems used to operate our services.",
  "We use personal information for class scheduling, student management, communication, invoicing, service updates, event coordination, and emergency notifications where necessary.",
  "We do not sell personal information. We may share information only when required for payment processing, communication tools, business operations, legal compliance, or emergency situations.",
  "We use reasonable security measures such as controlled access, secure systems, and trusted service providers to help protect personal information from unauthorized access, misuse, or disclosure.",
  "We retain personal information only as long as needed for operational, legal, administrative, or safety-related purposes. When no longer needed, we aim to remove or securely dispose of it.",
  "Individuals may request access to their personal information and may ask us to correct, update, or delete data where legally permitted and reasonably applicable.",
  "Our website may use cookies or similar technologies to improve performance, remember preferences, and understand visitor activity. Users can manage cookies through their browser settings.",
  "If you subscribe to updates or promotional communication, we may contact you by email or other methods. You may opt out of marketing communication at any time.",
  "Because our services may involve children, personal information relating to minors is expected to be provided by or with the consent of a parent or legal guardian.",
  "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and continued use of our services after updates means acceptance of the revised policy.",
  "For privacy-related questions, requests, or concerns, please contact Chennai Beats Dance Academy through the contact details provided on our website.",
];

export default function PrivacyPolicies() {
  return (
    <section
      className="privacy-page"
      style={{ "--privacy-bg-image": `url(${PolicyBgLogo})` }}
    >
      <div className="privacy-container">
        <div className="privacy-header">
          <p className="privacy-tag">Chennai Beats</p>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-intro">
            Please read the following privacy policy points carefully.
          </p>
        </div>

        <div className="privacy-content">
          <div className="privacy-card">
            <ol className="privacy-policy-list">
              {policies.map((policy, index) => (
                <li className="privacy-policy-item" key={index}>
                  <span className="privacy-policy-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="privacy-policy-text">{policy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}