import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [myFeedback, setMyFeedback] = useState("Dissatisfied (0%)");
  const [friendFeedback, setFriendFeedback] = useState("Dissatisfied (0%)");
  const [bill, setBill] = useState(0);
  const myTip =
    myFeedback === "Absolutely Amazing! (20%)"
      ? Number((0.2 * bill).toFixed(2))
      : myFeedback === "It was good (10%)"
      ? Number((0.1 * bill).toFixed(2))
      : 0;
  const friendTip =
    friendFeedback === "Absolutely Amazing! (20%)"
      ? Number((0.2 * bill).toFixed(2))
      : friendFeedback === "It was good (10%)"
      ? Number((0.1 * bill).toFixed(2))
      : 0;

  const tip = Number(((myTip + friendTip) / 2).toFixed(2));

  function reset(e) {
    e.preventDefault();
    setMyFeedback("Dissatisfied (0%");
    setFriendFeedback("Dissatisfied (0%");
    setBill(0);
  }

  return (
    <div>
      <div className="flex">
        <p>How much was the bill?</p>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </div>
      <Feedback feedback={myFeedback} onFeedback={setMyFeedback}>
        <p>How did you like the service?</p>
      </Feedback>
      <Feedback feedback={friendFeedback} onFeedback={setFriendFeedback}>
        <p>How did your friend like the service?</p>
      </Feedback>
      {bill > 0 ? (
        <>
          <h2>{`You pay $${bill + tip} ($${bill} + $${tip} tip)`}</h2>
          <button onClick={(e) => reset(e)}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function Feedback({ feedback, onFeedback, children }) {
  const feedbackList = [
    "Dissatisfied (0%)",
    "It was good (10%)",
    "Absolutely Amazing! (20%)",
  ];
  return (
    <div className="flex">
      <p>{children}</p>
      <select value={feedback} onChange={(e) => onFeedback(e.target.value)}>
        {feedbackList.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}
