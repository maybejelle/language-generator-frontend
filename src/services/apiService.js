export const PROMPTS = {
  generate:
    "Generate a new text, based on the following parameters. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT. THE ENTIRE RESPONSE MUST BE IN THE LANGUAGE PROVIDED. IF POSSIBLE YOU SHOULD FORMAT THE TEXT WITH TITLES, PARAHRAPHS, ETC.",
  regenerate:
    "Tweak the main text slightly, based on the following parameters. Adjust or generate words, grammar or language wherever neccesary to match the parameters as best as possible. ONLY OUTPUT THE TEXT, NO OTHER CONTEXT. THE ENTIRE RESPONSE MUST BE IN THE LANGUAGE PROVIDED. IF POSSIBLE YOU SHOULD FORMAT THE TEXT WITH TITLES, PARAHRAPHS, ETC.",
  evaluate:
    "Evaluate the main Text. Give suggestions on how to improve it, but keep it compact and to the point. PROVIDE A CEFR LEVEL BEFORE THE FEEDBACK, THEN ONLY OUTPUT THE FEEDBACK, NO OTHER CONTEXT, EACH FEEDBACK ON A NEW LINE. THE ENTIRE RESPONSE MUST BE IN THE LANGUAGE PROVIDED.",
};

export const fetchDataFromApi = async (url, body) => {
  try {
    console.log(JSON.stringify(url));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error calling proxy server:", error);
    throw new Error("API request failed");
  }
};
