const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voiceSelect");
const textInput = document.getElementById("text");
const speakBtn = document.getElementById("speakBtn");

function populateVoices() {
  const voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const selectedName = voiceSelect.selectedOptions[0].getAttribute("data-name");
  const voice = synth.getVoices().find((v) => v.name === selectedName);
  if (voice) {
    utterance.voice = voice;
  }
  synth.speak(utterance);
});
