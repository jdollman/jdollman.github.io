import React, { useState } from 'react';

// We'll create our own Card component instead of importing one
const Card = ({ children, className = "" }) => (
  <div className={`border rounded-lg shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

// Rest of the components remain the same, but we'll use our custom Card component
const RadioQuestion = ({ 
  question, 
  options, 
  name, 
  className = "" 
}) => {
  const [selected, setSelected] = useState("");
  
  return (
    <Card className={`mb-6 ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{question}</h3>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-1"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
};


// History Questions
export const IsraelFoundingQuestion = () => (
  <RadioQuestion
    question="When was the State of Israel officially proclaimed?"
    options={["1945", "1948", "1950", "1967"]}
    name="israel_founding"
  />
);

export const SixDayWarQuestion = () => (
  <RadioQuestion
    question="The 1967 Six-Day War had a significant impact on the region. Which of the following territories was NOT occupied by Israel as a result of the war?"
    options={[
      "Gaza Strip",
      "West Bank",
      "Golan Heights",
      "Sinai Peninsula",
      "Southern Lebanon"
    ]}
    name="territories"
  />
);

export const IntifadaQuestion = () => (
  <RadioQuestion
    question="The term 'Intifada' refers to:"
    options={[
      "A peace treaty",
      "A political alliance",
      "A Palestinian uprising",
      "An Israeli settlement"
    ]}
    name="intifada"
  />
);

export const HamasQuestion = () => (
  <RadioQuestion
    question="Which organization has been considered a terrorist group by Israel and the United States and also won the Palestinian legislative elections in 2006?"
    options={[
      "Fatah",
      "Hezbollah",
      "Hamas",
      "Islamic Jihad"
    ]}
    name="hamas"
  />
);

export const CampDavidQuestion = () => (
  <RadioQuestion
    question="The Camp David Accords were signed by Egypt and Israel in 1978. Who were the leaders of Egypt and Israel at the time?"
    options={[
      "Anwar Sadat and Menachem Begin",
      "Hosni Mubarak and Yitzhak Rabin",
      "Gamal Abdel Nasser and David Ben-Gurion",
      "Mohammed Morsi and Benjamin Netanyahu"
    ]}
    name="camp_david"
  />
);

// More Recent Questions
export const PopulationQuestion = () => (
  <RadioQuestion
    question="Which of the following statements is accurate?"
    options={[
      "The largest population group in Israel are white Europeans who came to the Middle East as colonizers",
      "The largest population group in Israel are Middle Eastern Jews from countries like Iraq and Syria",
      "The largest population group in Israel are Arab Muslims whose ancestors have lived in the region for thousands of years"
    ]}
    name="population"
  />
);

// True/False Questions
const TrueFalseQuestion = ({ question, name }) => (
  <RadioQuestion
    question={question}
    options={["True", "False"]}
    name={name}
    className="true-false"
  />
);

export const BombingsQuestion = () => (
  <TrueFalseQuestion
    question="During the 1990s, members of the Palestinian resistance movement committed several suicide bombings of buses and resturants."
    name="bombings"
  />
);

export const SabotageQuestion = () => (
  <TrueFalseQuestion
    question="During the 2010s, Israel sabotaged efforts to create a Palestinian state by promoting Palestinian groups dedicated to violence while undermining those dedicated to peace."
    name="sabotage"
  />
);

export const AssassinationQuestion = () => (
  <TrueFalseQuestion
    question="An Israeli prime minister was once assassinated by a Muslim extremist."
    name="assassination"
  />
);

export const RocketsQuestion = () => (
  <TrueFalseQuestion
    question="Most rockets fired into Israel from Gaza are aimed at Israeli military targets."
    name="rockets"
  />
);

// Current Situation Questions
export const CasualtiesQuestion = () => (
  <RadioQuestion
    question="According to the United Nations' estimates of how many Palestinians have died since the start of the current war, how many total deaths has Palestine suffered?"
    options={["3,500", "15,000", "35,000", "150,000"]}
    name="casualties"
  />
);

export const BlockadeQuestion = () => (
  <RadioQuestion
    question="Which option below best completes the following statement: Israel's blockade of the Gaza Strip _____."
    options={[
      "is targeted so that only military items are prevented from entering",
      "prevents items that easily could be made into military items from entering",
      "in some cases prevents even basic foodstuffs from entering"
    ]}
    name="blockade"
  />
);

export const NetanyahuStrategyQuestion = () => (
  <RadioQuestion
    question="Which is the most accurate description of current Israeli Prime Minister Benjamin Netanyahu's Hamas strategy over the course of his 16 years in power?"
    options={[
      "Netanyahu has worked to strengthen peaceful Palestinian political groups to sideline Hamas.",
      "Netanyahu has pursued hardline offensive policies to stamp out Hamas.",
      "Netanyahu often thwarted Palestinian peace initiatives in order to strengthen Hamas."
    ]}
    name="netanyahu_strategy"
  />
);

export const AggressorQuestion = () => (
  <RadioQuestion
    question="Which side has most often been the aggressor in the Israeli-Palestinian conflict?"
    options={[
      "The Israelis have always been the aggressors",
      "The Israelis have usually been the aggressors",
      "The Israelis have have been somewhat more likely to be the aggressors",
      "The Israelis and the Palestinians have been equally likely to be the aggressors",
      "The Palestinians have have been somewhat more likely to be the aggressors",
      "The Palestinians have usually been the aggressors",
      "The Palestinians have always been the aggressors"
    ]}
    name="aggressor"
  />
);

// Main Survey Component that combines all questions
const Survey = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <IsraelFoundingQuestion />
      <SixDayWarQuestion />
      <IntifadaQuestion />
      <HamasQuestion />
      <CampDavidQuestion />
      <PopulationQuestion />
      <BombingsQuestion />
      <SabotageQuestion />
      <AssassinationQuestion />
      <RocketsQuestion />
      <CasualtiesQuestion />
      <BlockadeQuestion />
      <NetanyahuStrategyQuestion />
      <AggressorQuestion />
    </div>
  );
};

export default Survey;