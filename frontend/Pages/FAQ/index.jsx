import React from 'react';
import "./index.css";

const FAQData = [
    {
      question: "Account Creation",
      answer: "To participate in the competition, a person must create an account by logging in through Instagram, Twitter, Facebook, or using their email."
    },
    {
      question: "Profile and Contest Participation",
      answer: "After creating an account, a user can upload a picture to their profile and pick any uploaded picture to participate in available contests."
    },
    {
      question: "Voting",
      answer: "Daily, a person will receive 10 free votes, called 'KISSes', which they can use to upvote any participant in the contest."
    },
    {
      question: "Tournament Cycles",
      answer: "There are daily, weekly, and monthly tournaments where prizes are brought by sponsors and later on by the community treasury."
    },
    {
      question: "Eligibility",
      answer: "There are no limits on eligible countries or regions."
    },
    {
      question: "Content Restrictions",
      answer: "Nudity or pornography is not allowed."
    },
    {
      question: "Suspicious Activity",
      answer: "Suspicious activity, such as using bots or committing fraud, will result in disqualification."
    },
    {
      question: "Judging Criteria",
      answer: "The community is the judge and decides to whom to give the most votes according to their choice. Contestants are encouraged to be as original and creative as possible in their photos."
    },
    {
      question: "Winner Announcement",
      answer: "The winner will be announced at the end of each tournament cycle and will receive a personal message if they make it to the top. All past winners and prizes they won can be viewed in the 'KISS BOX' section."
    },
    {
      question: "Conditions of Entry",
      answer: "By participating in the contest, a user agrees to these rules and allows the KISMI.APP administration to send promotional materials, use their profiles and photos as advertisements for KISMI.APP and its social network pages."
    }
  ];


const FAQ = () => {
  return (
    <div className="FAQ">
      <h1>Frequently Asked Questions</h1>
      {FAQData.map((faq, index) => (
        <div key={index} className="faq-item">
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
