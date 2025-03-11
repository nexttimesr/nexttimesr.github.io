import "./ChampionsList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import pinyin from "pinyin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
  },
});

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

const ChampionsList = () => {
  const [language, setLanguage] = useState("en_US");
  const [search, setSearch] = useState("");
  const [champions, setChampions] = useState([]);
  const [sortColumn, setSortColumn] = useState("Champion");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    document.title = "Aram Champion Randomizer";

    fetch(`https://ddragon.leagueoflegends.com/cdn/15.5.1/data/${language}/champion.json`)
      .then((res) => res.json())
      .then((data) => {
        const champs = Object.values(data.data).map((champ) => ({
          id: champ.id,
          title: champ.title,
          name: champ.name,
          namePinyin: pinyin(champ.name, { style: pinyin.STYLE_NORMAL }).join(""),
          titlePinyin: pinyin(champ.title, { style: pinyin.STYLE_NORMAL }).join(""),
          icon: `https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${champ.image.full}`,
          tags: champ.tags,
        }));
        setChampions(champs);
      });
  }, [language]);

  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(search.toLowerCase()) ||
    champ.title.toLowerCase().includes(search.toLowerCase()) ||
    champ.namePinyin.toLowerCase().includes(search.toLowerCase()) ||
    champ.titlePinyin.toLowerCase().includes(search.toLowerCase()))

  const sortChampions = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedChampions = [...filteredChampions].sort((a, b) => {
    if (sortColumn === "Champion") {
      const nameA = a.namePinyin || a.name;
      const nameB = b.namePinyin || b.name;
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    } else {
      const aHasCategory = a.tags.includes(sortColumn);
      const bHasCategory = b.tags.includes(sortColumn);
      if (aHasCategory === bHasCategory) return 0;
      return (aHasCategory ? -1 : 1) * (sortOrder === "asc" ? 1 : -1);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="header">
          <h1 className="title">Champions List</h1>
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <div className="back-link-container">
            <Link to="/" className="back-link">Back</Link>
          </div>
          <input
            type="text"
            placeholder="Search champions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>

        <table className="champion-table">
          <thead>
            <tr>
              <th onClick={() => sortChampions("Champion")} className="sortable">
                Champion {sortColumn === "Champion" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
              {CATEGORIES.map((category) => (
                <th key={category} onClick={() => sortChampions(category)} className="sortable">
                  {category} {sortColumn === category ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedChampions.map((champ) => (
              <tr key={champ.id}>
                <td>
                  <img src={champ.icon} alt={champ.name} className="champion-icon" /> {champ.name}
                </td>
                {CATEGORIES.map((category) => (
                  <td key={category}>
                    {champ.tags.includes(category) ? <CheckCircleIcon style={{ color: "white" }} /> : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ThemeProvider>
  );
};

export default ChampionsList;
