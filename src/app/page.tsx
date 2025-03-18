"use client";
import React, { useState, useEffect } from 'react';
import { FaBolt, FaClock, FaCalendarAlt, FaMoneyBillWave, FaSun, FaMoon } from 'react-icons/fa';

export default function Home() {
  // Ajuste os tipos para corresponder aos valores que você salva / armazena
  const [potencia, setPotencia] = useState<string>('');
  const [horas, setHoras] = useState<string>('');
  const [minutos, setMinutos] = useState<string>('');
  const [dias, setDias] = useState<string>('');
  const [precoKwh, setPrecoKwh] = useState<string>('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [custoTotal, setCustoTotal] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [tempoUnidade, setTempoUnidade] = useState<'horas' | 'minutos'>('horas');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Preferência do tema com base no localStorage e no sistema
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const calcularGasto = () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (
      !potencia ||
      !dias ||
      !precoKwh ||
      (tempoUnidade === 'horas' && !horas) ||
      (tempoUnidade === 'minutos' && !minutos)
    ) {
      setErro('Por favor, preencha todos os campos.');
      setResultado(null);
      setCustoTotal(null);
      return;
    }

    // Converte strings para números
    const potenciaNum = parseFloat(potencia.replace(',', '.'));
    const diasNum = parseFloat(dias.replace(',', '.'));
    const precoKwhNum = parseFloat(precoKwh.replace(',', '.'));

    // Validação adicional (caso sejam strings vazias ou algo que não é número)
    if (isNaN(potenciaNum) || isNaN(diasNum) || isNaN(precoKwhNum)) {
      setErro('Por favor, insira números válidos em todos os campos.');
      setResultado(null);
      setCustoTotal(null);
      return;
    }

    let tempoTotalHoras = 0;

    if (tempoUnidade === 'horas') {
      const horasNum = parseFloat(horas.replace(',', '.'));
      if (isNaN(horasNum)) {
        setErro('Por favor, insira números válidos em todos os campos.');
        setResultado(null);
        setCustoTotal(null);
        return;
      }
      tempoTotalHoras = horasNum;
    } else {
      const minutosNum = parseFloat(minutos.replace(',', '.'));
      if (isNaN(minutosNum)) {
        setErro('Por favor, insira números válidos em todos os campos.');
        setResultado(null);
        setCustoTotal(null);
        return;
      }
      tempoTotalHoras = minutosNum / 60;
    }

    // Se chegou até aqui, não há erro
    setErro(null);

    // Cálculo do consumo e custo
    const consumo = (potenciaNum * tempoTotalHoras * diasNum) / 1000; // em kWh
    const custo = consumo * precoKwhNum;

    // Armazena resultados
    setResultado(parseFloat(consumo.toFixed(2)));
    setCustoTotal(
      custo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    );
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div
        className={`bg-white p-8 rounded shadow-md w-full max-w-md ${
          darkMode ? 'dark:bg-gray-800' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center">
            Cálculo de Gasto de Energia
          </h2>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <FaSun className="text-yellow-500 text-xl" />
            ) : (
              <FaMoon className="text-gray-500 text-xl" />
            )}
          </button>
        </div>
        <div className="space-y-4">
          {erro && <p className="text-red-500">{erro}</p>}
          <div>
            <div className="flex items-center mb-1">
              <FaBolt className="mr-2 text-gray-500" />
              <label
                htmlFor="potencia"
                className="block text-sm font-medium text-gray-700"
              >
                Potência (Watts):
              </label>
            </div>
            <input
              type="number"
              id="potencia"
              value={potencia}
              onChange={(e) => setPotencia(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-md ${
                darkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''
              }`}
              placeholder="Ex: 100"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <FaClock className="mr-2 text-gray-500" />
              <label
                htmlFor="tempoUso"
                className="block text-sm font-medium text-gray-700"
              >
                Tempo de Uso:
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                id="tempoUso"
                value={tempoUnidade === 'horas' ? horas : minutos}
                onChange={(e) => {
                  if (tempoUnidade === 'horas') {
                    setHoras(e.target.value);
                  } else {
                    setMinutos(e.target.value);
                  }
                }}
                className={`mt-1 p-2 w-1/2 border rounded-md ${
                  darkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''
                }`}
                placeholder={tempoUnidade === 'horas' ? 'Horas' : 'Minutos'}
              />
              <select
                value={tempoUnidade}
                onChange={(e) => setTempoUnidade(e.target.value as 'horas' | 'minutos')}
                className={`mt-1 p-2 w-1/2 border rounded-md ml-2 ${
                  darkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''
                }`}
              >
                <option value="horas">Horas</option>
                <option value="minutos">Minutos</option>
              </select>
              {tempoUnidade === 'minutos' && minutos && (
                <p className="ml-2 text-sm text-gray-600">
                  {`(${Number(minutos) / 60} horas)`}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <label
                htmlFor="dias"
                className="block text-sm font-medium text-gray-700"
              >
                Dias de Uso no Mês:
              </label>
            </div>
            <input
              type="number"
              id="dias"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className={`mt-1 p-2 w-full border rounded-md ${
                darkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''
              }`}
              placeholder="Ex: 30"
            />
          </div>
          <div>
            <div className="flex items-center mb-1">
              <FaMoneyBillWave className="mr-2 text-gray-500" />
              <label
                htmlFor="precoKwh"
                className="block text-sm font-medium text-gray-700"
              >
                Preço do kWh (R$):
              </label>
            </div>
            <input
              type="text"
              id="precoKwh"
              value={precoKwh}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9.]/g, '');
                const parts = value.split('.');
                if (parts.length > 2) {
                  value = parts[0] + '.' + parts[1];
                }
                setPrecoKwh(value);
              }}
              className={`mt-1 p-2 w-full border rounded-md ${
                darkMode ? 'dark:bg-gray-700 dark:border-gray-600' : ''
              }`}
              placeholder="Ex: 0.50"
            />
          </div>
          <button
            onClick={calcularGasto}
            className={`w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
              darkMode ? 'dark:bg-blue-600 dark:hover:bg-blue-700' : ''
            }`}
          >
            Calcular
          </button>
          {resultado !== null && (
            <div className="mt-4 text-center">
              <p className="font-semibold">Gasto de Energia Mensal:</p>
              <p className="text-xl">{resultado} kWh</p>
              {custoTotal && (
                <p className="font-semibold">Custo Total: {custoTotal}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
