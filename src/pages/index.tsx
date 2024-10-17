// pages/index.tsx
import Head from "next/head";
import { useState } from "react";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/WindowBox/WindowBox";
import InputBox from "@/components/Molecules/InputBox.tsx/InputBox";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { listaGeneri } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";
import SwitchBox from "@/components/Molecules/SwitchBox/SwitchBox";
import Toast from "@/components/Molecules/Toast/Toast";

const Home: React.FC = () => {
  const [protagonista, setProtagonista] = useState<string>("");
  const [antagonista, setAntagonista] = useState<string>("");
  const [genere, setGenere] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [pegi18, setPegi18] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    const prompt = `genera un racconto ${genere} con protagonista ${protagonista} e antagonista ${antagonista}`;

    console.log("Generated Prompt:", prompt);

    if (protagonista.trim() && antagonista.trim() && genere.trim()) {
      try {
        const response = await fetch("./pages/api/generate.ts", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Errore nel fetch");
        }

        const data = await response.json();
        setResponse(data.message);
      } catch (e) {
        console.error("il nostro errore:", e);
        setError(
          "Errore nella creazione del racconto: " + (e as Error).message
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleVoice = () => {
    if (!response) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "it-IT";
    setIsPlaying(true);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setIsPlaying(false);
    };
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      <Head>
        <title>Ai Story Teller</title>
        <meta name="description" content="AI based app to generate stories" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title="AI Story Teller" />
        <div className={style.content}>
          {error && (
            <Toast setAction={setError} title="Errore" message={error} />
          )}
          <WindowBox title="Story Params">
            <div className={style.container}>
              <InputBox
                label="Nome Protagonista:"
                value={protagonista}
                setValue={setProtagonista}
              />
              <InputBox
                label="Nome Antagonista:"
                value={antagonista}
                setValue={setAntagonista}
              />
            </div>
            <div className={style.container}>
              <SelectBox
                label="Genere:"
                list={listaGeneri}
                setValue={setGenere}
              />
              <SwitchBox
                label="Per adulti:"
                value={pegi18}
                setValue={setPegi18}
              />
              <Button
                label="Genera"
                onClick={handleGenerate}
                disabled={!protagonista || !antagonista || !genere}
              />
            </div>
            {loading && (
              <div className={style.loading}>
                <p>Loading...</p>
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <div className={style.btn}>
                  {isPlaying ? (
                    <Button label="Stop" onClick={handleStopVoice} />
                  ) : (
                    <Button label="Racconta" onClick={handleVoice} />
                  )}
                </div>
                {response}
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
};

export default Home;
