import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, MenuItem, Select } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import "./Aram.css";

const LANGUAGES = [
  { code: "en_US", label: "English" },
  { code: "zh_CN", label: "Chinese" },
  { code: "cs_CZ", label: "Czech" },
  { code: "el_GR", label: "Greek" },
  { code: "pl_PL", label: "Polish" },
  { code: "ro_RO", label: "Romanian" },
  { code: "hu_HU", label: "Hungarian" },
  { code: "de_DE", label: "German" },
  { code: "es_ES", label: "Spanish (Spain)" },
  { code: "it_IT", label: "Italian" },
  { code: "fr_FR", label: "French" },
  { code: "ja_JP", label: "Japanese" },
  { code: "ko_KR", label: "Korean" },
  { code: "es_MX", label: "Spanish (Mexico)" },
  { code: "pt_BR", label: "Portuguese (Brazil)" },
  { code: "ru_RU", label: "Russian" },
  { code: "tr_TR", label: "Turkish" },
  { code: "th_TH", label: "Thai" },
  { code: "vi_VN", label: "Vietnamese" },
  { code: "id_ID", label: "Indonesian" },
  { code: "zh_TW", label: "Chinese (Taiwan)" },
];
const CATEGORIES = ["Assassin", "Marksman", "Fighter", "Support", "Tank", "Mage"];

const Aram = () => {
  const [language, setLanguage] = useState("en_US");
  const [champions, setChampions] = useState([]);
  const [teamSize, setTeamSize] = useState("15");
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES);
  const [allowDuplicates, setAllowDuplicates] = useState(false);

  useEffect(() => {
    fetch(`https://ddragon.leagueoflegends.com/cdn/15.5.1/data/${language}/champion.json`)
      .then((res) => res.json())
      .then((data) => {
        const champs = Object.values(data.data).map((champ) => ({
          id: champ.id,
          name: champ.name,
          icon: `https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${champ.image.full}`,
          tags: champ.tags,
        }));
  
        // Preserve team selections but update their names/icons
        const updatedTeam1 = team1.map((champ) => champs.find((c) => c.id === champ.id) || champ);
        const updatedTeam2 = team2.map((champ) => champs.find((c) => c.id === champ.id) || champ);
  
        setChampions(champs);
        setTeam1(updatedTeam1);
        setTeam2(updatedTeam2);
      });
  }, [language]); // Now it only updates names when the language changes

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getRandomChampions = (size) => {
    let availableChamps = selectedCategories.length === CATEGORIES.length || selectedCategories.length === 0
      ? champions
      : champions.filter((c) => c.tags.some((tag) => selectedCategories.includes(tag)));
    
    availableChamps = [...availableChamps];
    size = Math.min(size, Math.floor(availableChamps.length / 2));
    
    const randomChamps = [];
    for (let i = 0; i < size; i++) {
      const index = Math.floor(Math.random() * availableChamps.length);
      randomChamps.push(availableChamps.splice(index, 1)[0]);
    }
    return randomChamps;
  };

  const randomizeTeams = () => {
    const size = Math.min(parseInt(teamSize) || 1, Math.ceil(champions.length / 2));
    if (allowDuplicates) {
      setTeam1(getRandomChampions(size));
      setTeam2(getRandomChampions(size));
    } else {
      const totalChamps = getRandomChampions(size * 2);
      setTeam1(totalChamps.slice(0, Math.ceil(totalChamps.length / 2)));
      setTeam2(totalChamps.slice(Math.ceil(totalChamps.length / 2)));
    }
  };

  return (
    <div className="container">
      <div className="header">
  <h1 className="title">Aram Champion Randomizer</h1>
  <div className="language-container">
    <Button className="language-button" onClick={() => setLanguage("en_US")}>
  English
</Button>
<Button className="language-button" onClick={() => setLanguage("zh_CN")}>
  中文
</Button>
    <Select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="language-selector"
  displayEmpty
  variant="outlined"
  sx={{
    width: 120,  // Adjust width
    height: 32,  // Adjust height
    fontSize: "0.8rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.4)",
    },
  }}
>
  {LANGUAGES.map((lang) => (
    <MenuItem key={lang.code} value={lang.code}>
      {lang.label}
    </MenuItem>
  ))}
</Select>

  </div>
</div>
      <div className="category-buttons">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            className={`category-button ${selectedCategories.includes(category) ? "selected" : ""}`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="controls">
        <input
          type="number"
          className="team-size-input"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Enter team size"
          min="1"
        />
        <Button className="randomize-button" onClick={randomizeTeams} variant="contained" color="primary">
          <CasinoIcon />
        </Button>
        <Button className={`toggle-button ${allowDuplicates ? "enabled" : "disabled"}`} onClick={() => setAllowDuplicates(!allowDuplicates)}>
          {allowDuplicates ? "Allow Duplicates" : "No Duplicates"}
        </Button>
      </div>
      <div className="teams-wrapper">
  <div className="team-container">
    {team1.map((champion) => (
      <div className="champion-card">
        <img src={champion.icon} alt={champion.name} className="champion-icon" />
        <span className="champion-name">{champion.name}</span>
      </div>
    ))}
  </div>

  <div className="team-container">
    {team2.map((champion) => (
      <div className="champion-card">
        <img src={champion.icon} alt={champion.name} className="champion-icon" />
        <span className="champion-name">{champion.name}</span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Aram;
