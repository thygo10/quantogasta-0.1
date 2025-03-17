import Form from 'next/form'

export default function Home() {
  return (
    <Form action="" className='bg-blue-800 flex flex-col items-center justify-center h-screen p-2 m-1 gap-8'>
      <label htmlFor="potencia">Potência do aparelho</label>
      <input id='potencia' className='w-3' type="number"/>
      <input id='horas' className='' type="number" placeholder='Quantas horas de uso desse aparelho por dia?' />
      <input id='dias' className='' type="number" placeholder='Quantas dias de uso desse aparelho por mes?' />
      <input id='valor' className='' type="number" placeholder='Qual valor cobrado pelo KW/H?' />
      <button id='calcular' className='bg-blue-500 pe-2 rounded-2' type='submit' >Calcular</button>
    </Form>
  );
}
