import React, { useState, useEffect } from "react";
import {
  Container,
  AnimationContainerLeft,
  AnimationContainerRight,
} from "./styles";
import { useForm } from "react-hook-form";
import api from "../../services/api";

interface TranslationFormat {
  translation: string;
}

interface NaturalNumbersFormat {
  number: Number;
}

const Translator: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();


  const [counter, setCounter] = useState(Number);
  const [counterTranslation, setCounterTranslation] = useState("");
  const [naturalNumbers, setNaturalNumbers] = useState<NaturalNumbersFormat[]>(
    []
  );
  const [translations, setTranslations] = useState("");
  const [translationsHistory, setTranslationsHistory] = useState<
    TranslationFormat[]
  >([]);

  const onSubmit = async (data: any) => {
    const numberWithCommas = data.number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setNaturalNumbers([{ number: numberWithCommas }, ...naturalNumbers]);

    await api.get(`/translate/${data.number}`).then((response) => {
      console.log('@@@@',response);
      setTranslations(response.data);
      setTranslationsHistory([
        {
          translation: response.data,
        },
        ...translationsHistory,
      ]);
    });
  };

  useEffect(() => {
    api.get(`/translate/${counter}`).then((response) => {
      setCounterTranslation(response.data);
    });
  }, [counter]);

  useEffect(() => {
    setCounter(translationsHistory.length);
  }, [translationsHistory]);

  return (
    <Container>
      <header>
        <h1>Números em Inglês</h1>
      </header>
      <div id="content">
        <AnimationContainerLeft>
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="number">
                Digite um número natural:
              </label>
              <input
                type="number"
                name="number"
                ref={register({ required: true })}
              />
              {errors.number ? (
                <span className="error-message">
                  Digite apenas números naturais. Tente de novo!
                </span>
              ) : (
                <span className="error-message-transparent">No errors</span>
              )}

              <button type="submit">Receber Tradução</button>
            </form>

            <p>Tradução Atual:</p>
            <div id="current-translation">{translations}</div>
            <h3>{`Existem ${counter} ${
              translationsHistory.length !== 1 ? "números" : "número"
            } traduzidos.`}</h3>
          </section>
        </AnimationContainerLeft>
        <AnimationContainerRight>
          <section>
            <h2>Histórico de Traduções</h2>
            <div id="translation-history">
              <ul>
                {translationsHistory.length === 0 ? (
                  <li></li>
                ) : (
                  translationsHistory.map((translation, index) => (
                    <li
                      className={
                        Number(counter) === Number(naturalNumbers[index].number)
                          ? "equalToCounter"
                          : "regularLI"
                      }
                      key={index}
                    >
                      {naturalNumbers[index].number} = {translation.translation}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </section>
        </AnimationContainerRight>
      </div>
      <footer>
        <div></div>
        <div></div>
        <div></div>
      </footer>
    </Container>
  );
};

export default Translator;
