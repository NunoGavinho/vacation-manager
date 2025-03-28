import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #E64A19;      /* Laranja escuro */
    --secondary: #FF7043;    /* Laranja claro */
    --accent: #FFFFFF;       /* Branco para contraste */
    --background: #1b1b1b;   /* Fundo escuro, neutro */
    --highlight: #4A00E0;    /* Roxo com força */
    --font-main: 'Inter', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-main);
  }

  body {
    background: var(--background);
    color: var(--accent);
    line-height: 1.6;
    min-height: 100vh;
  }

  button {
    background-color: var(--primary);
    color: var(--accent);
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: var(--secondary);
  }

  input, select, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
  }

  h1, h2, h3 {
    font-weight: 700;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyles
