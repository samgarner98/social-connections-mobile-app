import transitData from "./transitData.json";
import walkingData from "./walkingData.json";

const getStructuredStepsFromData = (data) => {
  const steps = data.routes[0].legs[0].steps;

  let structuredSteps = [];
  // For each parent step
  for (let i = 0; i < steps.length; i++) {
    // initialise a structuredStep object with an id
    const structuredStep = { id: i, parentHtmlStep: "" };
    let childHtmlSteps = [];
    const parentStep = steps[i];

    // Check if html_instructions exist on parent step
    if (parentStep.html_instructions) {
      // Set parentHtmlStep in our structuredStep object
      structuredStep.parentHtmlStep = parentStep.html_instructions;

      const childSteps = parentStep.steps;
      // Check if child steps exist within current parentStep
      if (childSteps) {
        // For each child step, push its html_instructions to the array of childHtmlSteps (held within our structuredStep object)
        for (let i = 0; i < childSteps.length; i++) {
          const childStep = childSteps[i];
          if (childStep.html_instructions) {
            childHtmlSteps.push(childStep.html_instructions);
          }
        }
      }
      // Add newly formed structuredStep object into array
      structuredSteps.push(structuredStep);
      // If childHtmlSteps exist, then add them to our structured step object
      if (childHtmlSteps.length) {
        structuredSteps[i].childHtmlSteps = childHtmlSteps;
      }
    }
  }
  return structuredSteps;
};

console.log("----------------------");
console.log("Walking data output...");
console.log("----------------------");
console.log(getStructuredStepsFromData(walkingData));
console.log("----------------------");
console.log("Transit data output...");
console.log("----------------------");
console.log(getStructuredStepsFromData(transitData));
