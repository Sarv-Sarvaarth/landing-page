document.addEventListener("DOMContentLoaded", function () {
  // Extract the raised and goal amounts from the HTML
  const raisedText = document.getElementById("raised-amount").textContent;
  const goalText = document.getElementById("goal-amount").textContent;

  // Extract numerical values from the text
  const raisedAmount = parseInt(raisedText.replace(/\D/g, ""));
  const goalAmount = parseInt(goalText.replace(/\D/g, ""));

  // Calculate the progress percentage
  const progressPercentage = (raisedAmount / goalAmount) * 100;

  console.log("HELLO", progressPercentage);

  // Set the progress bar width
  document.getElementById("progress-bar").style.width = progressPercentage + "%";
});
