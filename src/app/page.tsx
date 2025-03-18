"use client";
import React, { useState } from 'react';

export default function Home() {
  const [potencia, setPotencia] = useState('');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [dias, setDias] = useState('');
  const [precoKwh, setPrecoKwh] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [custoTotal, setCustoTotal] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [tempoUnidade, setTempoUnidade] = useState('horas'); // 'horas' ou 'minutos'

  const calcularGasto = () => {
    const potenciaNum = parseFloat(potencia);
    const horasNum = parseFloat(horas);
    const minNum = parseFloat(minutos);
    const diasNum = parseFloat(dias);
    const precoKwhNum = parseFloat(precoKwh);

    if (isNaN(potenciaNum) || isNaN(horasNum) || isNaN(minNum) || isNaN(diasNum) || isNaN(precoKwhNum)) {
      setErro('Por favor, insira números válidos em todos os campos.');
      return;
    }

    setErro(null);

    let tempoTotalHoras = 0;
    if (tempoUnidade === 'horas') {
      tempoTotalHoras = horasNum;
    } else {
      tempoTotalHoras = minNum / 60;
    }

    const consumo = (potenciaNum * tempoTotalHoras * diasNum) / 1000;
    const custo = consumo * precoKwhNum;
    setResultado(parseFloat(consumo.toFixed(2)));
    setCustoTotal(custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Cálculo de Gasto de Energia</h2>
        <div className="space-y-4">
          {erro && <p className="text-red-500">{erro}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Potência (Watts):</label>
            <input
              type="number"
              value={potencia}
              onChange={(e) => setPotencia(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">Tempo de Uso:</label>
            <input
              type="number"
              value={tempoUnidade === 'horas' ? horas : minutos}
              onChange={(e) => {
                if (tempoUnidade === 'horas') {
                  setHoras(e.target.value);
                } else {
                  setMinutos(e.target.value);
                }
              }}
              className="mt-1 p-2 w-1/2 border rounded-md"
            />
            <select
              value={tempoUnidade}
              onChange={(e) => setTempoUnidade(e.target.value)}
              className="mt-1 p-2 w-1/2 border rounded-md ml-2"
            >
              <option value="horas">Horas</option>
              <option value="minutos">Minutos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dias de Uso no Mês:</label>
            <input
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço do kWh (R$):</label>
            <input
              type="text"
              value={precoKwh}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                const parts = value.split('.');
                if (parts.length > 2) {
                  return;
                }
                setPrecoKwh(value);
              }}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            onClick={calcularGasto}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Calcular
          </button>
          {resultado !== null && (
            <div className="mt-4 text-center">
              <p className="font-semibold">Gasto de Energia Mensal:</p>
              <p>{resultado} kWh</p>
              <p className="font-semibold">Custo Total Mensal:</p>
              <p>{custoTotal}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}