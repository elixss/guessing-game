window.onload = () => {
  var arrayOfWords = [];

  const reqUrl =
    "urlToYourAPI"; // add the url of your api here
  fetch(reqUrl, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
      arrayOfWords.push(value);
    }
  });

  const words = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
  const result = words["word"];

  const hintButton = document.getElementById("hintButton");
  hintButton.addEventListener("click", () => {
    document.getElementById("hint").innerHTML = `Tip: ${words["hint"]}`;
  });

  const replaceAt = (string, index, replacement) => {
    if (index >= string.length) {
      return string.valueOf();
    }
    return (
      string.substring(0, index) + replacement + string.substring(index + 1)
    );
  };

  let generatedWord = "";
  for (let i = 0; i < result.length; i++) {
    if ((Math.floor(Math.random() * 2) + 1) % 2 == 0) {
      generatedWord += result[i];
    } else {
      if (result[i] === " ") {
        generatedWord += " ";
      } else {
        generatedWord += "_";
      }
    }
  }
  document.getElementById("correctChars").innerHTML = generatedWord;

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const checkWord = async () => {
    var input = document.getElementById("inputField").value;
    for (let i = 0; i <= generatedWord.length; i++) {
      if (result.charAt(i) === input) {
        generatedWord = replaceAt(generatedWord, i, input);
      }
      if (!generatedWord.includes("_")) {
        generatedWord = replaceAt(generatedWord, i, input);
        document.getElementById("correctChars").innerHTML = generatedWord;
        await sleep(650);
        window.location.reload();
      }
    }
    document.getElementById("correctChars").innerHTML = generatedWord;
    document.getElementById("inputField").value = "";
  };
  
  document.getElementById("ApplyButton").onclick = () => {
    checkWord();
    document.getElementById("inputField").value = "";
  };
};
