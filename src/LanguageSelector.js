import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, MenuItem, Select } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import "./LanguageSelector.css";

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

const LanguageSelector = ({ language, setLanguage }) => {

  return (
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
  );
};

export default LanguageSelector;
