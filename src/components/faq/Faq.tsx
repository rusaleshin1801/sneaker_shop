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
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the 'My Orders' section to track your delivery status.",
    },
    {
      question: "How can I return or exchange an item?",
      answer:
        "After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the 'My Orders' section to track your delivery status.",
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

        {questions.map((item, index) => (
          <section
            className={styles.accordion}
            key={index}
            onClick={() => handleClick(index)}
          >
            <div className={styles.faqHead}>
              <p className={styles.faqHeadQuestions}>{item.question}</p>
              <img
                src={Plus}
                alt={
                  activeIndexes.includes(index)
                    ? "Collapse answer"
                    : "Expand answer"
                }
                width={25}
                height={25}
                className={`${styles.faqIcon} ${
                  activeIndexes.includes(index) ? styles.faqIconOpen : ""
                }`}
              />
            </div>
            <p
              className={`${styles.faqHeadAnswer} ${
                activeIndexes.includes(index) ? styles.faqAnswerOpen : ""
              }`}
            >
              {item.answer}
            </p>
          </section>
        ))}
      </section>
    </article>
  );
};

export default Faq;
