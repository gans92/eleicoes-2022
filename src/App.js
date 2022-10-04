import axios from "axios";
import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [votes, setVotes] = useState({})

  useEffect(() => {
    axios
      .get(
        "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
      )
      .then((response) => {
        console.log(response.data.cand);
      });
  }, []);

  const fetchVotes = async () => {
    const response = await axios.get(
      "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
    );
    setVotes(response.data);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      fetchVotes();
    }, 10000);

    return () => clearInterval(interval);
   
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>votos</th>
            <th>porcentagem</th>
          </tr>
        </thead>
        <tbody>
          {votes.cand &&
            votes.cand.map((cand) => (
              <tr key={cand.seq}>
                <td>{cand.nm}</td>
                <td>{cand.vap}</td>
                <td>{cand.pvap}%</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h1>urnas apuradas: {votes.psi}%</h1>
    </div>
  );
}

export default App;
