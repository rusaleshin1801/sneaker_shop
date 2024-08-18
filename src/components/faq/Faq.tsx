import React, { useState } from "react";
import styles from "./faq.module.css";
import Plus from "../../ui/icon/plus.svg";

interface Question {
  question: string;
  answer: string;
}

const Faq: React.FC = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const questions: Question[] = [
    {
      question: "How can I track the status of my order?",
      answer:
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the 'My Orders' section to track your delivery status.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and other secure payment gateways. Please check our payment page for the full list of accepted methods.",
    },
    {
      question: "How can I return or exchange an item?",
      answer:
        "To return or exchange an item, please visit our returns page and follow the instructions provided. Make sure to have your order number and details about the item ready for processing.",
    },
  ];

  const handleClick = (index: number): void => {
    setActiveIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <article className={styles.faqContainer} id="faq">
      <section className={styles.faqContent}>
        <h2 className={styles.faqTitle}>FAQ</h2>

        {questions.map((item, index) => {
          const isOpen = activeIndexes.includes(index);
          const questionId = `question-${index}`;
          const answerId = `answer-${index}`;

          return (
            <section
              className={styles.accordion}
              key={index}
              role="region"
              aria-labelledby={questionId}
            >
              <button
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className={styles.faqHead}
                onClick={() => handleClick(index)}
              >
                <p className={styles.faqHeadQuestions}>{item.question}</p>
                <img
                  src={Plus}
                  alt={isOpen ? "Collapse answer" : "Expand answer"}
                  width={25}
                  height={25}
                  className={`${styles.faqIcon} ${
                    isOpen ? styles.faqIconOpen : ""
                  }`}
                />
              </button>
              <p
                id={answerId}
                className={`${styles.faqHeadAnswer} ${
                  isOpen ? styles.faqAnswerOpen : ""
                }`}
              >
                {item.answer}
              </p>
            </section>
          );
        })}
      </section>
    </article>
  );
};

export default Faq;
