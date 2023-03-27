import React from "react";

const [origin, setOrigin] = useState("");
const [destination, setDestination] = useState("");

export default function navigationSteps({ route }) {
  const steps = route.params.steps;
  console.log(steps);

  return (
    <>
      <input id="origin" value={origin} />
      <input id="destination" value={destination} />

      <button onClick={() => {}}>Find Directions</button>
    </>
  );
}
